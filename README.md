🩸 LifeLink: Digital Blood Bank and Emergency Donor NetworkLifeLink is a centralized web-based Blood Inventory and Emergency Donor Management System designed to bridge the gap between blood banks, hospitals, and donors. It replaces fragmented manual records with a real-time PostgreSQL-driven platform to ensure the right blood type reaches the right patient at the right time.🚀 Features1. Administrator Dashboard (Blood Bank Staff)Inventory Management: Full CRUD operations on blood units categorized by group, component, and expiry.Donor Verification: Track donor health profiles and enforce the 90-day donation interval.Alert System: Automated alerts for units reaching their 42-day shelf-life limit.2. Hospital PortalUrgent Requests: Submit real-time requirements for blood groups and quantities.Live Inventory View: Read-only access to current stock levels for emergency coordination.Status Tracking: Monitor requests from "Pending" to "Fulfilled."3. Donor & Public InterfaceRegistration: Volunteer registration with contact and blood group details.Eligibility Checker: Automated calculation of the next possible donation date based on history.🛠️ Tech StackBackend: Node.js & Express.jsDatabase: PostgreSQL (Relational Database Management System)Frontend: EJS (Templating Engine), Bootstrap 5, HTML5, CSS3Testing & Design: Postman (API testing), Draw.io (ER Diagram)📁 Project StructurePlaintextLifeLink-Project/
├── Resources/              # Design assets and SQL scripts
├── Backend/                # Node.js & Express Server
│   ├── src/                # Controllers, Routes, and Config
│   ├── .env.example        # Environment template
│   └── package.json
├── Frontend/               # UI Assets & EJS Templates
│   ├── public/             # CSS, JS, Images
│   ├── views/              # EJS files
│   └── package.json
├── docs/                   # Documentation & Proposals
└── README.md
📊 Database Schema (ER Diagram)The system uses a normalized relational structure to maintain data integrity across donors and inventory.Users: Handles authentication and Role-Based Access Control (RBAC).Donors/Hospitals: Profiles linked to User accounts.Inventory & Requests: Managed via a fulfillment bridge for transparent tracking.⚙️ Installation & SetupClone the repository:Bashgit clone https://github.com/coprashant/LifeLink-Project.git
Setup Backend:Bashcd Backend
npm install
cp .env.example .env  # Then update your DB credentials in .env
Database Configuration:Create a PostgreSQL database named lifelink.Run the script in ./Resources/schema.sql to generate tables.Run the application:Bashnpm start
🤝 Collaboration WorkflowThis project utilizes a decoupled workflow:Feature Branching: Use feature-backend and feature-frontend branches.Pull Requests: Mandatory reviews before merging to main.VS Code Integration: Optimized for the GitHub Pull Requests and Issues extension.👥 Project MembersRoleMemberGitHubFrontendBirendra Rawat@Biren26BackendPrasant Bhattarai@coprashant