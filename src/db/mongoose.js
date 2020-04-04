/* This module will hold our connection to
our mongo server through the Mongoose API.
We will access the connection in our express server. */
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
//const mongoURI = 'mongodb://localhost:27017/'
const mongoURI = ("mongodb://Victor:12345@cluster0-shard-00-00-soawb.mongodb.net:27017,cluster0-shard-00-01-soawb.mongodb.net:27017,cluster0-shard-00-02-soawb.mongodb.net:27017/OrcData?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
                    || 'mongodb://localhost:27017/')
// this is a temporary solution!!

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

module.exports = { mongoose }  // Export the active connection.
