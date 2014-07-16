var mongoService = require('./mongoService');
var db;
var pages;

var start = function() {
    console.log('Let\'s start ...');
};

var showCollections = function() {

    db.collections(function(err, collections) {
        if (!err) console.log('Collections:');
        var collectionNames = [];
        collections.forEach(function(collection) {
            collectionNames.push(collection.collectionName);
        });
        console.log(collectionNames);
    });
};

var insertPage = function() {

    var page = {
        title: "Nicht Löschen",
        // meineProperty: "Cooler Test",
        content: "",
        author: {
            name: "Max Mustermann",
            email: "max.mustermann@domain.com"
        },
        created_at: new Date("2014-07-15"),
        comments: [
            {
                from: "John Doe",
                email: "john.doe@example.com",
                date: new Date("2014-07-17"),
                text: "For the horde!"
            }
        ]
    };

    pages.insert(page, function(err, result) {
        if (err) throw err;

        console.log(result);
    });
};

var showPages = function() {

    pages.find().toArray(function(err, documents) {
        console.log(documents);
    });
};

var removePageWithTitle = function(title) {
    var condition = {title: title};
    pages.remove(condition, function(err, count) {
        console.log(count);
    });
};

var removeAllPages = function() {

    pages.remove(function(err, count) {
        if(err) throw err;

        // show how many documents removed
        console.log(count);
    });
    showPages();
};

var countPages = function() {
    pages.count(function(err, count) {
        console.log(count);
    });
};

var main = function () {

    mongoService.connect(function(err, database) {
        db = database;
        pages = db.collection('pages');

        start();
        //showCollections();
        // insertPage();
        // showPages();
        // removePageWithTitle("Nicht Löschen");
        // removeAllPages();
        // countPages();

    });
};
main();