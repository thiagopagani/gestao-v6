const express = require('express');
const router = express.Router();

// Mock Data (will be replaced by database calls)
const mockCompanies = [
    { id: 1, name: 'Tech Solutions Ltda', cnpj: '12.345.678/0001-90', contact: 'Carlos Silva', phone: '(11) 98765-4321', status: 'Ativo' },
    { id: 2, name: 'Inova Corp', cnpj: '98.765.432/0001-10', contact: 'Ana Pereira', phone: '(21) 91234-5678', status: 'Ativo' },
];

const mockClients = [
    { id: 1, name: 'Projeto Alpha', companyId: 1, companyName: 'Tech Solutions Ltda', contact: 'joao.vargas@tech.com', status: 'Ativo' },
    { id: 2, name: 'Unidade Rio', companyId: 2, companyName: 'Inova Corp', contact: 'maria.santos@inova.com', status: 'Ativo' },
    { id: 3, name: 'Centro de Distribuição', companyId: 1, companyName: 'Tech Solutions Ltda', contact: 'paulo.costa@tech.com', status: 'Inativo' },
];

const mockEmployees = [
    { id: 1, name: 'Fernando Alves', cpf: '111.222.333-44', phone: '(11) 99999-8888', type: 'Autônomo', status: 'Ativo' },
    { id: 2, name: 'Beatriz Costa', cpf: '222.333.444-55', phone: '(21) 98888-7777', type: 'Autônomo', status: 'Ativo' },
    { id: 3, name: 'Lucas Martins', cpf: '333.444.555-66', phone: '(31) 97777-6666', type: 'Treinamento', status: 'Ativo' },
    { id: 4, name: 'Juliana Rocha', cpf: '444.555.666-77', phone: '(41) 96666-5555', type: 'Autônomo', status: 'Inativo' },
];


// Test route to confirm API is working
router.get('/test', (req, res) => {
    res.json({ message: 'Backend API is connected successfully!' });
});

// Route for companies
router.get('/companies', (req, res) => {
    res.json(mockCompanies);
});

// Route for clients
router.get('/clients', (req, res) => {
    res.json(mockClients);
});

// Route for employees
router.get('/employees', (req, res) => {
    res.json(mockEmployees);
});

module.exports = router;