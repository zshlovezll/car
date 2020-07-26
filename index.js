const express = require("express");
var loader = require("./loader");
var globalConfig = require("./config")
const formidable = require("formidable")
const path = require("path")
const history = require('connect-history-api-fallback');
// const os = require("os")
// const multer = require("multer")
// const upload = multer({
//     dest: 'uploads/'
// })
// const bodyParser = require("body-parser")
// const fs = require("fs")


const app = express();
// app.use('/', history());
// app.use(history({
//     htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
// }));



// app.use(bodyParser.urlencoded({
//     extended: false
// }))
// app.use(bodyParser.json())



app.get('/api/queryCar', loader.get("/queryAllCar"))
app.post('/api/editDetail', loader.get("/editDetail"))

app.post('/api/insertMessage', loader.get("/insertMessage"))

app.get('/api/querydetail', loader.get("/querydetail"))
app.get('/api/querytArticle', loader.get("/querytArticle"))

app.get('/api/querytArticleByType', loader.get("/querytArticleByType"))

app.get('/api/querytMessage', loader.get("/querytMessage"))
app.get('/api/deltMessage/:id', loader.get("/delMessage"))

app.get('/api/deltWz/:id', loader.get("/delWz"))


app.get('/api/queryPrice', loader.get("/queryPrice"))
app.get('/api/queryArticleByPage', loader.get("/queryArticleByPage"))
app.get('/api/querydetail', loader.get("/querydetail"))





// app.get('/management/:rout', (req, res) => {
//     return res.send("./page/index.html");
// })

app.get('/api/:filename', (req, res) => {
    const absPath = path.resolve(
        __dirname,
        "./download",
        req.params.filename
    );
    res.download(absPath, req.params.filename);
})


app.use(history({
    rewrites: [
        // { from: /^\/management\/.*$/, to: function(context) { return context.parsedUrl.pathname; } },
        // { from: /\/management/, to: '/management/messages' }

    ],



}));
app.use(express.static("./page/"));


// 删除
// app.get("/api/del/:id", );

// var connect = require('connect');

// app = connect()
//     .use(history())
//     .listen(globalConfig.port, function() {
//         console.log("服务器启动")
//     });




app.listen(globalConfig.port, function() {
    console.log("服务器启动")
})