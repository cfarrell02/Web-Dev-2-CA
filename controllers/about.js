'use strict';

// import all required modules
const logger = require('../utils/logger');
const accounts = require ('./accounts.js');

const developerStore = require('../models/developer-store.js');

// create about object
const about = {

  // index method - responsible for creating and rendering the view
    index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('about rendering');
    if (loggedInUser) {
      const viewData = {
        title: 'About the League App',
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },
    deleteComment(request, response) {
    const leagueId = request.params.id;
    logger.debug(`Deleting league ${leagueId}`);
    leagueStore.removeComment(leagueId);
    response.redirect("/dashboard");
  },

  addComment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      id: uuid(),
      userid: loggedInUser.id,
      name: request.body.name,
      country: request.body.country,
      continent: request.body.continent,
      logo: request.files.logo,
      teams: []
    };
    leagueStore.addComment(newComment, function() {
      response.redirect("/dashboard");
    });
}};

// export the dashboard module
module.exports = about;