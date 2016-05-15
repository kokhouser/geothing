var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/geothing',
  test: 'mongodb://localhost/geothingtest'
};
config.secret = 'thiswillbechangedinproduction';

module.exports = config;