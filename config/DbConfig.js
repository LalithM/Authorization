let config = require('./config');

module.exports = {

  getLocalDB : ()=>{
    return 'mongodb://'+config.host+'/'+config.dbName;
  },

  getMongoCloud : ()=>{
    return '';
  }
}