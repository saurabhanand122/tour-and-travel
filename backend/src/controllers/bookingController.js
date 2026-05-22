import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const { tourId, fullName, email, phone, bookAt, guestSize, specialNotes } = req.body;

    // Check if tour exists
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    // Calculate total price
    const totalPrice = tour.price * Number(guestSize);

    const booking = await Booking.create({
      user: req.user._id,
      tour: tourId,
      fullName,
      email,
      phone,
      bookAt,
      guestSize: Number(guestSize),
      totalPrice,
      specialNotes,
    });

    return res.status(201).json({
      success: true,
      message: 'Booking request sent successfully!',
      data: booking,
    });
  } catch (error) {
    console.error('Create Booking Error:', error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get user's personal bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: 'tour',
        select: 'title images price destination duration',
      })
      .sort('-createdAt');

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Get My Bookings Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('tour', 'title price duration destination')
      .sort('-createdAt');

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Get All Bookings Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid booking status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: booking,
    });
  } catch (error) {
    console.error('Update Booking Status Error:', error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
