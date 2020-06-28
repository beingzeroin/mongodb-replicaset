var mongoose = require('mongoose');
var util = require('util');
var config = require('../config/siteconfig');

module.exports.connect = function(){

    var connString = config.getConnectionString();

    mongoose.connect(connString, { auto_reconnect:true, useNewUrlParser: true, useUnifiedTopology: true}, function(err){
        if(!err)
            console.log('CONNECTED TO DB');
        else
            console.log(util.format('DB CONNECTTION FAILED "%s"', JSON.stringify(err)));
    });

    var db = mongoose.connection;

    db.on('connecting', function() {
        console.log('connecting to MongoDB...');
    });
    
    db.on('error', function(error) {
        console.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });
    db.on('connected', function() {
        console.log('MongoDB connected!');
    });
    db.once('open', function() {
        console.log('MongoDB connection opened!');
    });
    db.on('reconnected', function () {
        console.log('MongoDB reconnected!');
    });
    db.on('disconnected', function() {
        console.log('MongoDB disconnected!');
        mongoose.connect(connString, { auto_reconnect:true, useNewUrlParser: true, useUnifiedTopology: true}, function(err){
            if(!err)
                console.log('CONNECTED TO DB');
            else
                console.log(util.format('DB CONNECTTION FAILED "%s"', JSON.stringify(err)));
        });
    });
}