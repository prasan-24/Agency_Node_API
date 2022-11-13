const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/authJwt');
const { createAgencyClient, updateClientDetail, getClientList } = require('../controller/agencyclient.controller');

// Create An Agency And Client Detail

router.post('/create/agency-client', verifyToken, createAgencyClient);

// Update Client Detail

router.post('/update/client-detail', verifyToken, updateClientDetail);

// Return ClientName, AgencyName And TotalBill

router.get('/client-list', verifyToken, getClientList);

module.exports = router;