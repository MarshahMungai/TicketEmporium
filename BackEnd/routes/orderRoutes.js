import express from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrderById, deleteOrderById, getOrderCount, getOrdersByUserId, getTotalAmountByUserId, getOrderCountByUserId, getOrdersBySellerId } from '../controllers/orderController.js';

const router = express.Router();

router.get('/orders', getAllOrders);

router.get('/orders/:id', getOrderById);

router.post('/orders', createOrder);

router.patch('/orders/:id', updateOrderById);

router.delete('/orders/:id', deleteOrderById);

router.get('/orders-count', getOrderCount);

router.get('/orders/user/:user_id', getOrdersByUserId);

router.get('/orders-revenue/user/:user_id', getTotalAmountByUserId);

router.get('/ticket-count/:user_id', getOrderCountByUserId);

router.get('/orders/seller/:user_id', getOrdersBySellerId);



export default router;
