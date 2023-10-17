import express from 'express';
import { createMessage, getMessageById, getAllMessages, updateMessageById, deleteMessageById } from '../controllers/messageController.js';

const router = express.Router();

router.post('/messages', createMessage);

router.get('/messages/:id', getMessageById);

router.get('/messages', getAllMessages);

router.patch('/messages/:id', updateMessageById);

router.delete('/messages/:id', deleteMessageById);

export default router;
