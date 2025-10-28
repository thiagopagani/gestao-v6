const express = require('express');
const router = express.Router();
const { Company } = require('../models/Company');
const { Status, EmployeeType, DailyRateStatus } = require('../../types/types');

// --- DATABASE CONNECTED ROUTE ---
// GET all companies
router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.findAll();
        res.json(companies);
    } catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ message: 'Error fetching data from the database.' });
    }
});

// --- MOCK DATA ROUTES (for future development) ---

const mockClients = [
    { id: 1, name: 'Supermercado Central', companyId: 1, companyName: 'Tech Solutions Ltda', contact: 'Gerente João', status: Status.Active },
    { id: 2, name: 'Loja de Varejo Express', companyId: 2, companyName: 'Inova Corp', contact: 'Dona Maria', status: Status.Active },
    { id: 3, name: 'Escritório Contábil ABC', companyId: 1, companyName: 'Tech Solutions Ltda', contact: 'Sr. Roberto', status: Status.Inactive },
];

const mockEmployees = [
    { id: 1, name: 'Fernando Alves', cpf: '111.222.333-44', phone: '(11) 98877-6655', type: EmployeeType.Autonomous, status: Status.Active },
    { id: 2, name: 'Beatriz Costa', cpf: '444.555.666-77', phone: '(21) 97766-5544', type: EmployeeType.Training, status: Status.Active },
];

const mockDailyRates = [
    { id: 1, employeeId: 1, employeeName: 'Fernando Alves', clientId: 1, clientName: 'Supermercado Central', companyName: 'Tech Solutions Ltda', date: '2025-10-27', value: 150.00, status: DailyRateStatus.Paid },
    { id: 2, employeeId: 2, employeeName: 'Beatriz Costa', clientId: 2, clientName: 'Loja de Varejo Express', companyName: 'Inova Corp', date: '2025-10-27', value: 120.00, status: DailyRateStatus.Pending },
];

router.get('/clients', (req, res) => res.json(mockClients));
router.get('/employees', (req, res) => res.json(mockEmployees));
router.get('/daily-rates', (req, res) => res.json(mockDailyRates));


module.exports = router;
