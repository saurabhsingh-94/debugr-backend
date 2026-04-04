import express from "express";
import { pool } from "../db.js";
import ApiError from "../utils/ApiError.js";
import cache from "../middleware/cache.js";

const router = express.Router();

// List all programs (Cached for 1 minute)
router.get("/", cache(60), async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, name, description, type, logo_url, reward_min, reward_max, scope FROM programs ORDER BY name ASC"
    );
    res.json({ success: true, programs: result.rows });
  } catch (err) {
    next(err);
  }
});

// Get program details by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM programs WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, "Program not found");
    }

    res.json({ success: true, program: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

export default router;
