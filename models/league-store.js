'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const leagueStore = {

 store: new JsonStore('./models/league-store.json', { leagueCollection: [] }),
  collection: 'leagueCollection',

  getAllLeagues() {
    return this.store.findAll(this.collection);
  },

  getLeague(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
   addLeague(league) {
    this.store.add(this.collection, league);
  }, 
  
  removeLeague(id) {
  const league = this.getLeague(id);
    this.store.remove(this.collection, league);
},
  
removeAllLeagues() {
    this.store.removeAll(this.collection);
  },

  addTeam(id, team) {
    const league = this.getLeague(id);
    league.teams.push(team);
  },

  removeTeam(id, teamId) {
    const league = this.getLeague(id);
    const teams = league.teams;
    _.remove(teams, { id: teamId});
  },
};

module.exports = leagueStore;