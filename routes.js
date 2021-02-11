'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');

// connect routes to controllers
router.get('/', start.index);
router.get('/dashboard', dashboard.index);

// export router module
module.exports = router;