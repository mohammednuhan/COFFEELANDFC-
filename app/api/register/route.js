import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, age, email, password, location } = body;
        const date = new Date().toLocaleDateString();

        const dbPath = path.join(process.cwd(), 'database.sqlite');

        // Open the database
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        // Create table just to be safe if it doesn't exist
        await db.exec(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        email TEXT UNIQUE,
        password TEXT NOT NULL,
        location TEXT NOT NULL,
        paid BOOLEAN NOT NULL DEFAULT 0,
        date TEXT NOT NULL
      )
    `);

        // Insert student
        const sql = `INSERT INTO students (name, age, email, password, location, paid, date) VALUES (?, ?, ?, ?, ?, 0, ?)`;
        const result = await db.run(sql, [name, age, email, password, location, date]);

        await db.close();

        return Response.json({ id: result.lastID, name, age, email, location, paid: false, date });
    } catch (error) {
        console.error('Registration error:', error.message);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
