var util = require('util');

module.exports = {
    'active' : process.env.ACTIVE_CONFIG || 'production',

    'development': {
        'WEB_PORT' : process.env.WEB_PORT || 3000,
        'MONGO_SERVER' : process.env.MONGO_SERVER || 'localhost',
        'MONGO_PORT' : process.env.MONGO_PORT || 27017,
        'MONGO_DBNAME' : process.env.MONGO_DBNAME || 'expressAppDB',
        'MONGO_CONSTRING' : process.env.MONGO_DEV_CONSTRING || null
    },

    'production': {
        'WEB_PORT' : process.env.WEB_PORT || 80,
        'MONGO_SERVER' : process.env.MONGO_SERVER || 'localhost',
        'MONGO_PORT' : process.env.MONGO_PORT || 27017,
        'MONGO_DBNAME' : process.env.MONGO_DBNAME || 'expressAppDB',
        'MONGO_CONSTRING' : process.env.MONGO_PROD_CONSTRING || null
    },

    'getActiveConfig' : function(){
        var activeConfig =  this[this['active']];
        //console.log("CONFIG: "+ JSON.stringify(activeConfig));
        return activeConfig;
    },

    'getConnectionString' : function(){
        var activeConfig = this.getActiveConfig();
        console.log("CONFIG: "+ JSON.stringify(activeConfig));

        if(activeConfig.MONGO_CONSTRING !== null)
            return activeConfig.MONGO_CONSTRING;
        return util.format("mongodb://%s:%d/%s",
            activeConfig.MONGO_SERVER,
            activeConfig.MONGO_PORT,
            activeConfig.MONGO_DBNAME
        );
    }
}