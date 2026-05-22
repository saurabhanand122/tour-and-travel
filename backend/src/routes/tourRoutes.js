import express from 'express';
import {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} from '../controllers/tourController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getAllTours)
  .post(protect, admin, createTour);

router.route('/:id')
  .get(getTourById)
  .put(protect, admin, updateTour)
  .delete(protect, admin, deleteTour);

export default router;
