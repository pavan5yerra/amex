import React, { useState, useEffect, useRef } from 'react';

function App1() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState([]);
  const app2Window = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'http://localhost:3001') return; // Check the origin
      setReceivedMessage([...receivedMessage , event.data]);
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, [receivedMessage]);

  const openApp2 = () => {
    if (!app2Window.current || app2Window.current.closed) {
      app2Window.current = window.open('http://localhost:3001');
    }
  };

  const sendMessage = () => {
    if (app2Window.current) {
      app2Window.current.postMessage(message, 'http://localhost:3001');
    } else {
      alert('App 2 is not open.');
    }
  };

  useEffect(() => {
    openApp2(); // Automatically open App 2 when App 1 is loaded
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>App 1 (Sender & Receiver)</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send to App 2</button>
      <div>
        <h3>Received Message:</h3>
        <div>
          <h3>Chats</h3>
          <ul>
            {receivedMessage.map((msg,index ) => <li key={index}>{msg}</li>)}
            </ul>
          </div>
      </div>
    </div>
  );
}

export default App1;
