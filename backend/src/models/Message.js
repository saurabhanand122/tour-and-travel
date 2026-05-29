import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address.'],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject.'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide a message.'],
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'uers-message', // Explicitly named per request
  }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
