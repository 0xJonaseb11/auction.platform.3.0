// server/controllers/chat.js
const Chat = require('../models/Chat');

exports.sendMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { message } = req.body;
    const sender = req.user.id; // Assuming user is authenticated using middleware

    const chat = new Chat({
      sender,
      receiver: userId,
      message,
    });

    await chat.save();

    res.status(200).json({ message: 'Message sent successfully', sentMessage: chat });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const sender = req.user.id; // Assuming user is authenticated using middleware

    const chatHistory = await Chat.find({
      $or: [
        { sender, receiver: userId },
        { sender: userId, receiver: sender },
      ],
    }).sort({ timestamp: 'asc' });

    res.status(200).json(chatHistory);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
