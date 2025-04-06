
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(cors());
app.use(bodyParser.json());


const path = require('path');

// Serve static files from the "frontend" folder
app.use(express.static(path.join(__dirname, '../frontend')));

// ✅ Database Connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'medvault',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// =============================================
// 1️⃣ **DATABASE INITIALIZATION (Load JSON into MySQL)**
// =============================================
async function initializeDatabase() {
  try {
    // ✅ Load medicines.json
    const data = await fs.readFile('./data/medicines.json', 'utf-8');
    const medicines = JSON.parse(data);
    console.log(`📂 Medicines JSON Loaded: ${medicines.length} items`);
    console.log(`📝 Inserting: ${med["Medicine Name"]}`);
    // ✅ Create Medicines Table (if not exists)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS medicines (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        composition TEXT,
        uses TEXT,
        side_effects TEXT,
        image_url VARCHAR(255),
        manufacturer VARCHAR(255),
        excellent_review_percent INT DEFAULT 0,
        average_review_percent INT DEFAULT 0,
        poor_review_percent INT DEFAULT 0
      )
    `);

    // ❌ REMOVE this check so insertion runs every time
    // const [rows] = await pool.query("SELECT COUNT(*) AS count FROM medicines");
    // if (rows[0].count > 0) {
    //   console.log("📌 Medicines already exist in the database. Skipping insert.");
    //   return;
    // }

    // ✅ Insert Medicines (with logging)
    for (const med of medicines) {
      console.log(`📝 Inserting: ${med["Medicine Name"]}`);
      await pool.query(
        `INSERT INTO medicines (name, composition, uses, side_effects, image_url, manufacturer, excellent_review_percent, average_review_percent, poor_review_percent)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          med["Medicine Name"],
          med["Composition"],
          med["Uses"],
          med["Side_effects"],
          med["Image URL"],
          med["Manufacturer"],
          med["Excellent Review %"] || 0,
          med["Average Review %"] || 0,
          med["Poor Review %"] || 0
        ]
      );
    }

    console.log("✅ All medicines inserted successfully!");
  } catch (error) {
    console.error("❌ Database Initialization Error:", error);
  }
}



// ✅ Uncomment and run ONCE, then comment it again
// initializeDatabase();

// =============================================
// 2️⃣ **API ENDPOINTS**
// =============================================

// 🔍 Search Medicines
app.get('/api/medicines/search', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Search query required' });

  try {
    const [results] = await pool.query(
      `SELECT id, name, composition, image_url, manufacturer 
       FROM medicines 
       WHERE name LIKE ? 
       OR composition LIKE ?
       OR manufacturer LIKE ? 
       LIMIT 50`,
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: 'No medicines found' });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// 🏥 Get all medicines (pagination)
app.get('/api/medicines', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const [medicines] = await pool.query(
      `SELECT id, name, composition, uses, image_url, manufacturer 
       FROM medicines LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [[{ count }]] = await pool.query('SELECT COUNT(*) as count FROM medicines');

    res.json({
      medicines,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
});

// 📖 Get Medicine Details by ID
app.get('/api/medicines/:id', async (req, res) => {
  try {
    const [[medicine]] = await pool.query(
      `SELECT * FROM medicines WHERE id = ?`, [req.params.id]
    );

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    // Get similar medicines
    const [similar] = await pool.query(
      `SELECT id, name FROM medicines WHERE composition LIKE ? AND id != ? LIMIT 5`,
      [`%${medicine.composition.split(' ')[0]}%`, req.params.id]
    );

    res.json({
      ...medicine,
      similar_medicines: similar
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medicine details' });
  }
});

// =============================================
// 3️⃣ **START SERVER**
// =============================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📌 API Endpoints:
  - GET /api/medicines
  - GET /api/medicines/search?query=Paracetamol
  - GET /api/medicines/:id`);
});
