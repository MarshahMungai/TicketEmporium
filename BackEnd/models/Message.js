import { DataTypes } from 'sequelize';

const Message = (sequelize, Sequelize) => {
    const Message = sequelize.define('Message', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },

    });
    return Message;
};
export default Message;