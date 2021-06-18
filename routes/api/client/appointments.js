const express = require('express');
const appointmentsCtrl = require('../../../controllers/client/appointments');
const router = express.Router();

// POST /api/client/appointments (retrieves the client's appointment info) for calendar/list view
router.get('/client/index', appointmentsCtrl.index);
// POST /api/client/create (allows the client to create an appointment, awaiting status) 
router.post('/client/create', appointmentsCtrl.create);
//findById and update
router.put('/client/respond/:id', appointmentsCtrl.respond);
module.exports = router;