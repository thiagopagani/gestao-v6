
const express = require('express');
const router = express.Router();

// NOTE: This implementation assumes that Sequelize models for Client, Employee, 
// and DailyRate exist in the `../models/` directory and that all necessary
// model associations have been defined (e.g., in a models/index.js file).
const Company = require('../models/Company');
const Client = require('../models/Client');
const Employee = require('../models/Employee');
const DailyRate = require('../models/DailyRate');

// For the purpose of making the queries work, we define the associations here.
// In a typical project, this would be in a central place like `models/index.js`.
if (Client && Company) {
    Client.belongsTo(Company, { foreignKey: 'companyId' });
    Company.hasMany(Client, { foreignKey: 'companyId' });
}
if (DailyRate && Employee) {
    DailyRate.belongsTo(Employee, { foreignKey: 'employeeId' });
    Employee.hasMany(DailyRate, { foreignKey: 'employeeId' });
}
if (DailyRate && Client) {
    DailyRate.belongsTo(Client, { foreignKey: 'clientId' });
    Client.hasMany(DailyRate, { foreignKey: 'clientId' });
}

// GET all companies
router.get('/api/companies', async (req, res) => {
  try {
    const companies = await Company.findAll({ order: [['name', 'ASC']] });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// GET all clients with their company name
router.get('/api/clients', async (req, res) => {
    try {
        const clients = await Client.findAll({
            include: [{
                model: Company,
                attributes: ['name'],
            }],
            order: [['name', 'ASC']]
        });
        
        const formattedClients = clients.map(c => ({
            ...c.toJSON(),
            companyName: c.Company ? c.Company.name : 'N/A',
        }));

        res.json(formattedClients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
});

// GET all employees
router.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.findAll({ order: [['name', 'ASC']] });
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

// GET all daily rates with related names
router.get('/api/daily-rates', async (req, res) => {
    try {
        const dailyRates = await DailyRate.findAll({
            include: [
                { model: Employee, attributes: ['name'] },
                { 
                    model: Client, 
                    attributes: ['name'], 
                    include: [{ model: Company, attributes: ['name'] }]
                }
            ],
            order: [['date', 'DESC']]
        });
        
        const formattedRates = dailyRates.map(r => ({
            ...r.toJSON(),
            employeeName: r.Employee ? r.Employee.name : 'N/A',
            clientName: r.Client ? r.Client.name : 'N/A',
            companyName: r.Client && r.Client.Company ? r.Client.Company.name : 'N/A',
        }));
        
        res.json(formattedRates);
    } catch (error) {
        console.error('Error fetching daily rates:', error);
        res.status(500).json({ error: 'Failed to fetch daily rates' });
    }
});

module.exports = router;
