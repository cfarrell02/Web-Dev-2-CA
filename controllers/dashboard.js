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
      const userLeagues = leagueStore.getUserLeagues(loggedInUser.id)
  let numLeagues = userLeagues.length
  let numTeams = 0;

    for (let item of userLeagues(loggedInUser.id)) {
    numTeams += item.teams.length;
  }

  let averageTeams = (numTeams/numLeagues).toFixed(1); // https://www.w3schools.com/jsref/jsref_tofixed.asp

       let leagueMostItems = [0];
 for(let user of users){
   if(teamsPerUser(user)>teamsPerUser(userMostItems)){
     userMostItems = user;
   }
 }
  
    const viewData = {
      title: 'League Dashboard',
      leagues: leagueStore.getUserLeagues(loggedInUser.id),
      totalLeagues: numLeagues,
      totalTeams:numTeams,
      averageTeams:averageTeams,
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
