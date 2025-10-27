const express = require('express');
const router = express.Router();

// Mock Data (will be replaced by database calls)
const mockCompanies = [
    { id: 1, name: 'Tech Solutions Ltda', cnpj: '12.345.678/0001-90', contact: 'Carlos Silva', phone: '(11) 98765-4321', status: 'Ativo' },
    { id: 2, name: 'Inova Corp', cnpj: '98.765.432/0001-10', contact: 'Ana Pereira', phone: '(21) 91234-5678', status: 'Ativo' },
];

// Test route to confirm API is working
router.get('/test', (req, res) => {
    res.json({ message: 'Backend API is connected successfully!' });
});

// Example route for companies
router.get('/companies', (req, res) => {
    res.json(mockCompanies);
});

// Future routes for clients, employees, etc. will go here

module.exports = router;
