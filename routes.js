'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const league = require('./controllers/league.js');
const accounts = require ('./controllers/accounts.js');

// connect routes to controllers
router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/league/:id', league.index);

router.get('/league/:id/deleteTeam/:teamid', league.deleteTeam);
router.get('/dashboard/deleteleague/:id', dashboard.deleteLeague);
router.post('/league/:id/addteam', league.addTeam);
router.post('/dashboard/addleague', dashboard.addLeague);
router.post('/league/:id/updateteam/:teamid', league.updateTeam);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

// export router module
module.exports = router;