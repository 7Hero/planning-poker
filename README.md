# Planning Poker App

This is a full-stack Planning Poker application with a React client and a Node.js/Socket.IO server.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [pnpm](https://pnpm.io/installation) (v8 or newer recommended)

## Getting Started

### 1. Install dependencies

From the root of the repository, run:

```sh
pnpm install
```

This will install dependencies for all workspaces (client, server, types).

---

### 2. Start the development servers

You can run both the client and server in development mode:

#### Same terminal, from the root run:

```sh
pnpm dev
```

#### In separate terminals:

```sh
cd apps/server
pnpm dev
```

```sh
cd apps/client
pnpm dev
```

---

### 3. Open the app

- The client will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).
- The server runs on [http://localhost:4000](http://localhost:4000) by default.

---

## Project Structure

```
apps/
  client/   # React frontend
  server/   # Node.js + Socket.IO backend
  types/    # Shared TypeScript types
```

---

## Environment Variables

- The client expects a `VITE_WS_URL` variable in `apps/client/.env` (already set to `ws://localhost:4000` for local development).

---

## Notes

- Make sure both the server and client are running for the app to work.
- You can open multiple browser windows to simulate multiple users in a room.
- **Each browser tab is treated as a separate user, even if you use the same username.** The app uses a unique identifier (the socket id) for each connection, so you can join the same room multiple times from the same browser or device without issues.
