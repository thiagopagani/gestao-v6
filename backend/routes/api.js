
const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// GET all companies
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.findAll({
        order: [['name', 'ASC']]
    });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Error fetching companies' });
  }
});

// POST a new company
router.post('/companies', async (req, res) => {
    try {
        const { name, cnpj, contact, phone, status } = req.body;

        // Basic validation
        if (!name || !cnpj) {
            return res.status(400).json({ message: 'Name and CNPJ are required.' });
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
        res.status(500).json({ message: 'Error creating company' });
    }
});

// Mock routes for other pages to prevent 404s until they are implemented
router.get('/clients', (req, res) => res.json([]));
router.get('/employees', (req, res) => res.json([]));
router.get('/daily-rates', (req, res) => res.json([]));


module.exports = router;
