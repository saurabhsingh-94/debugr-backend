import express from "express";
import { pool } from "../db.js";
import authMiddleware from "../middleware/auth.js";
import ApiError from "../utils/ApiError.js";

import cache from "../middleware/cache.js";
import redis from "../utils/redis.js";

const router = express.Router();

// Get the current user's profile and stats (Cached for 30s)
router.get("/profile/me", authMiddleware, cache(30), async (req, res, next) => {
  try {
    const userId = req.user.id;

    // 1. Get basic info
    const userResult = await pool.query(
      "SELECT id, email, role, created_at FROM users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new ApiError(404, "User not found");
    }

    // 2. Get detailed stats
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) as total_submissions,
        COUNT(*) FILTER (WHERE status = 'resolved') as resolved_bugs,
        COUNT(*) FILTER (WHERE status = 'triaged') as triaged_bugs,
        COALESCE(SUM(bounty), 0) as total_earned
      FROM reports
      WHERE user_id = $1
    `, [userId]);

    res.json({
      success: true,
      user: {
        ...userResult.rows[0],
        stats: statsResult.rows[0]
      }
    });
  } catch (err) {
    next(err);
  }
});

// Get global leaderboard (Top hackers by bounty earned or resolved count)
// Uses Redis Sorted Set for O(log N) ranking for the default view
router.get("/leaderboard", cache(60), async (req, res, next) => {
  const { sortBy = 'earned' } = req.query;
  const REDIS_KEY = `leaderboard:global:${sortBy}`;
  
  try {
    // 1. Try to get from Redis (Only for verified top 10)
    if (redis && sortBy === 'earned') { // Currently only caching 'earned' in Redis for simplicity
      const redisLeaderboard = await redis.zrevrange(REDIS_KEY, 0, 9, "WITHSCORES");
      if (redisLeaderboard.length > 0) {
        const formatted = [];
        for (let i = 0; i < redisLeaderboard.length; i += 2) {
          const [id, email] = redisLeaderboard[i].split(":");
          formatted.push({
            id,
            email,
            total_earned: parseFloat(redisLeaderboard[i + 1]),
            source: "redis" 
          });
        }
        return res.json({ success: true, leaderboard: formatted });
      }
    }

    // 2. Fallback to SQL (or primary choice for 'resolved')
    const orderField = sortBy === 'resolved' ? 'resolved_count' : 'total_earned';
    const query = `
      SELECT u.id, u.email, 
             COALESCE(SUM(r.bounty), 0) as total_earned, 
             COUNT(r.id) FILTER (WHERE r.status = 'resolved') as resolved_count
      FROM users u
      LEFT JOIN reports r ON u.id = r.user_id
      WHERE u.role = 'hacker'
      GROUP BY u.id, u.email
      HAVING COUNT(r.id) FILTER (WHERE r.status = 'resolved') > 0
      ORDER BY ${orderField} DESC
      LIMIT 10
    `;

    const result = await pool.query(query);
    
    // 3. Proactively seed Redis if it was empty (Only for 'earned' for now)
    if (redis && sortBy === 'earned' && result.rows.length > 0) {
      const pipeline = redis.pipeline();
      result.rows.forEach(row => {
        pipeline.zadd(REDIS_KEY, row.total_earned, `${row.id}:${row.email}`);
      });
      await pipeline.exec();
    }

    res.json({
      success: true,
      leaderboard: result.rows
    });
  } catch (err) {
    next(err);
  }
});

export default router;
