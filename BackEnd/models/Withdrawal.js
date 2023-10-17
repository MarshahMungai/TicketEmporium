import { DataTypes, Model } from 'sequelize';

const Withdrawal = (sequelize, Sequelize) => {
  const Withdrawal = sequelize.define('withdrawal', {
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
    withdrawalDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    withdrawalTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    withdrawalMethod: {
      type: DataTypes.ENUM('M-PESA', 'Credit/Debit Card', 'Paypal'),
      allowNull: false
    },
    withdrawalStatus: {
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
  return Withdrawal;
};

export default Withdrawal;
