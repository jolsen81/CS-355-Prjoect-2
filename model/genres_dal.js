var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    connection.query('SELECT * FROM genres',
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

exports.GetById = function(genre_id, callback){
    var query = 'SELECT *, genre FROM albums a JOIN album_genres ag' +
    ' ON a.album_id=ag.album_id' +
    ' JOIN genres g' +
    ' ON ag.genre_id=g.genre_id' +
    ' WHERE g.genre_id=' + genre_id;
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