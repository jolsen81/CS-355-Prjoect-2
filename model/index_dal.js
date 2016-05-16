var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.UserAvgRating = function(user_id, callback){
    var query = 'SELECT * FROM user_average_track_rating WHERE user_id=?';
    var data = [user_id];
    console.log(query);
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