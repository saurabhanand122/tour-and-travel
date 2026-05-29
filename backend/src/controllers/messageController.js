import Message from '../models/Message.js';

// @desc    Send a message (public contact form submission)
// @route   POST /api/messages
// @access  Public
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required.',
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! Thank you.',
      data: newMessage,
    });
  } catch (error) {
    console.error('Create Message Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all messages (admin review panel)
// @route   GET /api/messages
// @access  Private/Admin
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error('Get All Messages Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    await message.deleteOne();

    return res.json({
      success: true,
      message: 'Message removed successfully.',
    });
  } catch (error) {
    console.error('Delete Message Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
