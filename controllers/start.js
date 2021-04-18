'use strict';

// import all required modules
const logger = require('../utils/logger');
const leagueStore = require('../models/league-store.js');
const accounts = require ('./accounts.js');
const userstore = require('../models/user-store.js');

// create start object
const start = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
     const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');
    // app statistics calculations
 if(loggedInUser){
  const leagues = leagueStore.getAllLeagues();
  const users = userstore.getAllUsers();

  let numLeagues = leagues.length;

  let numTeams = 0;

    for (let item of leagues) {
    numTeams += item.teams.length;
  }
  
  function teamsPerUser(user){
    let numUserTeams = 0;
    for(let item of user.leagues){
      numUserTeams += item.teams.length
    }
    return numUserTeams
  }
   
 let averageNumTeams = parseInt(numTeams/(users.length))
 
 let userMostItems = users[0]
 for(let user of users){
   if(teamsPerUser(user)>teamsPerUser(userMostItems)){
     userMostItems = user;
   }
 }

    // display confirmation message in log
    logger.info('start rendering');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
    title: 'Welcome to the League App!',
    totalLeagues: numLeagues,
    totalTeams: numTeams,
    averageTeams: averageNumTeams,
    userMostItems: userMostItems,
    fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
};

    // render the start view and pass through the data
    response.render('start', viewData);
  }else response.redirect('/')},
};

// export the start module
module.exports = start;