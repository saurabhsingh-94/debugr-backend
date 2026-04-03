import { pool } from "./db.js";

const promote = async (email) => {
  try {
    const result = await pool.query(
      "UPDATE users SET role = 'admin' WHERE email = $1 RETURNING id, email, role",
      [email]
    );

    if (result.rows.length > 0) {
      console.log(`✅ User ${email} promoted to ADMIN!`);
      console.log(result.rows[0]);
    } else {
      console.log(`❌ User ${email} not found.`);
    }
  } catch (err) {
    console.error("❌ Promotion failed:", err.message);
  } finally {
    await pool.end();
  }
};

const email = process.argv[2];
if (!email) {
  console.log("Usage: node promote-admin.js <email>");
  process.exit(1);
}

promote(email);
