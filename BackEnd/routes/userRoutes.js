import express from 'express';
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById, updatePromoById, getUserCount } from '../controllers/UserController.js';

const router = express.Router();

router.get('/users', getAllUsers);

router.get('/users/:id', getUserById);

router.post('/users', createUser);

router.patch('/users/:id', updateUserById);

router.delete('/users/:id', deleteUserById);

router.patch('/users-promo/:id', updatePromoById);

router.get('/users-count', getUserCount);


export default router;