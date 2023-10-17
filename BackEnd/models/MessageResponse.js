import { DataTypes } from 'sequelize';

const MessageResponse = (sequelize, Sequelize) => {
    const MessageResponse = sequelize.define('MessageResponse', {
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
      user_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },

    });
    return MessageResponse;
};
export default MessageResponse;