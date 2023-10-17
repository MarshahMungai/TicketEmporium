import { DataTypes } from 'sequelize';

const Review = (sequelize, Sequelize) => {
  const Review = sequelize.define("review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  review: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
  return Review;
};

export default Review;
