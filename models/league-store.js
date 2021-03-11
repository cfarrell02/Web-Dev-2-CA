'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const leagueStore = {

 store: new JsonStore('./models/playlist-store.json', { pleagueCollection: [] }),
  collection: 'playlistCollection',

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