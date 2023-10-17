import express from 'express';
import { createReview, getAllReviews, getReviewById, updateReviewById, deleteReviewById } from '../controllers/reviewController.js';
// import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/reviews', createReview);

router.get('/reviews', getAllReviews);

router.get('/reviews/:id', getReviewById);

router.patch('/reviews/:id', updateReviewById);

router.delete('/reviews/:id', deleteReviewById);

export default router;
