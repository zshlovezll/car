var dbutil = require("./dbutil");

function insertdetail(title, content, time, type, callback) {
    var insertSql = "insert into article (`title`,`content`,`time`,`type`) values(?,?,?,?);";

    var params = [title, content, time, type];

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


function insertCarInfo(title, carName, drivingPrices, meals, people, color, brand, infoaa, infoab, infoac, infoad, infoae, infoba, infobb, infobc, infobd, infobe, infoca, infocb, infocc, infocd, infoce, image, callback) {
    
    var insertSql = "insert into models (`title`,`carName`,`drivingPrices`,`meals`,`people`,`color`,`brand`,`infoaa`,`infoab`,`infoac`,`infoad`,`infoae`,`infoba`,`infobb`,`infobc`,`infobd`,`infobe`,`infoca`,`infocb`,`infocc`,`infocd`,`infoce`,`image`) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

    var params = [title, carName, drivingPrices, meals, people, color, brand, infoaa, infoab, infoac, infoad, infoae, infoba, infobb, infobc, infobd, infobe, infoca, infocb, infocc, infocd, infoce, image];

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
module.exports.insertCarInfo = insertCarInfo;