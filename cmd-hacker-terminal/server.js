import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Pre-defined help documentation
const commandHelp = {
  npm: {
    description: 'Node Package Manager - JavaScript package manager',
    usage: 'npm <command> [options]',
    examples: [
      'npm install <package>',
      'npm start',
      'npm run <script>',
      'npm init'
    ]
  },
  git: {
    description: 'Distributed version control system',
    usage: 'git <command> [options]',
    examples: [
      'git clone <url>',
      'git add <files>',
      'git commit -m "message"',
      'git push origin main'
    ]
  },
  docker: {
    description: 'Container platform for building and running applications',
    usage: 'docker <command> [options]',
    examples: [
      'docker build -t <name> .',
      'docker run -d <image>',
      'docker ps',
      'docker logs <container>'
    ]
  }
};

// Pre-defined subcommands for popular tools
const commonSubCommands = {
  npm: [
    { name: 'install', description: 'Install a package', usage: 'npm install <package-name>' },
    { name: 'uninstall', description: 'Remove a package', usage: 'npm uninstall <package-name>' },
    { name: 'update', description: 'Update a package', usage: 'npm update <package-name>' },
    { name: 'start', description: 'Start the application', usage: 'npm start' },
    { name: 'build', description: 'Build the application', usage: 'npm run build' },
    { name: 'test', description: 'Run tests', usage: 'npm test' },
    { name: 'run', description: 'Run a script', usage: 'npm run <script-name>' },
    { name: 'init', description: 'Initialize a new package', usage: 'npm init' },
    { name: 'publish', description: 'Publish a package', usage: 'npm publish' },
    { name: 'ls', description: 'List installed packages', usage: 'npm list' },
    { name: 'audit', description: 'Check for vulnerabilities', usage: 'npm audit' },
    { name: 'cache', description: 'Manage npm cache', usage: 'npm cache clean' }
  ],
  git: [
    { name: 'clone', description: 'Clone a repository', usage: 'git clone <repository-url>' },
    { name: 'add', description: 'Add files to staging', usage: 'git add <files>' },
    { name: 'commit', description: 'Commit changes', usage: 'git commit -m "message"' },
    { name: 'push', description: 'Push to remote', usage: 'git push origin <branch>' },
    { name: 'pull', description: 'Pull from remote', usage: 'git pull origin <branch>' },
    { name: 'branch', description: 'Manage branches', usage: 'git branch <name>' },
    { name: 'checkout', description: 'Switch branches', usage: 'git checkout <branch>' },
    { name: 'merge', description: 'Merge branches', usage: 'git merge <branch>' },
    { name: 'status', description: 'Show working tree status', usage: 'git status' },
    { name: 'log', description: 'Show commit history', usage: 'git log' },
    { name: 'diff', description: 'Show changes', usage: 'git diff' },
    { name: 'remote', description: 'Manage remotes', usage: 'git remote -v' }
  ],
  docker: [
    { name: 'build', description: 'Build an image', usage: 'docker build -t <name> .' },
    { name: 'run', description: 'Run a container', usage: 'docker run [options] <image>' },
    { name: 'ps', description: 'List containers', usage: 'docker ps' },
    { name: 'images', description: 'List images', usage: 'docker images' },
    { name: 'stop', description: 'Stop a container', usage: 'docker stop <container>' },
    { name: 'start', description: 'Start a container', usage: 'docker start <container>' },
    { name: 'rm', description: 'Remove a container', usage: 'docker rm <container>' },
    { name: 'rmi', description: 'Remove an image', usage: 'docker rmi <image>' },
    { name: 'exec', description: 'Execute command in container', usage: 'docker exec -it <container> <command>' },
    { name: 'logs', description: 'View container logs', usage: 'docker logs <container>' },
    { name: 'pull', description: 'Pull an image', usage: 'docker pull <image>' },
    { name: 'push', description: 'Push an image', usage: 'docker push <image>' }
  ]
};

// Helper function to generate help text
function generateHelpText(command) {
  let helpText = '';
  
  if (commandHelp[command]) {
    const info = commandHelp[command];
    helpText += `# ${command.toUpperCase()} - ${info.description}\n\n`;
    helpText += `USAGE:\n  ${info.usage}\n\n`;
    helpText += `EXAMPLES:\n`;
    info.examples.forEach(ex => {
      helpText += `  ${ex}\n`;
    });
  } else {
    helpText += `# ${command.toUpperCase()}\n\n`;
    helpText += `Command: ${command}\n`;
    helpText += `\nTo get help, try:\n`;
    helpText += `  ${command} --help\n`;
    helpText += `  ${command} help\n`;
    helpText += `  man ${command}\n`;
  }
  
  return helpText;
}

// Search endpoint
app.get('/api/search', async (req, res) => {
  const { command } = req.query;

  if (!command) {
    return res.status(400).json({ error: 'Command parameter is required' });
  }

  const cmd = command.toLowerCase().trim();
  
  // Generate help text
  const helpText = generateHelpText(cmd);
  
  // Get subcommands
  const subCommands = commonSubCommands[cmd] || [];
  
  // Simulate search results
  const searchResults = [
    {
      title: `${cmd} - Official Documentation`,
      snippet: commandHelp[cmd]?.description || `Documentation for the ${cmd} command-line tool.`,
      url: `https://example.com/docs/${cmd}`
    },
    {
      title: `${cmd} Cheat Sheet`,
      snippet: `Quick reference guide for ${cmd} commands and options.`,
      url: `https://example.com/cheatsheets/${cmd}`
    }
  ];

  res.json({
    command: cmd,
    helpText,
    subCommands,
    searchResults
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🖥️  CMD Hacker Terminal Server running on http://localhost:${PORT}`);
});
