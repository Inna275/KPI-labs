const EventEmitter = require('events');

const chatEmitter = new EventEmitter();

const sendMessage = (username, message) => {
  chatEmitter.emit('newMessage', { username, message });
};

const displayMessage = ({ username, message }) => {
  console.log(`${username}: ${message}`);
};

const autoReply = ({ username, message }) => {
  const lowerCaseMessage = message.toLowerCase();

  if (username === 'Bot') return;

  if (lowerCaseMessage.includes('hello')) {
    sendMessage('Bot', `Hello, ${username}! How can I help you?`);
  } else if (lowerCaseMessage.includes('help')) {
    sendMessage('Bot', 'What do you need help with?');
  } else if (lowerCaseMessage.includes('bye')) {
    sendMessage('Bot', 'If you have any more questions, feel free to ask!');
  }
};

chatEmitter.on('newMessage', displayMessage);
chatEmitter.on('newMessage', autoReply);

const simulateChat = () => {
  setTimeout(() => sendMessage('User1', 'Hello'), 1000); 
  setTimeout(() => sendMessage('User2', 'I need help!'), 3000); 
  setTimeout(() => sendMessage('User3', 'Bye, thank you.'), 5000);
};

simulateChat();

setTimeout(() => {
  chatEmitter.off('newMessage', displayMessage);
  chatEmitter.off('newMessage', autoReply);
  console.log("Chat ended.");
}, 8000);
