import { Paper, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = () => {

  useEffect(() => {
    // Set the data-route attribute to 'auction' on component mount
    document.body.setAttribute('data-route', 'chat');

    // Clean up on component unmount
    return () => {
      document.body.removeAttribute('data-route');
    };
  }, []);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  // const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  
  useEffect(() => {
    // Connect to the Socket.IO server
    const socketInstance = io('http://localhost:9000'); // Replace with your server URL
    setSocket(socketInstance);

    // Cleanup on component unmount
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => {
        // Check if the message is not already in the array before adding it
        if (!prevMessages.some((msg) => msg.text === message.text)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      }); });
    // Cleanup event listeners on component unmount
    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket && newMessage.trim() !== '') {
    const newMessageObject = {
      text: newMessage,
      sent: true, // Add this property to mark the message as sent
    };

    socket.emit('sendMessage', newMessageObject);
    setMessages((prevMessages) => [...prevMessages, newMessageObject]);
    setNewMessage('');
    console.log('message sent successfully');
  }
};

  return (
    <Paper elevation={5} style={{backgroundColor:'rgba(11,25,190,0.5)',textAlign:'center', display: 'flex', flexDirection: 'column', height: '70vh', padding: '16px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        <strong>Chat Room</strong>
      </Typography>
      <List style={{ overflowY: 'auto', flexGrow: 1}}>
        {messages.map((message, index) => (
          <ListItem key={index} style={{textAlign: message.sent ? 'left' : 'right',}}>
            <ListItemText
              primary={message.text}
              style={{ backgroundColor: message.sent ? '#3f51b5' : '#f1f0f0', padding: '8px', borderRadius: '8px',color: message.sent ? 'white' : 'black', }}
            />
          </ListItem>
        ))}
      </List>
      <div style={{ display: 'flex', marginTop: '16px' }}>
        <TextField
          style={{ flexGrow: 1, marginRight: '8px' }}
          variant="outlined"
          label="Write your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default Chat;
