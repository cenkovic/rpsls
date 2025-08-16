# RPSLS Game

A **Rock, Paper, Scissors, Lizard, Spock** game built with a backend `game-service` and a frontend `rpsls` application.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or later is recommended)
- **npm** (comes with Node.js)

---

## Install Dependencies

Before running the application, install all required dependencies:

```sh
npm install
```


---

## Game Service

The backend service, responsible for game logic and APIs.

### Start the Game Service (Development Mode)

To run the development server for the `game-service`:

```sh
npx nx serve game-service
```


The server will start at **`http://localhost:3000`**.

### Run Game Service Unit Tests

To execute the unit tests for `game-service`:

```sh
npx nx test game-service
```


---

## RPSLS Game

The frontend React application for the game.

### Configure Environment Variables

Before starting the game, configure the environment variables:

1. Navigate to the `apps/rpsls` directory:
```sh
cd apps/rpsls
```


2. Create a `.env` file by copying the provided template:
```sh
cp .env.template .env
```


3. Set the `VITE_GAME_SERVICE_URL` value in `.env` to the game service URL:
    - If running locally on default settings:
```
VITE_GAME_SERVICE_URL=http://localhost:3000
```


### Start the Frontend (Development Mode)

To start the frontend UI for the RPSLS game:

```sh
npx nx dev rpsls
```


The application will be available at **`http://localhost:4200`**.

### Run RPSLS Game Unit Tests

To execute unit tests for the `rpsls` app:

```sh
npx nx test rpsls
```


### Run RPSLS Game E2E Tests

To execute end-to-end tests for the `rpsls` app:

```sh
npx nx e2e rpsls-e2e
```


---

## Summary

| Command                          | Description                               |
|----------------------------------|-------------------------------------------|
| `npm install`                    | Install project dependencies             |
| `npx nx serve game-service`      | Start the backend service (game-service) |
| `npx nx test game-service`       | Run backend unit tests                   |
| `npx nx dev rpsls`               | Start the frontend (RPSLS UI)            |
| `npx nx test rpsls`              | Run frontend unit tests                  |
| `npx nx e2e rpsls-e2e`           | Run frontend end-to-end tests            |

---

### Additional Notes

- **Frontend URL:** `http://localhost:4200`
- **Backend URL:** `http://localhost:3000`
- Ensure the backend (`game-service`) is running before starting the frontend for full functionality.
