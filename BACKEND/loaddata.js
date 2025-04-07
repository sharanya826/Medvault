const mysql = require("mysql2/promise");
const fs = require("fs/promises"); // Use fs.promises to avoid callback errors

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sharu@123sql",
  database: "medvault",
});

async function loadMedicines() {
  try {
    // ✅ Read medicines.json correctly
    const data = await fs.readFile("../data/medicines.json", "utf-8");
    const medicines = JSON.parse(data);

    console.log(`📂 Medicines JSON Loaded: ${medicines.length} items`);

    // ✅ Insert Medicines into Database
    const insertQuery = `
      INSERT INTO medicines (name, composition, uses, side_effects, image_url, manufacturer, excellent_review_percent, average_review_percent, poor_review_percent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const med of medicines) {
      await pool.query(insertQuery, [
        med["Medicine Name"],
        med["Composition"],
        med["Uses"],
        med["Side_effects"],
        med["Image URL"],
        med["Manufacturer"],
        med["Excellent Review %"] || 0,
        med["Average Review %"] || 0,
        med["Poor Review %"] || 0,
      ]);
      console.log(`📝 Inserting: ${med["Medicine Name"]}`);
    }

    console.log("✅ All medicines inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  } finally {
    await pool.end();
  }
}

// Run function
loadMedicines();
