var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    connection.query('SELECT * FROM artists',
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

exports.GetById = function(artist_id, callback){
    var query = 'SELECT a.*, artist_name FROM albums a ' +
        'JOIN artists art ON a.artist_id=art.artist_id ' +
        'WHERE a.artist_id=' + artist_id;
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
}

exports.Insert = function(artist_name, callback){
    var query = 'CALL insert_artist(?)';
    var data = [artist_name];
    connection.query(query, data, function(err, result){
        if(err){
            console.log(err);
            callback(true);
            return;
        }
        console.log(result);
        callback(false, result);
    })
}