var postInfo = require("../dao/postInfo.js");
var TimeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
const { json } = require("express");

const qs = require("qs")
var path = new Map();

function editDetail(req, res) {
    let result = "";
    req.on("data", function(data) {
        result += data.toString("utf-8")
            // json1 = data.toString();
            // obj = JSON.parse(json1)

    })
    req.on("end", function(data) {
        // console.log("result", result)
        let query = qs.parse(result)
            // console.log("query", query)

        // console.log(query.title, query.content, query.time)

        // console.log(data)
        // let query = qs.parse(result)
        // console.log("query", query)
        // console.log(query.title, query.time, query.content)
        // console.log("obj", obj)
        postInfo.insertdetail(query.title, query.content, query.time, query.type, function(result) {
            // res.set('content-type', 'application/json;charset=UTF-8')
            res.writeHead(200);
            res.write(respUtil.writeResult("success", "添加成功", null));
            res.end()
        })

    })
}

path.set("/editDetail", editDetail);



function insertMessage(req, res) {
    let result = "";
    req.on("data", function(data) {
        result += data.toString("utf-8")
    })
    req.on("end", function() {
        let query = qs.parse(result)
        console.log(query)
        postInfo.insertMessage(query.name, query.phone, query.email, query.messages, query.time, function(result) {
            res.writeHead(200);
            res.write(respUtil.writeResult("success", "留言成功", null));
            res.end()

        })

    })
}

path.set("/insertMessage", insertMessage);


module.exports.path = path