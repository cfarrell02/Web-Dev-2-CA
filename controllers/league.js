'use strict';

const logger = require('../utils/logger');
const leagueStore = require('../models/league-store');
const uuid = require('uuid');

const league = {
  index(request, response) {
    const leagueId = request.params.id;
    logger.debug('League id = ' + leagueId);
    const viewData = {
      title: 'Leagues',
      league: leagueStore.getLeague(leagueId),
    };
    response.render('league', viewData);
  },
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
    const playlistId = request.params.id;
    const teamId = request.params.teamid;
    logger.debug("updating team " + teamId);
    const updatedteam = {
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    playlistStore.editteam(playlistId, teamId, updatedteam);
    response.redirect('/playlist/' + playlistId);
  },
};

module.exports = league;