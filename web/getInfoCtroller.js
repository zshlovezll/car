var getInfo = require("../dao/getInfo.js");
var TimeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");

var url = require("url");
const { type } = require("os");
var path = new Map();

function queryAllCar(req, res) {
    getInfo.queryCar(function(result) {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}

path.set("/queryAllCar", queryAllCar)


function queryPrice(req, res) {
    getInfo.queryPrice(function(result) {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}

path.set("/queryPrice", queryPrice)

function querydetail(req, res) {
    var params = url.parse(req.url, true).query;

    getInfo.querytdetail(+params.id, function(result) {
        //  res.set('content-type', 'application/json;charset=UTF-8')

        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    })

}

path.set("/querydetail", querydetail);

function querytArticle(req, res) {

    getInfo.querytArticle(function(result) {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}
path.set("/querytArticle", querytArticle);

function queryArticleByPage(req, res) {
    var params = url.parse(req.url, true).query;
    getInfo.queryArticleByPage(parseInt(params.page), parseInt(params.pageSize), function(result) {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    });
}
path.set("/queryArticleByPage", queryArticleByPage);


function querytMessage(req, res) {

    getInfo.querytMessage(function(result) {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}
path.set("/querytMessage", querytMessage);

function delMessage(req, res) {
    let arr = req.url.split("/");
    let id = arr[arr.length - 1]
        // console.log(id)
        // var params = url.parse(req.url, true).query;
        // console.log(params.id, typeof params.id)

    getInfo.delMessage(parseInt(id), function(result) {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "删除成功", null));
        res.end();
    })
}
path.set("/delMessage", delMessage);


function delWz(req, res) {
    let arr = req.url.split("/");
    let id = arr[arr.length - 1]
        // console.log(id)
        // var params = url.parse(req.url, true).query;
        // console.log(params.id, typeof params.id)

    getInfo.delWz(parseInt(id), function(result) {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "删除成功", null));
        res.end();
    })
}
path.set("/delWz", delWz);


module.exports.path = path;