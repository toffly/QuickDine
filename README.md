# QuickDine

QuickDine is a restaurant discovery and reservation app. Diners can find restaurants and manage bookings, restaurant owners can manage their listings and booking requests, and administrators can review restaurant approvals and platform statistics.

## Features

- Browse, search, and view restaurant details
- Check restaurant availability and make reservations
- View and cancel personal bookings
- Owner dashboard for restaurant listings and booking status
- Admin dashboard for restaurant approvals and platform statistics
- JWT-based authentication with role-protected API routes

## Tech stack

- **Frontend:** React, TypeScript, Vite, React Router, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens

## Repository layout

```text
client/   React web application
server/   Express API, database models, and seed script
```

## Requirements

- Node.js compatible with the Vite version in `client/package.json`
- npm
- A MongoDB database for the API

## Local development

### 1. Configure the API

Create `server/.env` on your machine and set the following variables. Do not commit `.env` files or put real credentials in documentation.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret used to sign and verify authentication tokens |
| `PORT` | No | API port; defaults to `5000` |

Install dependencies and start the API:

```bash
cd server
npm install
npm run server
```

The API is available at `http://localhost:5000`, with endpoints under `/api`.

### 2. Configure the web app

Create `client/.env` if the API is not running at the default local URL:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

`VITE_API_URL` is optional; the client uses `http://localhost:5000/api` by default. Vite exposes variables with the `VITE_` prefix to browser code, so never put secrets in client-side environment variables.

Install dependencies and start the development server:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Available scripts

### Client (`client/`)

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the production client |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

### Server (`server/`)

| Command | Description |
| --- | --- |
| `npm run server` | Start the API with Nodemon for development |
| `npm start` | Start the API with `tsx` |
| `npm run build` | Compile the TypeScript server |

## API overview

All API routes are prefixed with `/api`.

| Area | Base path | Examples |
| --- | --- | --- |
| Authentication | `/api/auth` | Register, login, and retrieve the current user |
| Restaurants | `/api/restaurants` | Browse restaurants, view details, and check availability |
| Bookings | `/api/bookings` | Create, list, and cancel bookings |
| Owner | `/api/owner` | Manage the owner's restaurant and bookings |
| Admin | `/api/admin` | Review restaurants and retrieve platform statistics |

Protected endpoints require a valid JWT in the `Authorization: Bearer <token>` request header. Owner and admin endpoints additionally require the appropriate role.

## Deployment notes

- Deploy the client and API as separate applications, and configure the client’s `VITE_API_URL` to point to the deployed API’s `/api` base URL.
- Configure server environment variables in the hosting provider’s secret/environment settings, not in source control.
- The client includes a Vercel rewrite configuration for single-page application routing.
- Configure production CORS rules for the deployed client origin before exposing the API.

## Database seed script

`server/seed.ts` is an optional development utility. **It deletes all existing users, restaurants, and bookings in the configured database before inserting sample data.** Only run it against a disposable development database that you are prepared to reset. Do not use the seed data as production credentials.

## Security

- Keep `.env` files and database credentials out of GitHub.
- Use a unique, strong JWT secret in each environment.
- Do not place secrets in `client/.env`; frontend environment variables are included in the built client.
- If a credential has been exposed, rotate it in the relevant service and hosting configuration.
