import { DataTypes } from 'sequelize';

const SavedEvent = (sequelize, Sequelize) => {
    const SavedEvent = sequelize.define('SavedEvent', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      
    });
    return SavedEvent;
};
export default SavedEvent;

