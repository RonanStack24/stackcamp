# Stackcamp

> A cozy digital campsite where builders can gather, share progress, and create meaningful things together.

Stackcamp is a full-stack community prototype for developers, engineers, architects, creators, students, and innovators. It offers a slower, craft-focused alternative to noisy social feeds through a warm retro campsite experience.

## Features

- Responsive pixel-art interface
- Night Forest and Sakura Morning themes
- Animated forest, fireflies, petals, and loading screen
- Camper registration and live roster
- Persistent community build logs
- Session-aware visitor counter
- Builder passport generator
- Project showcase and reaction simulator
- Collaboration request board
- Community cabin simulator
- Founder character showcase
- Public roadmap and FAQ

## Technology

| Area | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 4 |
| Interface | Motion, Lucide React |
| Backend | PHP 8 |
| Database | MySQL |

## Project structure

```text
stackcamp/
├── backend/             # PHP APIs and MySQL schema
├── public/              # Images and public assets
├── src/
│   ├── components/      # React interface sections
│   ├── App.tsx          # Main application layout
│   ├── index.css        # Theme and global styles
│   └── main.tsx         # Application entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Run locally

### Requirements

- Node.js 20 or newer
- npm
- PHP 8 or newer
- MySQL

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/RonanStack24/stackcamp.git
   cd stackcamp
   ```

2. Install the frontend packages:

   ```bash
   npm install
   ```

3. Import [`backend/schema.sql`](backend/schema.sql) into MySQL.

4. Configure the local database connection in [`backend/db.php`](backend/db.php).

5. Start the frontend and backend:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000`.

On Windows PowerShell, use `npm.cmd run dev` if script execution is disabled.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite and PHP development servers |
| `npm run dev:frontend` | Start only the frontend on port 3000 |
| `npm run dev:backend` | Start only the PHP backend on port 8000 |
| `npm run build` | Create a production frontend build |
| `npm run lint` | Run TypeScript validation |

## Backend endpoints

| Endpoint | Purpose |
| --- | --- |
| `backend/api.php` | Register campers and retrieve the latest roster |
| `backend/logs.php` | Create and retrieve build logs |
| `backend/counter.php` | Record and retrieve page views |

## Deploy to InfinityFree

1. Create a MySQL database in the InfinityFree control panel.
2. Open that database in phpMyAdmin and import `backend/schema.infinityfree.sql`.
3. Copy `backend/config.example.php` to `backend/config.php`.
4. Add the database host, name, username, and hosting-account password shown by InfinityFree.
5. Prepare the upload folder:

   ```powershell
   npm.cmd run build:infinityfree
   ```

6. Upload everything inside `infinityfree-upload` to the domain's `htdocs` directory using FTP or the online File Manager.

`backend/config.php` and the generated upload folder are ignored by Git so database credentials cannot be committed accidentally.

## Roadmap

- Secure camper accounts
- Editable builder profiles
- Persistent project showcases
- Collaboration responses and notifications
- Dedicated community cabin discussions
- Moderation and administration tools

## Team

Stackcamp was founded by friends from information technology, software development, electronics engineering, and architecture in the Philippines.

**Founder and Guild Leader:** [RonanStack24](https://github.com/RonanStack24)

## License

This project is available under the MIT License.
