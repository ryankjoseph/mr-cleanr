// THIS FILE SLATED FOR DELETION, CONSIDER MERGE WITH AGENT SERVICES 



const express = require('express');
const clientServicesCtrl = require('../../../controllers/client/services');
const router = express.Router();

// GET /api/client/services retrieves agent's services data, on page with option to create
router.get('/client/services', clientServicesCtrl.showAllServices);

module.exports = router;