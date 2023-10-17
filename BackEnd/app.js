import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import userRoleRouter from './routes/userRoleRoutes.js';
import db from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import withdrawalRoutes from './routes/withdrawalRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import reviewResponseRoutes from './routes/reviewResponseRoutes.js';
import savedEventRoutes from './routes/savedEventRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import messageResponseRoutes from './routes/messageResponseRoutes.js';
import refundRoutes from './routes/refundRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import sellerRequestRoutes from './routes/sellerRequestRoutes.js';
//import safcomRoutes from './routes/safcomRoutes.js';


import errorHandler from './middlewares/errorHandler.js';

const sequelize = db.sequelize;

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

sequelize.sync({ alter: true }).then(() => {
  console.log("Tables created.");
}).catch(err => {
  console.log(err);
});

app.use('/api/v1', userRoutes);
app.use('/api/v1', roleRoutes);
app.use('/api/v1', userRoleRouter);
app.use('/api/v1', authRoutes);
app.use('/api/v1', eventRoutes);
app.use('/api/v1', ticketRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoutes);
app.use('/api/v1', withdrawalRoutes);
app.use('/api/v1', reviewRoutes);
app.use('/api/v1', reviewResponseRoutes);
app.use('/api/v1', savedEventRoutes);
app.use('/api/v1', messageRoutes);
app.use('/api/v1', messageResponseRoutes);
app.use('/api/v1', refundRoutes);
app.use('/api/v1', emailRoutes);
app.use('/api/v1', sellerRequestRoutes);
//app.use('/api/v1', safcomRoutes);



app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});