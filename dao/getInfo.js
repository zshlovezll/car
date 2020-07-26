var dbutil = require("./dbutil");
var url = require("url");


// function delLY(req, res) {
//     var id = req.params.id;
//     dbutil.query("delete from message where id = " + id, function(err, rows) {
//         if (err) {
//             res.send("删除失败" + err);
//         } else {
//             res.redirect("/users");
//         }
//     });
// }
// module.exports.delLY = delLY;


function queryCar(success) {
    var insertSql = "select * from showCar";
    var params = [];

    var con = dbutil.createConnection();
    con.connect();
    con.query(insertSql, params, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    con.end();
}

module.exports.queryCar = queryCar;

function queryPrice(success) {
    var insertSql = "select * from models";
    var params = [];

    var con = dbutil.createConnection();
    con.connect();
    con.query(insertSql, params, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    con.end();
}

module.exports.queryPrice = queryPrice;

function querytdetail(id, callback) {

    var qerySql = "select * from article where id = ?";
    var params = [id];

    var con = dbutil.createConnection();
    con.connect();

    con.query(qerySql, params, function(error, result) {
        if (error === null) {
            callback(result);
        } else {
            console.log(error);
        }
    });

    con.end()
}

module.exports.querytdetail = querytdetail;


function querytArticle(callback) {

    var qerySql = "select * from article order by id desc";
    var params = [];

    var con = dbutil.createConnection();
    con.connect();

    con.query(qerySql, params, function(error, result) {
        if (error === null) {
            callback(result);
        } else {
            console.log(error);
        }
    });

    con.end()
}

module.exports.querytArticle = querytArticle;

function querytArticleByType(type, callback) {

    var qerySql = "select * from article where type = ? order by id desc";
    var params = [type];

    var con = dbutil.createConnection();
    con.connect();

    con.query(qerySql, params, function(error, result) {
        if (error === null) {
            callback(result);
        } else {
            console.log(error);
        }
    });

    con.end()
}

module.exports.querytArticleByType = querytArticleByType;

function queryArticleByPage(page, pageSize, success) {
    var insertSql = "select * from article order by id desc limit ?, ?;";
    var params = [page, pageSize];

    var con = dbutil.createConnection();
    con.connect();
    con.query(insertSql, params, function(error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    con.end();
}
module.exports.queryArticleByPage = queryArticleByPage;


function querytMessage(callback) {

    var qerySql = "select * from Message order by id desc";
    var params = [];

    var con = dbutil.createConnection();
    con.connect();

    con.query(qerySql, params, function(error, result) {
        if (error === null) {
            callback(result);
        } else {
            console.log(error);
        }
    });

    con.end()
}

module.exports.querytMessage = querytMessage;

function delMessage(id, callback) {

    var qerySql = "delete from Message where id = ?";
    var params = [id];

    var con = dbutil.createConnection();
    con.connect();

    con.query(qerySql, params, function(error, result) {
        if (error === null) {
            callback(result);
        } else {
            console.log(error);
        }
    });

    con.end()
}

module.exports.delMessage = delMessage;


function delWz(id, callback) {

    var qerySql = "delete from article where id = ?";
    var params = [id];

    var con = dbutil.createConnection();
    con.connect();

    con.query(qerySql, params, function(error, result) {
        if (error === null) {
            callback(result);
        } else {
            console.log(error);
        }
    });

    con.end()
}

module.exports.delWz = delWz;