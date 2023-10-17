import express from 'express';
import { createRefund, getRefundById, getAllRefunds, updateRefundById, deleteRefundById } from '../controllers/refundController.js';

const router = express.Router();

router.post('/refunds', createRefund);

router.get('/refunds/:id', getRefundById);

router.get('/refunds', getAllRefunds);

router.patch('/refunds/:id', updateRefundById);

router.delete('/refunds/:id', deleteRefundById);

export default router;
