var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.Insert = function (firstname, lastname, username, email, password, callback) {
   console.log(firstname, lastname, username, email, password) ;

    var values = [firstname, lastname, username, email, password];
    var dynamic_query = 'INSERT INTO music_user(first_name, last_name, user_name, email, password)' +
        ' VALUES (?, ?, ?, ?, ?)';

    console.log("test");

    console.log(dynamic_query);

    connection.query(dynamic_query, values, function (err, result) {
       if(err){
           console.log(err);
           callback(true);
           return;
       }
        console.log("success");
        callback(false, result);
    });
}

exports.GetAll = function(callback){
    connection.query('SELECT * FROM music_user',
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