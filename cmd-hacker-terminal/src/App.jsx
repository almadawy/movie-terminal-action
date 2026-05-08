import { useState, useEffect, useRef } from 'react';
import CommandInput from './components/CommandInput';
import TerminalOutput from './components/TerminalOutput';
import SubCommandModal from './components/SubCommandModal';
import './App.css';

function App() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [subCommands, setSubCommands] = useState([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommandSubmit = async (cmd) => {
    if (!cmd.trim()) return;

    setCommand(cmd);
    setLoading(true);
    addOutput(`Searching for command: ${cmd}...`, 'system');

    try {
      const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';
      const response = await fetch(`${API_URL}/search?command=${encodeURIComponent(cmd)}`);
      const data = await response.json();

      if (data.error) {
        addOutput(`Error: ${data.error}`, 'error');
      } else {
        addOutput(`\n${data.helpText}`, 'help');

        if (data.subCommands && data.subCommands.length > 0) {
          setSubCommands(data.subCommands);
          setSelectedCommand(cmd);
          setShowModal(true);
          addOutput('\n[Available sub-commands - select from modal]', 'info');
        } else {
          addOutput('\nNo sub-commands found.', 'warning');
        }
      }
    } catch (error) {
      addOutput(`Error: ${error.message}`, 'error');
    }

    setLoading(false);
  };

  const handleSubCommandSelect = (subCmd) => {
    setShowModal(false);
    addOutput(`\nSelected: ${subCmd.name}`, 'success');
    addOutput(`Description: ${subCmd.description || 'No description'}`, 'info');
    // The modal will handle parameter input
  };

  const handleExecute = (params) => {
    addOutput(`\nExecuting: ${selectedCommand} ${selectedCommand.subCommand} ${params}`, 'success');
    addOutput('[Command executed successfully]', 'success');
    setSelectedCommand(null);
    setSubCommands([]);
  };

  const addOutput = (text, type = 'text') => {
    setOutput(prev => [...prev, { text, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  return (
    <div className="app">
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">CMD_HACKER_TERMINAL v1.0</div>
          <div className="terminal-status">
            <span className="status-dot online"></span>
            ONLINE
          </div>
        </div>

        <div className="terminal-content">
          <div className="scanline"></div>
          <div className="crt-flicker"></div>
          
          <div className="terminal-body" ref={terminalRef}>
            {output.length === 0 && (
              <div className="welcome-message">
                <pre className="ascii-art">
{`
 ██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗ 
██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝
██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
██████╔╝██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                COMMAND TERMINAL
`}
                </pre>
                <p className="glow-text">Enter a command to begin hacking...</p>
                <p className="system-info">System ready. Waiting for input...</p>
              </div>
            )}

            {output.map((line, index) => (
              <div key={index} className={`terminal-line ${line.type}`}>
                <span className="timestamp">[{line.timestamp}]</span>
                <span className="content">{line.text}</span>
              </div>
            ))}

            {loading && (
              <div className="terminal-line loading">
                <span className="timestamp">[SYSTEM]</span>
                <span className="content">
                  <span className="typing">Searching database</span>
                  <span className="cursor">█</span>
                </span>
              </div>
            )}
          </div>

          <CommandInput
            onSubmit={handleCommandSubmit}
            disabled={loading}
          />
        </div>
      </div>

      {showModal && (
        <SubCommandModal
          subCommands={subCommands}
          command={selectedCommand}
          onClose={() => setShowModal(false)}
          onSelect={handleSubCommandSelect}
          onExecute={handleExecute}
        />
      )}
    </div>
  );
}

export default App;
