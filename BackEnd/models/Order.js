import { DataTypes } from 'sequelize';

const Order = (sequelize, Sequelize) => {
  const Order = sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // ticketQuantity: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
        eventName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        seller_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        buyer_firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        buyer_lastName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
  });
  return Order;
};

export default Order;
