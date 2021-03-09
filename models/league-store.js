'use strict';

const _ = require('lodash');

const leagueStore = {

  leagueCollection: require('./league-store.json').leagueCollection,

  getAllLeagues() {
    return this.leagueCollection;
  },

  getLeague(id) {
    return _.find(this.leagueCollection, { id: id });
  },
  
  removeTeam(id, teamId) {
    const league = this.getLeague(id);
    _.remove(league.teams, { id: teamId });
  },
  
  removeLeague(id) {
  _.remove(this.leagueCollection, { id: id });
},
  
};

module.exports = leagueStore;