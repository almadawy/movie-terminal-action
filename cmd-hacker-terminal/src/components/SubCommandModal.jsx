import { useState } from 'react';

function SubCommandModal({ subCommands, command, onClose, onSelect, onExecute }) {
  const [selectedSub, setSelectedSub] = useState(null);
  const [showParams, setShowParams] = useState(false);
  const [params, setParams] = useState('');

  const handleSubCommandClick = (subCmd) => {
    setSelectedSub(subCmd);
    setShowParams(true);
  };

  const handleExecute = () => {
    if (selectedSub) {
      onExecute(params);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>SELECT SUB-COMMAND</h2>
          <button onClick={onClose} className="close-modal">×</button>
        </div>

        {!showParams ? (
          <div className="modal-body">
            <div className="command-info">
              <span className="label">COMMAND:</span>
              <span className="value">{command}</span>
            </div>
            <div className="subcommands-grid">
              {subCommands.map((subCmd, index) => (
                <button
                  key={index}
                  onClick={() => handleSubCommandClick(subCmd)}
                  className="subcommand-card"
                >
                  <div className="subcommand-name">{subCmd.name}</div>
                  <div className="subcommand-desc">
                    {subCmd.description || 'No description available'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="modal-body params-mode">
            <div className="selected-info">
              <div className="command-info">
                <span className="label">COMMAND:</span>
                <span className="value">{command}</span>
              </div>
              <div className="subcommand-info">
                <span className="label">SUB-COMMAND:</span>
                <span className="value highlight">{selectedSub.name}</span>
              </div>
            </div>

            <div className="params-section">
              <label className="params-label">ENTER PARAMETERS:</label>
              <textarea
                value={params}
                onChange={(e) => setParams(e.target.value)}
                placeholder="Enter command parameters..."
                className="params-input"
                rows={4}
              />
              <div className="params-hint">
                Example: --save --dev package-name
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowParams(false)} className="back-btn">
                ← BACK
              </button>
              <button onClick={handleExecute} className="execute-btn">
                ▶ EXECUTE
              </button>
            </div>
          </div>
        )}

        <div className="modal-footer">
          <div className="typing-indicator">
            <span>AWAITING INPUT</span>
            <span className="blink">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubCommandModal;
