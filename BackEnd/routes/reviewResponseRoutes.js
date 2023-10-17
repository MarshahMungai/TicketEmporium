import express from 'express';
import { createReviewResponse, getReviewResponseById, getAllReviewResponses, updateReviewResponseById, deleteReviewResponseById } from '../controllers/reviewResponseController.js';

const router = express.Router();

router.post('/review-responses', createReviewResponse);

router.get('/review-responses/:id', getReviewResponseById);

router.get('/review-responses', getAllReviewResponses);

router.patch('/review-responses/:id', updateReviewResponseById);

router.delete('/review-responses/:id', deleteReviewResponseById);

export default router;
