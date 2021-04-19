'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');
const accounts = require('../controllers/accounts.js')


const commentStore = {

store: new JsonStore('./models/comment-store.json', {comments: []}),
  collection: 'comments',

  getAllComments() {
    //return require('./comment-store.json').commentCollection
    return this.store.findAll(this.collection) + (accounts.getCurrentUser()).id;
  },

  getComment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  getUserComments(userid){
    return this.store.findBy(this.collection, { userid: userid});
  },
  addComment(comment) {
    this.store.add(this.collection, comment);
  },
  
  removeComment(id) {
    const comment = this.getComment(id);
    this.store.remove(this.collection, comment);
},
  
removeAllComments() {
    this.store.removeAll(this.collection);
 
  },
  updateComment(id, updatedTeam) {
    const comments = this.getAllComments();
    const index = comments.findIndex(comment => comment.id === id);
    comments[index].text = updatedTeam.text;
  }
  
}

module.exports = commentStore;