'use strict';

const _ = require('lodash');
const logger = require('../utils/logger');

const playlistStore = {

  playlistCollection: require('./playlist-store.json').playlistCollection,

  getAllPlaylists() {
    return this.playlistCollection;
    
  },

    getPlaylist(id) {
    return _.find(this.playlistCollection, { id: id });
  },
    deleteSong(request, response) {
      
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
    
  },

};

module.exports = playlistStore;

