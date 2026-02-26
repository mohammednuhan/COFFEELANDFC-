const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve all static files from current directory

// Database Connection
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Drop the old table and recreate to ensure the new schema is applied
        db.run('DROP TABLE IF EXISTS students', () => {
            db.run(`CREATE TABLE students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                age INTEGER NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                location TEXT NOT NULL,
                paid BOOLEAN NOT NULL DEFAULT 0,
                date TEXT NOT NULL
            )`);
        });
    }
});

// --- API Routes ---

// Register a new student
app.post('/api/register', (req, res) => {
    const { name, age, email, password, location } = req.body;
    const date = new Date().toLocaleDateString();

    const sql = `INSERT INTO students (name, age, email, password, location, paid, date) VALUES (?, ?, ?, ?, ?, 0, ?)`;
    db.run(sql, [name, age, email, password, location, date], function (err) {
        if (err) {
            console.error('Error inserting student:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name: name, age: age, email: email, location: location, paid: false, date: date });
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Access the website at: http://localhost:3000/index.html');
});
