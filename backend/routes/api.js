const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// --- Companies Route (Connected to Database) ---
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.findAll({ order: [['name', 'ASC']] });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies from database.' });
  }
});

// --- Mock Data for other routes ---
const mockClients = [
    { id: 1, name: 'Supermercado Central', companyId: 1, companyName: 'Tech Solutions Ltda', contact: 'Gerente João', status: 'Ativo' },
    { id: 2, name: 'Loja de Departamentos Principal', companyId: 2, companyName: 'Inova Corp', contact: 'Ana supervisora', status: 'Ativo' },
];

const mockEmployees = [
    { id: 1, name: 'Fernando Alves', cpf: '111.222.333-44', phone: '(11) 98877-6655', type: 'Autônomo', status: 'Ativo' },
    { id: 2, name: 'Beatriz Costa', cpf: '444.555.666-77', phone: '(21) 97766-5544', type: 'Treinamento', status: 'Ativo' },
];

const mockDailyRates = [
    { id: 1, employeeId: 1, employeeName: 'Fernando Alves', clientId: 1, clientName: 'Supermercado Central', companyName: 'Tech Solutions Ltda', date: '2025-10-27', value: 150.00, status: 'Pago' },
    { id: 2, employeeId: 2, employeeName: 'Beatriz Costa', clientId: 2, clientName: 'Loja de Departamentos Principal', companyName: 'Inova Corp', date: '2025-10-27', value: 120.00, status: 'Pendente' },
];

// --- Other Routes (Using Mock Data) ---
router.get('/clients', (req, res) => res.json(mockClients));
router.get('/employees', (req, res) => res.json(mockEmployees));
router.get('/daily-rates', (req, res) => res.json(mockDailyRates));

module.exports = router;