(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var firestore = App.firestore;
    var CheckList = App.CheckList;
    var checklist = new CheckList('[data-coffee-order="checklist"]');

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('NO URL');
        }
    }

    RemoteDataStore.prototype.add = function (key, val) {
        var collection = firestore.collection('coffeeorders');
        collection.add(val);
    };

    RemoteDataStore.prototype.get = function (key, id) { 
        var collection = firestore.collection('coffeeorders');
        var query = collection.where("emailAddress", "==", key);
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.data());
            });
        }).catch(function(error) {
        });
    };
    RemoteDataStore.prototype.getDocumentsInQuery = function (query) {
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                checklist.addRow(doc.data());
            });
        });
    };
    RemoteDataStore.prototype.getAll = function (id) {
        var collection = firestore.collection('coffeeorders');
        this.getDocumentsInQuery(collection);
    };




    RemoteDataStore.prototype.remove = function (key) {
        var collection = firestore.collection('coffeeorders');
        var query = collection.where("emailAddress", "==", key);
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
        }).catch(function(error) {
        });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);