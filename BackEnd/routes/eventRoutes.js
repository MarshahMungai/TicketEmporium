import express from 'express';
import { createEvent, getAllEvents, getEventById, updateEventById, deleteEventById, getEventsByUserId, getEventCount, decreaseTicketQuantity  } from '../controllers/eventController.js';

const router = express.Router();

router.get('/events', getAllEvents);

router.get('/events/:id', getEventById);

router.post('/events', createEvent);

router.patch('/events/:id', updateEventById);

router.delete('/events/:id', deleteEventById);

//router.get('/events/available', getAllAvailableEvents);

router.get('/events/user/:user_id', getEventsByUserId);

router.get('/events-count', getEventCount);

router.patch('/events/ticket/:id', decreaseTicketQuantity);

export default router;