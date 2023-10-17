import { DataTypes } from 'sequelize';

const Ticket = (sequelize, Sequelize) => {
  const Ticket = sequelize.define('ticket', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  ticketType: {
    type: DataTypes.ENUM('Regular', 'VIP', 'VVIP', 'General Admission'),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ticketStatus: {
    type: DataTypes.ENUM( 'Sold', 'Available'),
    allowNull: false,
    defaultValue: 'Available',
  },
  eventName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

});
return Ticket;
};

export default Ticket;
