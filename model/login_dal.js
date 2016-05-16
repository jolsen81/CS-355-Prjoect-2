var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.AuthenticateUser =  function (info, callback) {
    var query = 'CALL auth_user(?, ?)';
    var data = [info.username, info.password];
    connection.query(query, data, function(err, res){
        if(err){
            callback(err, null);
        }else if (res[0].length == 1){
            callback(err, res[0][0]);
        }
        else{
            callback(err, null);
        }
    })

}