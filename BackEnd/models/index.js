import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* MODEL IMPORTS */

import User from './User.js';
db.User = User(sequelize, Sequelize);

import Role from './Role.js';
db.Role = Role(sequelize, Sequelize);

import UserRole from "./UserRole.js";
db.UserRole = UserRole(sequelize, Sequelize);

import Event from './Event.js';
db.Event = Event(sequelize, Sequelize);

import Ticket from './Ticket.js';
db.Ticket = Ticket(sequelize, Sequelize);

import Order from './Order.js';
db.Order = Order(sequelize, Sequelize);

import Payment from './Payment.js';
db.Payment = Payment(sequelize, Sequelize);

import Withdrawal from './Withdrawal.js';
db.Withdrawal = Withdrawal(sequelize, Sequelize);

import Review from './Review.js';
db.Review = Review(sequelize, Sequelize);

import ReviewResponse from './ReviewResponse.js';
db.ReviewResponse = ReviewResponse(sequelize, Sequelize);

import SavedEvent from './SavedEvent.js';
db.SavedEvent = SavedEvent(sequelize, Sequelize);

import Message from './Message.js';
db.Message = Message(sequelize, Sequelize);

import MessageResponse from './MessageResponse.js';
db.MessageResponse = MessageResponse(sequelize, Sequelize);

import Refund from './Refund.js';
db.Refund = Refund(sequelize, Sequelize);

import SellerRequest from './SellerRequest.js';
db.SellerRequest = SellerRequest(sequelize, Sequelize);



/* RELATIONSHIPS */

// User and Role has Many-To-Many Relationship
db.User.belongsToMany(db.Role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id"
});
db.Role.belongsToMany(db.User, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
});

// User and Event has One-To-Many Relationship
db.User.hasMany(db.Event, {
  foreignKey: 'user_id',
});

// Event and Ticket has One-To-Many Relationship
db.Event.hasMany(db.Ticket, {
  foreignKey: 'event_id',
  as: 'tickets', // Define an alias for the association
});

// Order and Ticket has One-To-Many Relationship
db.Order.hasMany(db.Ticket, {
  foreignKey: 'order_id',
});


// Order and Payment has One-To-One Relationship
db.Order.hasOne(db.Payment, {
  foreignKey: 'order_id',
});


// Event and Review has One-To-Many Relationship
db.Event.hasMany(db.Review, {
  foreignKey: 'event_id',
});


// Event and SavedEvent has One-To-One Relationship
db.Event.hasOne(db.SavedEvent, {
  foreignKey: 'event_id',
});


// User and SavedEvent has One-To-Many Relationship
db.User.hasMany(db.SavedEvent, {
  foreignKey: 'user_id',
});


// User and Review has One-To-Many Relationship
db.User.hasMany(db.Review, {
  foreignKey: 'user_id',
});


// Review and ReviewResponse has One-To-One Relationship
db.Review.hasOne(db.ReviewResponse, {
  foreignKey: 'review_id',
});


// User and ReviewResponse has One-To-Many Relationship
db.User.hasMany(db.ReviewResponse, {
  foreignKey: 'user_id',
});

// User and Message has One-To-Many Relationship
db.User.hasMany(db.Message, {
  foreignKey: 'user_id',
});


// Message and MessageResponse has One-To-One Relationship
db.Message.hasOne(db.MessageResponse, {
  foreignKey: 'message_id',
});


// User and Refund has One-To-Many Relationship
db.User.hasMany(db.Refund, {
  foreignKey: 'user_id',
});


// User and Payment has One-To-Many Relationship
db.User.hasMany(db.Payment, {
  foreignKey: 'user_id',
});


// Payment and Refund has One-To-One Relationship
db.Payment.hasOne(db.Refund, {
  foreignKey: 'payment_id',
});


// User and Order has One-To-Many Relationship
db.User.hasMany(db.Order, {
  foreignKey: 'user_id',
});


// User and Withdrawal has One-To-Many Relationship
db.User.hasMany(db.Withdrawal, {
  foreignKey: 'user_id',
});


export default db;




/* Relationships Summary */

// user - role = many to many
// Payment - Refund = One to One,
// Event - SavedEvent = One to One,
// Event - Ticket = one to many
// Event - Review = one to many
// user - SavedEvent = One to Many,
// user - Event = One to Many,
// user - Review = One to Many,
// Review - ReviewResponse = One to One,
// user - ReviewResponse = One to Many,
// user - Message = One to Many,
// Message - MessageResponse = One to One,
// user - Refund = One to Many,
// user - Payment = One to Many,
// Payment - Order = One to One,
// Order - Ticket = One to Many,
// user - Order = One to Many,
// user - Withdrawal = One to Many,