import React, { useState, useEffect } from 'react';

function App2() {
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'http://localhost:3000') return; // Check the origin
      setReceivedMessage([...receivedMessage , event.data ]);
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, [receivedMessage]);

  const sendReply = () => {
    if (window.opener) {
      window.opener.postMessage(replyMessage, 'http://localhost:3000');
    } else {
      alert('App 1 is not open.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>App 2 (Receiver & Sender)</h2>
      <div>
        <h3>Received Message:</h3>
        <div>
          <h3>Chats</h3>
          <ul>
            {receivedMessage.map((msg,index ) => <li key={index}>{msg}</li>)}
            </ul>
          </div>
      </div>
      <input
        type="text"
        value={replyMessage}
        onChange={(e) => setReplyMessage(e.target.value)}
        placeholder="Enter reply"
      />
      <button onClick={sendReply}>Reply to App 1</button>
    </div>
  );
}

export default App2;
