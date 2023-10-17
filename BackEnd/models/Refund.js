import { DataTypes } from 'sequelize';

const Refund = (sequelize, Sequelize) => {
    const Refund = sequelize.define('Refund', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      refundDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      refundTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.ENUM('M-PESA', 'Credit/Debit Card', 'Paypal'),
        allowNull: false
      },
      refundStatus: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
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
    return Refund;
};
export default Refund;