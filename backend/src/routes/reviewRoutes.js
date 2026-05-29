import express from 'express';
import { addReview, getAllReviews, deleteReview } from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getAllReviews);

router.route('/:id')
  .delete(protect, admin, deleteReview);

router.route('/:tourId')
  .post(protect, addReview);

export default router;
