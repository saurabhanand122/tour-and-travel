import express from 'express';
import { registerUser, loginUser, getUserProfile, getAllUsers, updateUserRole, deleteUser } from '../controllers/authController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

// Admin user management routes
router.get('/users', protect, admin, getAllUsers);
router.route('/users/:id')
  .patch(protect, admin, updateUserRole)
  .delete(protect, admin, deleteUser);

export default router;
