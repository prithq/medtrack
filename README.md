# MedTrack

MedTrack is a full-stack medication tracking app built for a DUHACKS 4.0 ,Patients log their medicine doses, share read access with doctors, and generate a time-limited emergency QR code that first responders can scan to view recent medical history without logging in.

## Features

- **Patient dashboard** — add, view, and delete medication logs (medicine name, dosage, status: taken/missed/late, optional notes)
- **Doctor access sharing** — patients grant a registered doctor read-only access to their logs by email
- **Doctor portal** — doctors can view the list of patients who granted them access and pull up each patient's logs
- **Emergency QR code** — patients generate a 24-hour expiring token; scanning the resulting QR/link opens a public page showing recent medication history, no login required
- **JWT authentication** with role-based access control (`patient` / `doctor`)

## Tech Stack

**Backend**
- Node.js, Express 5
- MongoDB with Mongoose
- JWT (`jsonwebtoken`) for auth, `bcryptjs` for password hashing
- `crypto` for emergency token generation

**Frontend**
- React 19 + Vite
- React Router 7
- Tailwind CSS
- Axios for API calls
- `react-qr-code` for QR generation
- `lucide-react` icons, `framer-motion` for animation

## Project Structure

```
medtrack/
├── backend/
│   ├── index.js              # Entry point, connects MongoDB and starts server
│   ├── app.js                 # Express app setup, route mounting, CORS
│   └── src/
│       ├── controllers/       # auth, doc (doctor-patient access), logs, public (emergency)
│       ├── models/            # User, DoctorView (access grants), Logs, PublicView (QR tokens)
│       ├── routes/            # Route definitions per resource
│       └── middleware/        # auth (JWT verify), role (isPatient/isDoctor)
└── frontend/
    └── src/
        ├── pages/             # Landing, Login, Register, Dashboard, DoctorView, Emergency, About
        ├── components/        # Navbar, Footer, Card, Button, Input
        ├── context/           # AuthContext
        └── api/                # Axios instance
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB instance (local or Atlas)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the server:

```bash
npm run dev   # nodemon, for development
npm start     # plain node, for production
```

The API runs at `http://localhost:8000`. A health check is available at `GET /health`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` (Vite default) and is configured to talk to the backend at `http://localhost:8000`.

## API Overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Register a new user (patient or doctor) |
| POST | `/api/auth/login` | — | Log in, returns JWT |
| GET | `/api/log/get` | Patient | Get own medication logs |
| POST | `/api/log/add` | Patient | Add a medication log |
| DELETE | `/api/log/delete/:logId` | Patient | Delete a log |
| POST | `/api/doc/grant-access` | Patient | Grant a doctor read access via email |
| GET | `/api/doc/my-patients` | Doctor | List patients who granted access |
| GET | `/api/doc/patient/logs?patientId=` | Doctor | View a specific patient's logs |
| POST | `/api/public/create` | Patient | Generate a 24-hour emergency QR token |
| GET | `/api/public/timeline/:token` | — | Public emergency view of recent logs |
| PUT | `/api/user/getme` | Auth | Get current user profile |
| PUT | `/api/user/update` | Auth | Update profile |

## Notes

- Built during a hackathon, so a few areas are intentionally minimal: the emergency view currently surfaces medication logs only (blood type/allergies fields aren't part of the user model yet), and error handling on some endpoints returns `200` with a message instead of a proper error status.
- CORS is currently locked to `http://localhost:5173`; update the origin in `backend/app.js` for other environments.

## License

Add a license of your choice (e.g., MIT) if you plan to share this publicly.
