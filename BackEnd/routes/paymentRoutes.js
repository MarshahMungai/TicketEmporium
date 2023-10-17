import express from 'express';
import { createPayment, getPaymentById, getAllPayments, updatePaymentById, deletePaymentById } from '../controllers/paymentController.js';
// import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/payments', createPayment);

router.get('/payments/:id',  getPaymentById);

router.get('/payments',  getAllPayments);

router.put('/payments/:id',  updatePaymentById);

router.delete('/payments/:id', deletePaymentById);

export default router;
