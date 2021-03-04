'use strict';
const _ = require('lodash');
const playlistStore = {

  // import the playlist collection object
  playlistCollection: require('./playlist-store.json').playlistCollection,

  // function to get all of the playlists
  getAllPlaylists() {
    return this.playlistCollection;
  },
  removeSong(id, songId) {
    const playlist = this.getPlaylist(id);
    // remove the song with id songId from the playlist
  }

};

// export the playlistStore object so it can be used elsewhere
module.exports = playlistStore;