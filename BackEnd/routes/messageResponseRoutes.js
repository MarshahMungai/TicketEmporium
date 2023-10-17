import express from 'express';
import {
  createMessageResponse,
  getMessageResponseById,
  getAllMessageResponses,
  updateMessageResponseById,
  deleteMessageResponseById,
  getResponsesByUserId
} from '../controllers/messageResponseController.js';

const router = express.Router();

router.post('/message-responses', createMessageResponse);

router.get('/message-responses/:id', getMessageResponseById);

router.get('/message-responses', getAllMessageResponses);

router.patch('/message-responses/:id', updateMessageResponseById);

router.delete('/message-responses/:id', deleteMessageResponseById);

router.get('/message-responses/user/:user_id', getResponsesByUserId);

export default router;
