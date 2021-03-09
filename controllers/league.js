'use strict';

const logger = require('../utils/logger');
const leagueStore = require('../models/league-store');

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
    const LeagueId = request.params.id;
    const teamId = request.params.teamid;
    logger.debug(`Deleting Team ${teamId} from League ${leagueId}`);
    leagueStore.removeTeam(leagueId, teamId);
    response.redirect('/league/' + leagueId);
  },
};

module.exports = league;