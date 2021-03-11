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
  
removeAllLeagues() {
    this.store.removeAll(this.collection);
  },

  addTeam(id, song) {
    const playlist = this.getPlaylist(id);
    playlist.songs.push(song);
  },

  removeTeam(id, songId) {
    const playlist = this.getPlaylist(id);
    const songs = playlist.songs;
    _.remove(songs, { id: songId});
  },
};

module.exports = leagueStore;