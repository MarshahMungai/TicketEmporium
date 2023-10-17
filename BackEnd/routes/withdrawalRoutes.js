import express from 'express';
import { createWithdrawal, getWithdrawalById, getAllWithdrawals, updateWithdrawalById, deleteWithdrawalById } from '../controllers/withdrawalController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/withdrawals', getAllWithdrawals);

router.get('/withdrawals/:id', getWithdrawalById);

router.post('/withdrawals', createWithdrawal);

router.patch('/withdrawals/:id', updateWithdrawalById);

router.delete('/withdrawals/:id', deleteWithdrawalById);

export default router;
