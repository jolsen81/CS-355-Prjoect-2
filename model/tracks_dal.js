var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    connection.query('SELECT * FROM tracks',
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

exports.GetById = function(title, album_id, callback){
    var query = 'SELECT * FROM tracks WHERE title=? AND album_id=?';
    var data = [title, album_id];
    console.log(query);
    connection.query(query, data,
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

exports.Update = function(new_title, old_title, duration, position, new_album_id, old_album_id, callback){
  var query = 'CALL edit_track(?, ?, ?, ?, ?, ?)';
    var query_data = [new_title, old_title, duration, position, new_album_id, old_album_id];
    console.log(query);
    connection.query(query, query_data, function(err, result){
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        console.log(result);
        callback(false, result);
    });
};

exports.Rate = function(title, position, album_id, rating, user_id, callback){
    var query = 'CALL rate_track(?, ?, ?, ?, ?)';
    var data = [title, position, album_id, rating, user_id];
    connection.query(query, data, function(err, result){
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        console.log(result);
        callback(false, result);
    });
};