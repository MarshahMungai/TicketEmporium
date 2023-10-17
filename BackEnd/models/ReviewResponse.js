import { DataTypes } from 'sequelize';

const ReviewResponse = (sequelize, Sequelize) => {
    const ReviewResponse = sequelize.define('ReviewResponse', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      
      response: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
        }

    });
    return ReviewResponse;
};
export default ReviewResponse;