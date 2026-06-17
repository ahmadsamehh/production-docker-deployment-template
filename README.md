# Production Docker Deployment Template

A small Node.js and Express application that is being developed into a production-ready Docker deployment template.

The current application exposes a simple in-memory users API plus basic root, health, and version endpoints. As deployment files, runtime configuration, CI/CD, or API behavior changes are added, this README should be updated in the same change set.

## Current Stack

- Node.js
- Express 5
- JSON request parsing with `express.json()`
- In-memory data storage for demo users
- Docker image based on `node:22-bookworm-slim`
- Docker Compose service definition in `compose.yml`
- Environment configuration through `.env`

## Requirements

- Node.js 18 or newer
- npm
- Docker, when building and running the container image
- Docker Compose, when using the Compose workflow

## Environment Variables

Create a local environment file from the committed example:

```bash
cp .example.env .env
```

The `.env` file is intentionally ignored by git. Commit changes to `.example.env` when the required environment variables change.

| Variable | Default | Used by | Description |
| --- | --- | --- | --- |
| `CONTAINER_PORT` | `3355` | Node.js, Docker Compose | Port the Express app listens on inside the container. |
| `MACHINE_PORT` | `3355` | Docker Compose | Port exposed on your host machine. |
| `APP_VERSION` | `1.0.0` | Node.js | Version returned by `GET /version`. |

## Run Locally With Node.js

Use these commands when you want to run the app directly without building a Docker image.

Install dependencies:

```bash
npm install
```

Run with the variables from `.env`:

```bash
set -a
source .env
set +a
node index.js
```

If you do not need the `.env` values, you can run the app with built-in defaults:

```bash
node index.js
```

The server starts on:

```text
http://localhost:3355
```

If you change `MACHINE_PORT` or `CONTAINER_PORT`, use the matching port in your browser and API requests.

## Run With Docker Compose

Docker Compose is the easiest container workflow for this project because it reads `.env`, builds the image, maps ports, and starts the service with one command.

Start the app and rebuild the image when needed:

```bash
docker compose up --build
```

Start the app in the background:

```bash
docker compose up -d --build
```

View logs:

```bash
docker compose logs -f app
```

Stop and remove the Compose container and network:

```bash
docker compose down
```

The Compose service:

- Builds from the local `Dockerfile`.
- Tags the image as `ahmadsamehh/prodtnodeapp:latest`.
- Names the container `node-express-app`.
- Maps `${MACHINE_PORT}` on the host to `${CONTAINER_PORT}` in the container.
- Loads runtime variables from `.env`.
- Sets `NODE_ENV=production`.
- Uses `restart: always`.

## Build And Run With Docker

Use these commands when you want to build and run the image manually without Docker Compose.

The examples below use the default `3355:3355` port mapping. If you change `.env`, update the `-p host:container` value to match.

Build the Docker image:

```bash
docker build -t ahmadsamehh/prodtnodeapp:latest .
```

Run the container:

```bash
docker run --rm --env-file .env -p 3355:3355 ahmadsamehh/prodtnodeapp:latest
```

Run the container in the background:

```bash
docker run -d --name node-express-app --env-file .env -p 3355:3355 ahmadsamehh/prodtnodeapp:latest
```

Stop the background container:

```bash
docker stop node-express-app
```

The app is available at:

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
├── .dockerignore     # Files excluded from the Docker build context
├── .example.env      # Template for local environment variables
├── .gitignore        # Files excluded from git
├── Dockerfile        # Container image definition
├── compose.yml       # Docker Compose service definition
├── index.js          # Express application entry point
├── package.json      # npm metadata and dependencies
├── package-lock.json # Locked dependency versions for local installs
└── README.md         # Project documentation
```

## Development Notes

- The default server port is `3355`, and the server can read `CONTAINER_PORT` or `PORT` from the environment.
- User data is stored in memory, so it resets every time the server restarts.
- There is no automated test suite yet.
- The Docker image installs dependencies inside the image and starts the app with `node index.js`.
- The Docker build copies `package.json` and `package-lock.json` first so dependency installation can be cached.
- The `.dockerignore` file excludes local dependencies, logs, environment files, README files, git metadata, Compose files, and Docker metadata from the build context.
- Do not commit `.env`; commit `.example.env` when environment variable names or defaults change.

## Documentation Policy

Update this README whenever a code change affects:

- How to install, run, configure, test, or deploy the project.
- Available API routes, request bodies, response shapes, or status codes.
- Environment variables, ports, volumes, Docker files, or deployment steps.
- Project structure or important operational assumptions.

Keeping documentation in the same change as the code makes the template easier to reuse and safer to deploy.
