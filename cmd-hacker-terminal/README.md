# CMD Hacker Terminal 🖥️

A movie-style command help terminal built with React. Enter any command (npm, git, docker, etc.) and get instant help with sub-command selection.

## Features

- 🎬 **Movie-style terminal interface** with CRT effects, scanlines, and glowing green text
- 🔍 **Web search integration** to find command documentation
- 📋 **Sub-command browser** with modal selection
- ⚙️ **Parameter input** for executing commands
- 💻 **Real terminal aesthetic** - looks like something from a hacker movie

## Quick Start

### 1. Start the Backend Server

Open a terminal and run:

```bash
cd /home/zalloma/.openclaw/workspace/cmd-hacker-terminal
node server.js
```

The server will start on `http://localhost:3001`

### 2. Start the Frontend

Open a new terminal and run:

```bash
cd /home/zalloma/.openclaw/workspace/cmd-hacker-terminal
npm run dev
```

Open the URL shown (usually `http://localhost:5173`) in your browser.

## How to Use

1. **Enter a command** - Type any command name (e.g., `npm`, `git`, `docker`)
2. **View help** - The terminal searches the web and displays help information
3. **Select sub-command** - Click on any sub-command in the modal
4. **Enter parameters** - Add any parameters or flags
5. **Execute** - Click EXECUTE to run the command

## Commands with Pre-defined Sub-commands

The app includes pre-defined sub-commands for popular tools:

- **npm**: install, uninstall, update, start, build, test, run, init, publish, ls
- **git**: clone, add, commit, push, pull, branch, checkout, merge, status, log
- **docker**: build, run, ps, images, stop, start, rm, rmi, exec, logs

For other commands, the app will attempt to extract sub-commands from search results.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Styling**: Pure CSS with animations
- **Search**: Web search integration

## Customization

### Modify Colors

Edit `src/App.css` and change the CSS variables:

```css
:root {
  --terminal-green: #00ff41;
  --terminal-bg: #0d0d0d;
  --glow-color: #00ff41;
  /* ... more variables */
}
```

### Add More Pre-defined Sub-commands

Edit `server.js` and add to the `commonSubCommands` object:

```javascript
const commonSubCommands = {
  npm: [...],
  git: [...],
  yourcommand: [
    { name: 'sub1', description: 'Description' },
    { name: 'sub2', description: 'Description' }
  ]
};
```

## Troubleshooting

### Server not starting

Make sure port 3001 is not in use. You can change the port in `server.js`:

```javascript
const PORT = 3001; // Change to a different port
```

### Search not working

The search uses the web_search CLI. Make sure it's installed and working:

```bash
npx @openclaw/web_search_cli "test query"
```

### CORS errors

The backend has CORS enabled. If you still get CORS errors, check that the frontend is making requests to `http://localhost:3001`

## License

MIT

---

Built with 💚 for hackers and developers
