function TerminalOutput({ output }) {
  return (
    <div className="terminal-output">
      {output.map((line, index) => (
        <div key={index} className={`terminal-line ${line.type}`}>
          <span className="timestamp">[{line.timestamp}]</span>
          <span className="content">{line.text}</span>
        </div>
      ))}
    </div>
  );
}

export default TerminalOutput;
