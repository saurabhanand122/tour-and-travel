import express from 'express';
import {
  createMessage,
  getAllMessages,
  deleteMessage,
} from '../controllers/messageController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(createMessage)
  .get(protect, admin, getAllMessages);

router.route('/:id')
  .delete(protect, admin, deleteMessage);

export default router;
