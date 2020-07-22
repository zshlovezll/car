var dbutil = require("./DButil");

function insertdetail(title, content, time, callback) {
    var insertSql = "insert into article (`title`,`content`,`time`) values(?,?,?);";

    var params = [title, content, time];

    var con = dbutil.createConnection();
    con.connect();

    con.query(insertSql, params, function(error, result) {
        if (error === null) {
            callback(result);
        } else {
            console.log(error);
        }
    });

    con.end()
}



module.exports.insertdetail = insertdetail;


function insertMessage(name, phone, email, messages, time, callback) {
    var insertSql = "insert into message (`name`,`phone`,`email`,`messages`,`time`) values(?,?,?,?,?);";

    var params = [name, phone, email, messages, time];

    var con = dbutil.createConnection();
    con.connect();

    con.query(insertSql, params, function(error, result) {
        if (error === null) {
            callback(result);
        } else {
            console.log(error);
        }
    });

    con.end()
}



module.exports.insertMessage = insertMessage;