'use strict';

const logger = require('../utils/logger');
const leagueStore = require('../models/league-store');

const playlist = {
  index(request, response) {
    const leagueId = request.params.id;
    logger.debug('League id = ' + leagueId);
    const viewData = {
      title: 'Leagues',
      league: leagueStore.getLeague(leagueId),
    };
    response.render('playlist', viewData);
  },
    deleteTeam(request, response) {
    const LeagueId = request.params.id;
    const teamId = request.params.teamid;
    logger.debug(`Deleting Song ${teamId} from Playlist ${leagueId}`);
    leagueStore.removeTeam(playlistId, teamId);
    response.redirect('/playlist/' + playlistId);
  },
};

module.exports = playlist;