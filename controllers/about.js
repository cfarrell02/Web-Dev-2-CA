'use strict';

// import all required modules
const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const commentStore = require("../models/comment-store.js");
const userstore = require('../models/user-store');

const developerStore = require('../models/developer-store.js');
const uuid = require('uuid');

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
    const commentId = request.params.id;
    logger.debug(`Deleting comment ${commentId}`);
    commentStore.removeComment(commentId);
    response.redirect("/dashboard");
  },

  addComment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      id: uuid(),
      username: loggedInUser.firstName +" "+loggedInUser.lastName,
      avatar:loggedInUser.picture,
      text:request.body.text
    };
    commentStore.addComment(newComment, function() {
      response.redirect("/dashboard");
    });
}};

// export the dashboard module
module.exports = about;