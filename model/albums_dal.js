var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    connection.query('SELECT * FROM albums',
        function (err, result) {
            if(err){
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        });
}

exports.GetById = function(album_id, callback){
    var query = 'SELECT tracks.*, albums.title AS albums_title FROM albums JOIN tracks ON ' +
        'albums.album_id=tracks.album_id WHERE tracks.album_id=' + album_id +
        " GROUP BY tracks.album_id, title";
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err){
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        });
};

exports.GetById2 = function(album_id, callback){
  var query = 'SELECT * FROM albums WHERE album_id=' + album_id;
    
    console.log(query);
    connection.query(query, function(err, result){
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        console.log(result);
        callback(false, result);
    })
};

exports.Insert = function(album_id, title, year, callback){
    var query = 'CALL album_insert(?, ? ,?)';
    var data = [album_id, title, year];
    connection.query(query, data, function (err, result) {
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        console.log(result);
        callback(false, result);
    });
}

exports.Update = function(album_id, title, year, genre_id, artist_id, callback){
    var query = 'CALL album_update(?, ?, ?, ?, ?)';
    var data = [album_id, title, year, genre_id, artist_id];
    console.log(query);
    connection.query(query, data, function(result, err){
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        console.log(result);
        callback(false, result);
    });
}