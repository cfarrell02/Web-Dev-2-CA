'use strict';

// import all required modules
const logger = require('../utils/logger');
const leagueStore = require('../models/league-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

// create dashboard object
const dashboard = {
  
  
  // index method - responsible for creating and rendering the view
    index(request, response) {
      
logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      
             // app statistics calculations
  let numLeagues = leagueStore.getUserLeagues(loggedInUser.id).length
  let numTeams = 0;

    for (let item of leagueStore.getUserLeagues(loggedInUser.id)) {
    numTeams += item.teams.length;
  }
  
  
    const viewData = {
      title: 'League Dashboard',
      leagues: leagueStore.getUserLeagues(loggedInUser.id),
      totalLeagues: numLeagues,
      totalTeams:numTeams,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    logger.info('about to render' + viewData.leagues);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  deleteLeague(request, response) {
    const leagueId = request.params.id;
    logger.debug(`Deleting league ${leagueId}`);
    leagueStore.removeLeague(leagueId);
    response.redirect('/dashboard');
  },
  
    addLeague(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newLeague = {
      id: uuid(),
      userid: loggedInUser.id,
      name: request.body.name,
      country:request.body.country,
      continent:request.body.continent,
      logo:request.files.logo,
      teams: [],
    };
    leagueStore.addLeague(newLeague , function(){
    response.redirect('/dashboard');
    })
  },
};

// export the dashboard module
module.exports = dashboard;
