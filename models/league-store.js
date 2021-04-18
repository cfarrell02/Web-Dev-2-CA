'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');


try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const leagueStore = {

 store: new JsonStore('./models/league-store.json', { leagueCollection: [] }),
  collection: 'leagueCollection',

  getAllLeagues() {
    return this.store.findAll(this.collection);
  },

  getLeague(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  getUserLeagues(userid){
    return this.store.findBy(this.collection, { userid: userid});
  },
  addLeague(league, response) {
    league.logo.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            league.logo = result.url;
            response();
          });
        }
      });
    this.store.add(this.collection, league);
  },
  
  removeLeague(id) {
  const league = this.getLeague(id);
    this.store.remove(this.collection, league);
},
  
removeAllLeagues() {
    this.store.removeAll(this.collection);
 
  },
  
 // addTeam(id, team) {
 // const league = this.getLeague(id);
 //    league.teams.push(team);
 // },
 
  addTeam(id, team,response) {
    
    team.crest.mv('temppicture', err => {
       if (!err) {
          cloudinary.uploader.upload('temppicture', result => {
            console.log(result);
            team.crest = result.url;
            response();
          });
       }
      });
    const league = this.getLeague(id);   
    league.teams.push(team);
  },

  removeTeam(id, teamId) {
    const league = this.getLeague(id);
    const teams = league.teams;
    _.remove(teams, { id: teamId});
  },
    editTeam(id, teamId, updatedTeam) {
    const league = this.getLeague(id);
    const teams = league.teams;
    const index = teams.findIndex(team => team.id === teamId);
    teams[index].name = updatedTeam.name;
    teams[index].position = updatedTeam.position;
    teams[index].manager = updatedTeam.manager;
  }
};

module.exports = leagueStore;