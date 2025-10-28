const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const { Status } = require('../../types/types');

class Company extends Model {}

Company.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(Status)),
    defaultValue: Status.Active,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Company',
  timestamps: true, // This will add createdAt and updatedAt fields
});

// We need to export both the class and an object containing the class
// for different import styles (require vs ES6 import)
module.exports = { Company };
