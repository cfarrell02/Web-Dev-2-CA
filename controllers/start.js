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
  let numUsers = users.length;
  let numLeagues = leagues.length;

  let numTeams = 0;

    for (let item of leagues) {
    numTeams += item.teams.length;
  }
  
 let averageNumTeams = (numTeams/numUsers).toFixed(1); 
   
 function teamsPerUser(user){
    let numUserTeams = 0;
    for(let item of leagueStore.getUserLeagues(user.id)){
      numUserTeams += item.teams.length
    }
    return numUserTeams
  }
 
 let userMostItems = users[0];
 for(let user of users){
   if(teamsPerUser(user)>teamsPerUser(userMostItems)){
     userMostItems = user;
   }
 }
   let userLeastItems = users[0];
 for(let user of users){
   if(teamsPerUser(user)<teamsPerUser(userLeastItems)){
     userLeastItems = user;
   }
 }

    // display confirmation message in log
    logger.info('start rendering');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
    title: 'Welcome to the League App!',
    totalLeagues: numLeagues,
    totalTeams: numTeams,
    totalUsers: numUsers,
    averageTeams: averageNumTeams,
    userMostItems: userMostItems.firstName + " "+userMostItems.lastName,
    userLeastItems: userLeastItems.firstName + " "+userLeastItems.lastName,
    fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture
};

    // render the start view and pass through the data
    response.render('start', viewData);
  }else response.redirect('/')},
};

// export the start module
module.exports = start;