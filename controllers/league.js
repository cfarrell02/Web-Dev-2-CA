'use strict';

const logger = require('../utils/logger');
const leagueStore = require('../models/league-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const league = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const leagueId = request.params.id;
    logger.debug('League id = ' + leagueId);
     if (loggedInUser) {
    const viewData = {
      title: 'Leagues',
      league: leagueStore.getLeague(leagueId),
    };
    response.render('league', viewData);
  }else response.redirect('/')},
    deleteTeam(request, response) {
    const leagueId = request.params.id;
    const teamId = request.params.teamid;
    logger.debug(`Deleting Team ${teamId} from League ${leagueId}`);
    leagueStore.removeTeam(leagueId, teamId);
    response.redirect('/league/' + leagueId);
  },
  addTeam(request, response) {
    const leagueId = request.params.id;
    const league = leagueStore.getLeague(leagueId);
    const newTeam = {
      id: uuid(),
      name: request.body.title,
      position: request.body.position,
      manager: request.body.manager,
      europeanleague: request.body.europeanleague,
      crest: request.body.crest,
      
    };
    leagueStore.addTeam(leagueId, newTeam);
    response.redirect('/league/' + leagueId);
  },
  updateTeam(request, response) {
    const leagueId = request.params.id;
    const teamId = request.params.teamid;
    logger.debug("updating team " + teamId);
    const updatedteam = {
      name: request.body.title,
      position: request.body.position,
      manager: request.body.manager,
    };
    leagueStore.editTeam(leagueId, teamId, updatedteam);
    response.redirect('/league/' + leagueId);
  },
};

module.exports = league;