import express from 'express';
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, admin, getAllBookings);

router.route('/my-bookings')
  .get(protect, getMyBookings);

router.route('/:id/status')
  .patch(protect, admin, updateBookingStatus);

export default router;
