# Production Docker Deployment Template

A small Node.js and Express application that is being developed into a production-ready Docker deployment template.

The current application exposes a simple in-memory users API plus basic root, health, and version endpoints. As deployment files, runtime configuration, CI/CD, or API behavior changes are added, this README should be updated in the same change set.

## Current Stack

- Node.js
- Express 5
- JSON request parsing with `express.json()`
- In-memory data storage for demo users

## Requirements

- Node.js 18 or newer
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Run the application:

```bash
node index.js
```

The server starts on:

```text
http://localhost:3355
```

## API Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Returns a welcome message. |
| `GET` | `/health` | Returns a simple health-check message. |
| `GET` | `/version` | Returns the current app version string. |
| `GET` | `/users` | Returns all users stored in memory. |
| `POST` | `/users` | Adds a user from the JSON request body. |
| `DELETE` | `/deleteusers` | Clears all users from memory. |

## Example Requests

Check that the app is running:

```bash
curl http://localhost:3355/health
```

List users:

```bash
curl http://localhost:3355/users
```

Create a user:

```bash
curl -X POST http://localhost:3355/users \
  -H "Content-Type: application/json" \
  -d '{"id":3,"name":"Sara"}'
```

Clear all users:

```bash
curl -X DELETE http://localhost:3355/deleteusers
```

## Project Structure

```text
.
├── index.js          # Express application entry point
├── package.json      # npm metadata and dependencies
├── package-lock.json # Locked dependency versions
└── README.md         # Project documentation
```

## Development Notes

- The server port is currently hard-coded to `3355`.
- User data is stored in memory, so it resets every time the server restarts.
- There is no automated test suite yet.
- There are no Docker files in the repository yet. Add Docker usage instructions here when Docker support is introduced.

## Documentation Policy

Update this README whenever a code change affects:

- How to install, run, configure, test, or deploy the project.
- Available API routes, request bodies, response shapes, or status codes.
- Environment variables, ports, volumes, Docker files, or deployment steps.
- Project structure or important operational assumptions.

Keeping documentation in the same change as the code makes the template easier to reuse and safer to deploy.
