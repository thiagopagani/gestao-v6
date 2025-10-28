
const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// --- Test Route ---
router.get('/test', (req, res) => {
  res.json({ message: 'Backend API is working!' });
});

// --- Company Routes ---

// GET all companies from the database
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.findAll({
      order: [['name', 'ASC']],
    });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// POST a new company to the database
router.post('/companies', async (req, res) => {
  try {
    const { name, cnpj, contact, phone, status } = req.body;
    
    // Basic validation
    if (!name || !cnpj) {
      return res.status(400).json({ error: 'Name and CNPJ are required.' });
    }

    const newCompany = await Company.create({
      name,
      cnpj,
      contact,
      phone,
      status: status || 'Ativo',
    });
    res.status(201).json(newCompany);
  } catch (error) {
    console.error('Error creating company:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
       return res.status(409).json({ error: 'CNPJ already exists.' });
    }
    res.status(500).json({ error: 'Failed to create company' });
  }
});

// --- Mock Data Routes (for other pages) ---

const mockClients = [
    { id: 1, name: 'Supermercado Central', companyId: 1, companyName: 'Tech Solutions Ltda', contact: 'Gerente João', status: 'Ativo' },
    { id: 2, name: 'Hospital da Cidade', companyId: 2, companyName: 'Inova Corp', contact: 'Dra. Maria', status: 'Ativo' },
    { id: 3, name: 'Escola Aprender Mais', companyId: 1, companyName: 'Tech Solutions Ltda', contact: 'Diretora Ana', status: 'Inativo' },
];

const mockEmployees = [
    { id: 1, name: 'Fernando Alves', cpf: '111.222.333-44', phone: '(11) 98888-7777', type: 'Autônomo', status: 'Ativo' },
    { id: 2, name: 'Beatriz Costa', cpf: '444.555.666-77', phone: '(21) 97777-6666', type: 'Treinamento', status: 'Ativo' },
    { id: 3, name: 'Carlos Pereira', cpf: '777.888.999-00', phone: '(31) 96666-5555', type: 'Autônomo', status: 'Inativo' },
];

const mockDailyRates = [
    { id: 1, employeeId: 1, employeeName: 'Fernando Alves', clientId: 1, clientName: 'Supermercado Central', companyName: 'Tech Solutions Ltda', date: '2025-10-27', value: 150.00, status: 'Pendente' },
    { id: 2, employeeId: 2, employeeName: 'Beatriz Costa', clientId: 2, clientName: 'Hospital da Cidade', companyName: 'Inova Corp', date: '2025-10-27', value: 120.50, status: 'Pago' },
    { id: 3, employeeId: 1, employeeName: 'Fernando Alves', clientId: 3, clientName: 'Escola Aprender Mais', companyName: 'Tech Solutions Ltda', date: '2025-10-26', value: 150.00, status: 'Cancelado' },
];


router.get('/clients', (req, res) => {
    res.json(mockClients);
});

router.get('/employees', (req, res) => {
    res.json(mockEmployees);
});

router.get('/daily-rates', (req, res) => {
    res.json(mockDailyRates);
});

module.exports = router;
