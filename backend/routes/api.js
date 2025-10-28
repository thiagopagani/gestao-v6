const express = require('express');
const router = express.Router();

// Import all necessary models
const Company = require('../models/Company');
const Client = require('../models/Client');
const Employee = require('../models/Employee');
const DailyRate = require('../models/DailyRate');

// --- Define Model Associations ---
// This is crucial for Sequelize to understand the relationships and perform JOINs.
Client.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
Company.hasMany(Client, { foreignKey: 'companyId' });

DailyRate.belongsTo(Employee, { foreignKey: 'employeeId', as: 'employee' });
Employee.hasMany(DailyRate, { foreignKey: 'employeeId' });

DailyRate.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Client.hasMany(DailyRate, { foreignKey: 'clientId' });

// --- Company Routes ---

// GET all companies
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.findAll({ order: [['name', 'ASC']] });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// POST a new company
router.post('/companies', async (req, res) => {
  try {
    const { name, cnpj, contact, phone, status } = req.body;
    // Basic validation
    if (!name || !cnpj) {
        return res.status(400).json({ error: 'Name and CNPJ are required.' });
    }
    const newCompany = await Company.create({ name, cnpj, contact, phone, status });
    res.status(201).json(newCompany);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
});


// --- Other Entity Routes (using mock data for now) ---

// GET all clients
router.get('/clients', async (req, res) => {
  // This will be replaced with a real DB query later
  const mockClients = [
    { id: 1, name: 'Supermercado Central', companyName: 'Tech Solutions Ltda', contact: 'Gerente João', status: 'Ativo' },
    { id: 2, name: 'Hospital da Cidade', companyName: 'Inova Corp', contact: 'Dra. Ana', status: 'Ativo' },
  ];
  res.json(mockClients);
});

// GET all employees
router.get('/employees', async (req, res) => {
  // This will be replaced with a real DB query later
   const mockEmployees = [
    { id: 1, name: 'Fernando Alves', cpf: '111.222.333-44', phone: '(11) 98888-7777', type: 'Autônomo', status: 'Ativo' },
    { id: 2, name: 'Beatriz Costa', cpf: '444.555.666-77', phone: '(21) 97777-6666', type: 'Treinamento', status: 'Ativo' },
  ];
  res.json(mockEmployees);
});

// GET all daily rates
router.get('/daily-rates', async (req, res) => {
  // This will be replaced with a real DB query later
  const mockDailyRates = [
    { id: 1, date: '2025-10-27', employeeName: 'Fernando Alves', clientName: 'Supermercado Central', companyName: 'Tech Solutions Ltda', value: 150.00, status: 'Pendente' },
    { id: 2, date: '2025-10-26', employeeName: 'Beatriz Costa', clientName: 'Hospital da Cidade', companyName: 'Inova Corp', value: 220.50, status: 'Pago' },
  ];
  res.json(mockDailyRates);
});

module.exports = router;
