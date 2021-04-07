'use strict';

// import all required modules
const logger = require('../utils/logger');
const leagueStore = require('../models/league-store.js');
const accounts = require ('./accounts.js');

// create start object
const start = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    // app statistics calculations

const leagues = leagueStore.getAllLeagues();

let numLeagues = leagues.length;

let numTeams = 0;

for (let item of leagues) {
    numTeams += item.teams.length;
}

    // display confirmation message in log
    logger.info('start rendering');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
    title: 'Welcome to the League App!',
    totalPlaylists: numLeagues,
    totalSongs: numTeams,
};

    // render the start view and pass through the data
    response.render('start', viewData);
  },
};

// export the start module
module.exports = start;