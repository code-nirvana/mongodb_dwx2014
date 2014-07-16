var mongodb = require('mongodb');

function MongoService() {
    this.mongodb_url = 'mongodb://127.0.0.1:27017/ddc2014';
    this.client = mongodb.MongoClient;
};

MongoService.prototype.connect = function(callback) {
    this.client.connect(this.mongodb_url, function(err, db) {
        if (err) throw err;

        console.log('Connected to database "%s" @ %s:%s ...',
            db.databaseName,
            db.serverConfig.host,
            db.serverConfig.port);

        callback(err, db);
    });
};

module.exports = new MongoService();