# GoPratle - Requirement Posting Flow 🚀

A full-stack, multi-step wizard for posting event hiring requirements. Built with a focus on modular architecture, polymorphic data structures, and a "Minimalist Lux" aesthetic.

---

## 🏗 Architecture & Design Decisions

### 1. Polymorphic Database Schema (MongoDB)
Instead of creating separate collections for Planners, Performers, and Crew, I utilized a **Single Collection Pattern** with Mongoose.
- **Common Fields:** Lifted to the root level (Event Name, Date, Budget, Location).
- **Dynamic Sub-Documents:** The `specificDetails` field changes structure based on the `roleType`.
- **Backend Validation:** Custom middleware ensures data integrity at the database level.

### 2. "Minimalist Lux" UI Design
Moved away from standard Bootstrap/Material styles to create a premium, editorial feel.
- **Typography:** *Playfair Display* (Serif) for headings vs. *Lato* (Sans) for data.
- **Visual Language:** Sharp edges, high-contrast borders, and whitespace.
- **Micro-interactions:** Custom transitions and toast notifications.

### 3. State Management (Zustand)
Used **Zustand** over Redux/Context for managing wizard state.
- Minimizes boilerplate and prevents "prop drilling" across form steps.
- Handles merge logic to ensure data persists when navigating backward.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, Tailwind CSS, Zustand, Axios, React Hot Toast |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |

---

## 🏃‍♂️ How to Run Locally

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/gopratle-assignment.git
cd gopratle-assignment
```

### 2. Backend Setup
```bash
cd server
npm install
echo "PORT=5000" > .env
echo "MONGO_URI=your_mongodb_connection_string" >> .env
npm run dev
```
Server runs on: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd client
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
npm run dev
```
Client runs on: `http://localhost:3000`

---

## 📡 API Endpoints

### POST /api/requirements
Submits a new hiring requirement. The payload structure adapts based on `roleType`.

**Example (Performer):**
```json
{
    "firstName": "Jonathan",
    "roleType": "performer",
    "specificDetails": {
        "performanceType": "Jazz Band",
        "performanceDuration": 120,
        "vibe": "Classy"
    }
}
```

---


*Submitted for GoPratle*