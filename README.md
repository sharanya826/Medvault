# Medvault
💊 MedVault – Your Medicine Info Companion
MedVault is a user-friendly web application that helps individuals search and explore trusted information about medicines with ease and clarity.

🚀 Key Features

🔍 Easy Search
Quickly find detailed medicine information by simply typing the name.

📘 Comprehensive Medicine Info
Usage & purpose
Dosage recommendations
Side effects

🧠 Empowering Users
-Supports informed decision-making for:
-Patients managing prescriptions
-Caregivers assisting loved ones
-Healthcare students
-Curious individuals seeking clarity

💡 Simplified Language
No complex jargon — just clean, structured information everyone can understand.

## 🔍 Features

- Search for any medicine by name
- View detailed medicine information:
  - Description & usage
  - Recommended dosage
  - Common side effects
- Clean and responsive user interface
- Fast and accurate results using a reliable medicine database

## 🛠 Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js
- Database:MySQL
- Tools: VS Code

🚀 About the Event
This project was built as part of Project of the Month organized by the IEEE Computer Society, BMSIT&M – a beginner-friendly initiative designed to help students turn their ideas into reality! 🎯
MedVault is a beginner-level project built through this initiative. While simple, it reflects our first step into the world of tech-based healthcare solutions—and we're excited to keep learning and building from here! 🚀

## 📥 Installation

Follow the steps below to set up and run the MedVault project on your local machine.
### 🧾 1. Clone the Repository

bash
git clone https://github.com/sharanya826/medvault.git
cd medvault

### 📦 2. Install Backend Dependencies

Make sure you have Node.js and npm installed. Then install the required packages:

bash
npm install

### 🛠 3. Set Up the MySQL Database

1. **Start your MySQL server.**

2. **Open MySQL CLI** (or use a GUI like MySQL Workbench or phpMyAdmin).

3. **Create the `medvault` database:**

sql
CREATE DATABASE medvault;


4. **Switch to the `medvault` database:**

sql
USE medvault;

5. Download the sample medicines data JSON file (e.g., medicines.json) 

### 🔐 4. Configure Environment Variables
Create a `.env` file in the project root and add your MySQL credentials:

env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=medvault

### 🚀 5. Start the Backend Server
bash
node app.js

### 🌐 6. Run the Frontend

You can open the index.html file directly in a browser, or use *Live Server* in VS Code for better experience:

- Right-click on index.html → *Open with Live Server*
Now you’re all set! 🎉  
You can search for medicines and view their details from your local MedVault setup.


## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).



## 📬 Contact

For any queries, suggestions related to MedVault, feel free to reach out to any of the team members below:

- 👩‍💻 Sharanya – sharanyass826@gmail.com  
- 👩‍💻 varsha – reddyvarsha0131@gmail.com  
- 👩‍💻 Yuktha – yukthama2005@gmail.com  

We’re happy to help and open to collaboration!


    
