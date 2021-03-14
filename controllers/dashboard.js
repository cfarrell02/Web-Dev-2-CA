'use strict';

// import all required modules
const logger = require('../utils/logger');
const leagueStore = require('../models/league-store.js');
const uuid = require('uuid');

// create dashboard object
const dashboard = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    // display confirmation message in log
    logger.info('dashboard rendering');
    
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'League App Dashboard',
      leagues: leagueStore.getAllLeagues(),
    };
    
    // render the dashboard view and pass through the data
    logger.info('about to render', viewData.leagues);
    response.render('dashboard', viewData);
  },
  
  deleteLeague(request, response) {
    const leagueId = request.params.id;
    logger.debug(`Deleting league ${leagueId}`);
    leagueStore.removeLeague(leagueId);
    response.redirect('/dashboard');
  },
  
    addLeague(request, response) {
    const newLeague = {
      id: uuid(),
      name: request.body.name,
      country:request.body.country,
      continent:request.body.continent,
      logo:request.body.logo,
      teams: [],
    };
    leagueStore.addLeague(newLeague);
    response.redirect('/dashboard');
  },
};

// export the dashboard module
module.exports = dashboard;
