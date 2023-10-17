import { DataTypes } from 'sequelize';

const Payment = (sequelize, Sequelize) => {
  const Payment = sequelize.define('payment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    paymentTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM('M-PESA', 'Credit/Debit Card', 'Paypal'),
      allowNull: false
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Payment;
};

export default Payment;
