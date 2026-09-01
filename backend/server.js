import { Database } from "bun:sqlite";

const DB_PATH = Bun.fileURLToPath(new URL("./data/database.sqlite", import.meta.url));
const db = new Database(DB_PATH, { create: true });

db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    email TEXT UNIQUE,
    message TEXT,
    location TEXT NOT NULL,
    paid INTEGER DEFAULT 0,
    date TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    inquiry TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL
  )
`);

const server = Bun.serve({
  port: process.env.PORT || 4000,
  async fetch(req) {
    const url = new URL(req.url);
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    // Health check
    if (req.method === "GET" && url.pathname === "/api/health") {
      return Response.json({ status: "ok", service: "coffeelandfc-backend" }, { headers });
    }

    // POST /api/register
    if (req.method === "POST" && url.pathname === "/api/register") {
      try {
        const body = await req.json();
        const { name, age, email, password } = body;
        const location = body.location || "Chikmagalur";
        const message = body.message || "";
        const date = new Date().toISOString().split("T")[0];

        if (!name || !age || !email) {
          return Response.json({ error: "Name, age and email are required" }, { status: 400, headers });
        }

        const result = db.run(
          "INSERT INTO students (name, age, email, password, message, location, paid, date) VALUES (?, ?, ?, ?, ?, ?, 0, ?)",
          [name, age, email, password || "", message, location, date]
        );

        return Response.json({ id: result.lastInsertRowid, name, age, email, location, paid: false, date }, { status: 201, headers });
      } catch (error) {
        console.error("Registration error:", error.message);
        return Response.json({ error: error.message }, { status: 500, headers });
      }
    }

    // POST /api/contact
    if (req.method === "POST" && url.pathname === "/api/contact") {
      try {
        const body = await req.json();
        const { name, email, phone, inquiry, message } = body;
        const date = new Date().toISOString().split("T")[0];

        if (!name || !email || !message) {
          return Response.json({ error: "Name, email and message are required" }, { status: 400, headers });
        }

        const result = db.run(
          "INSERT INTO contacts (name, email, phone, inquiry, message, date) VALUES (?, ?, ?, ?, ?, ?)",
          [name, email, phone || "", inquiry || "", message, date]
        );

        return Response.json({ id: result.lastInsertRowid, message: "Message received, thank you!" }, { status: 201, headers });
      } catch (error) {
        console.error("Contact error:", error.message);
        return Response.json({ error: error.message }, { status: 500, headers });
      }
    }

    // GET /api/students
    if (req.method === "GET" && url.pathname === "/api/students") {
      const students = db.query("SELECT id, name, age, email, location, paid, date FROM students").all();
      return Response.json(students, { headers });
    }

    return Response.json({ error: "Not found" }, { status: 404, headers });
  },
});

console.log(`⚽ Coffeeland FC backend running at http://localhost:${server.port}`);
