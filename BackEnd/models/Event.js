import { DataTypes } from 'sequelize';

const Event = (sequelize, Sequelize) => {
  const Event = sequelize.define('event', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    eventName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('Music Concert', 'Sports', 'Theatre & Performing Arts', 'Clubbing Experience', 'Conference/Seminar', 'Festival', 'Other'),
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    eventTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    eventPoster: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
        ticketQuantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ticketPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
  });

  return Event;
};

export default Event;
