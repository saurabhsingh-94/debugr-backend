import { pool } from './db.js';

async function migrate() {
    console.log('--- Initializing High-Fidelity Profile Migration (ESM) ---');
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const addColumns = `
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS bio TEXT,
            ADD COLUMN IF NOT EXISTS website VARCHAR(255),
            ADD COLUMN IF NOT EXISTS location VARCHAR(100),
            ADD COLUMN IF NOT EXISTS github_url VARCHAR(255),
            ADD COLUMN IF NOT EXISTS skills JSONB DEFAULT '[]',
            ADD COLUMN IF NOT EXISTS company_size VARCHAR(50),
            ADD COLUMN IF NOT EXISTS description TEXT;
        `;

        await client.query(addColumns);
        console.log('✅ Added extended profile columns.');

        await client.query('COMMIT');
        console.log('--- Migration Completed Successfully ---');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error('❌ Migration failed:', e);
    } finally {
        client.release();
        process.exit();
    }
}

migrate();
