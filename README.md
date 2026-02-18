# 🩸 LifeLink

### Digital Blood Bank & Emergency Donor Network

**LifeLink** is a centralized, web-based **Blood Inventory and Emergency Donor Management System** built to close the critical gap between **blood banks, hospitals, and donors**.
It replaces fragmented, manual record-keeping with a **real-time, PostgreSQL-powered platform** so the *right blood type reaches the right patient at the right time*.

---

## 🚀 Features

### 🔐 Administrator Dashboard (Blood Bank Staff)

* **Inventory Management**
  Full CRUD operations on blood units, categorized by blood group, component, and expiry date.
* **Donor Verification**
  Track donor health profiles and enforce the mandatory **90-day donation interval**.
* **Smart Alerts**
  Automated notifications for blood units nearing the **42-day shelf-life limit**.

### 🏥 Hospital Portal

* **Urgent Blood Requests**
  Submit real-time requirements with blood group and quantity.
* **Live Inventory View**
  Read-only access to current stock for faster emergency coordination.
* **Request Status Tracking**
  Monitor requests from **Pending → Fulfilled**.

### 🧑‍🤝‍🧑 Donor & Public Interface

* **Donor Registration**
  Volunteer signup with contact information and blood group details.
* **Eligibility Checker**
  Automatically calculates the next eligible donation date based on donation history.

---

## 🛠️ Tech Stack

**Backend**

* Node.js
* Express.js

**Database**

* PostgreSQL (Relational Database Management System)

**Frontend**

* EJS (Templating Engine)
* Bootstrap 5
* HTML5, CSS3

**Testing & Design**

* Postman (API Testing)
* Draw.io (ER Diagram Design)

---

## 📁 Project Structure

```
LifeLink
├─ Backend
│  ├─ .env
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ seed.js
│  └─ src
│     ├─ app.js
│     ├─ config
│     │  └─ db.js
│     ├─ controllers
│     │  ├─ adminController.js
│     │  ├─ authController.js
│     │  ├─ donorController.js
│     │  └─ hospitalController.js
│     ├─ middleware
│     │  └─ authMiddleware.js
│     ├─ routes
│     │  ├─ adminRoutes.js
│     │  ├─ authRoutes.js
│     │  ├─ donorRoutes.js
│     │  └─ hospitalRoutes.js
│     └─ server.js
├─ Database
│  └─ schema.sql
├─ Frontend
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ lint_output.txt
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ admin
│  │  │  │  ├─ AdminDashboard.css
│  │  │  │  ├─ AdminDashboard.jsx
│  │  │  │  ├─ AdminLayout.jsx
│  │  │  │  └─ AdminPage.jsx
│  │  │  ├─ donor
│  │  │  │  ├─ DonationHistory.jsx
│  │  │  │  ├─ DonationStatus.css
│  │  │  │  ├─ DonationStatus.jsx
│  │  │  │  ├─ DonorDashboard.css
│  │  │  │  ├─ DonorDashboard.jsx
│  │  │  │  ├─ DonorHeader.jsx
│  │  │  │  ├─ DonorProfile.jsx
│  │  │  │  └─ EditProfileForm.jsx
│  │  │  ├─ home
│  │  │  │  ├─ HomePage.css
│  │  │  │  └─ HomePage.jsx
│  │  │  ├─ hospital
│  │  │  │  ├─ BloodRequestForm.jsx
│  │  │  │  ├─ HospitalDashboard.css
│  │  │  │  ├─ HospitalDashboard.jsx
│  │  │  │  └─ RequestStatusTable.jsx
│  │  │  ├─ layouts
│  │  │  │  ├─ MainLayout.jsx
│  │  │  │  ├─ Navbar.css
│  │  │  │  └─ Navbar.jsx
│  │  │  └─ login
│  │  │     ├─ LoginPage.css
│  │  │     ├─ LoginPage.jsx
│  │  │     └─ RegisterPage.jsx
│  │  └─ utils
│  │     └─ api.js
│  └─ vite.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ Resources
│  └─ ER-diagram.png
└─ vercel.json

```

---

## 📊 Database Schema (ER Diagram)

The system uses a **normalized relational database design** to maintain integrity and scalability.

* **Users**
  Authentication and Role-Based Access Control (RBAC).
* **Donors & Hospitals**
  Profile entities linked to user accounts.
* **Inventory & Requests**
  Connected via a fulfillment bridge for transparent tracking and accountability.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/coprashant/LifeLink-Project.git
```

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
cp .env.example .env
```

Update your PostgreSQL credentials inside the `.env` file.

### 3️⃣ Database Configuration

* Create a PostgreSQL database named **`lifelink`**
* Run the SQL script located at:

  ```
  ./Database/schema.sql
  ```

### 4️⃣ Run the Application

```bash
npm start
```

---

## 🤝 Collaboration Workflow

This project follows a **decoupled development workflow** for clean collaboration.

* **Feature Branching**
  Separate branches: `feature-backend`, `feature-frontend`
* **Pull Requests**
  Mandatory code reviews before merging into `main`
* **VS Code Integration**
  Optimized for GitHub Pull Requests & Issues extension

---

## 👥 Project Members

| Role     | Name              | GitHub                                       |
| -------- | ----------------- | -------------------------------------------- |
| Frontend | Birendra Rawat    | [@Biren26](https://github.com/Biren26)       |
| Backend  | Prasant Bhattarai | [@coprashant](https://github.com/coprashant) |

---

## 📌 Vision

LifeLink aims to become a **reliable digital backbone for emergency blood coordination**, reducing response time, eliminating errors, and ultimately **saving lives through technology**.

