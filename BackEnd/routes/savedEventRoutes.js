import express from 'express';
import { createSavedEvent, getSavedEventById, getAllSavedEvents, updateSavedEventById, deleteSavedEventById } from '../controllers/savedEventController.js';

const router = express.Router();

router.post('/saved-events', createSavedEvent);

router.get('/saved-events/:id', getSavedEventById);

router.get('/saved-events', getAllSavedEvents);

router.patch('/saved-events/:id', updateSavedEventById);

router.delete('/saved-events/:id', deleteSavedEventById);

export default router;
