const express = require('express');
const router = express.Router();
const eventsRoutes = require('./api/apiEventsRoutes');
const avisosRoutes = require('./api/apiAvisosRoutes');
const noticesRoutes = require('./api/apiNoticesRoutes');

router.use('/events', eventsRoutes);
router.use('/avisos', avisosRoutes);
router.use('/notices', noticesRoutes);


module.exports = router;