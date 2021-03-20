'use strict';

const developerStore = {

  // import the developer collection object
  developers: require('./developer-store.json').developers,

  // function to get all of the developers
  getAllDevelopers() {
    return this.developers;
  },

};

// export the developerStore object so it can be used elsewhere
module.exports = developerStore;