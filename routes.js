'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const league = require('./controllers/league.js');

// connect routes to controllers
router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/league/:id', league.index);

router.get('/league/:id/deleteteam/:teamid', league.deleteTeam);
router.get('/dashboard/deleteleague/:id', dashboard.deleteLeague);
router.post('/league/:id/addteam', league.addTeam);
router.post('/dashboard/addleague', dashboard.addLeague);

// export router module
module.exports = router;