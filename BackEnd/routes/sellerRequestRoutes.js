import express from 'express';
import {
  createSellerRequest,
  getAllSellerRequests,
  getSellerRequestById,
  updateSellerRequestById,
  deleteSellerRequestById,
} from '../controllers/sellerRequestController.js';

const router = express.Router();

router.post('/seller-requests', createSellerRequest);

router.get('/seller-requests', getAllSellerRequests);

router.get('/seller-requests/:id', getSellerRequestById);

router.patch('/seller-requests/:id', updateSellerRequestById);

router.delete('/seller-requests/:id', deleteSellerRequestById);

export default router;
