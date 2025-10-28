const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DailyRate = sequelize.define('DailyRate', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Pago', 'Cancelado'),
    allowNull: false,
    defaultValue: 'Pendente',
  },
  // Foreign Keys for Employee and Client will be added automatically
}, {
  tableName: 'DailyRates',
  timestamps: true,
});

module.exports = DailyRate;
