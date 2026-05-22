import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    fullName: {
      type: String,
      required: [true, 'Please provide the traveler name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide the contact email'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide the contact phone number'],
      trim: true,
    },
    bookAt: {
      type: Date,
      required: [true, 'Please provide the travel/booking date'],
    },
    guestSize: {
      type: Number,
      required: [true, 'Please provide the number of guests'],
      min: [1, 'Must book for at least 1 guest'],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    specialNotes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
