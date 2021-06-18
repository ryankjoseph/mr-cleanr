const express = require('express');
const usersCtrl = require('../../controllers/users');
const appointmentsCtrl = require('../../controllers/agent/appointments');
const router = express.Router();

// GET /api/map/agents
router.get('/agents', usersCtrl.getAgents);

router.get('/appointments', appointmentsCtrl.getAgentAppointments);

module.exports = router;