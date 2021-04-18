"use strict";

// import all required modules
const logger = require("../utils/logger");
const leagueStore = require("../models/league-store.js");
const uuid = require("uuid");
const accounts = require("./accounts.js");

// create dashboard object
const dashboard = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      // app statistics calculations
      const userLeagues = leagueStore.getUserLeagues(loggedInUser.id);
      let numLeagues = userLeagues.length;
      let numTeams = 0;

      for (let item of userLeagues) {
        numTeams += item.teams.length;
      }
      let averageTeams = 0;
      if (!(userLeagues.length === 0)) {
        averageTeams = (numTeams / numLeagues).toFixed(1); // https://www.w3schools.com/jsref/jsref_tofixed.asp
      }
      let leagueMostItemsName = "No Leagues";
      if (!(userLeagues.length === 0)) {
        let leagueMostItems = userLeagues[0];
        for (let league of userLeagues) {
          if (league.teams.length > leagueMostItems.teams.length) {
            leagueMostItems = league;
          }
        }
        leagueMostItemsName = leagueMostItems.name;
      }

      let leagueLeastItemsName = "No Leagues";
      if (!(userLeagues.length === 0)) {
        let leagueLeastItems = userLeagues[0];
        for (let league of userLeagues) {
          if (league.teams.length < leagueLeastItems.teams.length) {
            leagueLeastItems = league;
          }
        }
        leagueLeastItemsName = leagueLeastItems.name;
      }

      const viewData = {
        title: "League Dashboard",
        leagues: leagueStore.getUserLeagues(loggedInUser.id),
        totalLeagues: numLeagues,
        totalTeams: numTeams,
        averageTeams: averageTeams,
        leagueMostItems: leagueMostItemsName,
        leagueLeastItems: leagueLeastItemsName,
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture
      };
      logger.info("about to render" + viewData.leagues);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },

  deleteLeague(request, response) {
    const leagueId = request.params.id;
    logger.debug(`Deleting league ${leagueId}`);
    leagueStore.removeLeague(leagueId);
    response.redirect("/dashboard");
  },

  addLeague(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newLeague = {
      id: uuid(),
      userid: loggedInUser.id,
      name: request.body.name,
      country: request.body.country,
      continent: request.body.continent,
      logo: request.files.logo,
      teams: []
    };
    leagueStore.addLeague(newLeague, function() {
      response.redirect("/dashboard");
    });
  }
};

// export the dashboard module
module.exports = dashboard;
