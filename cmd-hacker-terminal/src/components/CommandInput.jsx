import { useState, useRef, useEffect } from 'react';

function CommandInput({ onSubmit, disabled }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <div className="command-input-container">
      <form onSubmit={handleSubmit} className="command-form">
        <span className="prompt">root@hacker:~#</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Enter command (e.g., npm, git, docker)..."
          className="command-input"
          autoFocus
        />
        <button type="submit" disabled={disabled} className="submit-btn">
          {disabled ? '...' : 'EXECUTE'}
        </button>
      </form>
    </div>
  );
}

export default CommandInput;
