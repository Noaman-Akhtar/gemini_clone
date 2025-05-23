import React, { useState, useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets.js';
import { Context } from '../../context/context.jsx';

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // State to toggle history display
  const { prevPrompts, runPrompt ,recentPrompt,newChat} = useContext(Context); // Access previous prompts and runPrompt from context

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => {
            setExtended(!extended);
          }}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />

        <div className="new-chat" onClick={newChat}>
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div style={{cursor:'pointer'}} className="recent-entry"  onClick={() => runPrompt(recentPrompt)}>
              <img src={assets.message_icon} alt="" />
              <p >{recentPrompt}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div
          className="bottom-item"
          style={{cursor:'pointer'}}
          onClick={() => setShowHistory(!showHistory)} // Toggle history display
        >
          <img src={assets.history_icon} alt="" />
          {extended ? <p>History</p> : null}
        </div>
        {showHistory && (
          <div className="history">
            <p className="history-title">Previous Prompts</p>
            <ul>
            {prevPrompts.length > 0 ? (
  prevPrompts.map((prompt, index) => (
    <li
      key={index}
      style={{cursor:'default'}}
      onClick={() => runPrompt(prompt)} // Allow clicking on a previous prompt
      className="history-item"
    >
      {prompt}
    </li>
  ))
) : (
  <p>No history available</p>
)}
            </ul>
          </div>
        )}
        <div className="bottom-item">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;