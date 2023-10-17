import { DataTypes } from 'sequelize';

const SellerRequest = (sequelize, Sequelize) => {
    const SellerRequest = sequelize.define('SellerRequest', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        sellerEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sellerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sellerPhone: {
            type: DataTypes.STRING,
            allowNull: false,
        },   
        sellerIdNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyPhone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sellerVerificationStatus: {
            type: DataTypes.ENUM('pending', 'verified'),
            defaultValue: 'pending',
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
    });
    return SellerRequest;
};
export default SellerRequest;