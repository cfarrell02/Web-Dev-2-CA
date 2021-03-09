'use strict';

const _ = require('lodash');

const teamStore = {

  leagueCollection: require('./league-store.json').leagueCollection,

  getAllLeagues() {
    return this.leagueCollection;
  },

  getPlaylist(id) {
    return _.find(this.leagueCollection, { id: id });
  },
  
  removeTeam(id, songId) {
    const league = this.getLeague(id);
    _.remove(league.teams, { id: teamId });
  },
  
  removeLeague(id) {
  _.remove(this.leagueCollection, { id: id });
},
  
};

module.exports = leagueStore;