import express from 'express';
import { createTicket, getTicketById, getAllTickets, updateTicketById, deleteTicketById } from '../controllers/ticketController.js';

const router = express.Router();

router.post('/tickets', createTicket);

router.get('/tickets/:id', getTicketById);

router.get('/tickets', getAllTickets)

router.patch('/tickets/:id', updateTicketById);

router.delete('/tickets/:id', deleteTicketById);

export default router;
