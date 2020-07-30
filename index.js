const express = require("express");
var loader = require("./loader");
var globalConfig = require("./config")
const formidable = require("formidable")
const path = require("path")
const history = require('connect-history-api-fallback');


var multer = require('multer')

var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.resolve(__dirname, "./page/upload"))
        },
        filename: function(req, file, cb) {
            const timeStamp = Date.now();
            const ramdomStr = Math.random().toString(36).slice(-6);
            const ext = path.extname(file.originalname);
            const filenmae = `${timeStamp}-${ramdomStr}${ext}`
            cb(null, filenmae)
        }
    })
    // const extArr = [];
var upload = multer({
    storage,
    limits: {

    },
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname);
        const whiteList = ['.jpg', '.png', '.gif', '.jpeg']
        if (whiteList.includes(ext)) {
            cb(null, true)
        } else {
            cb(new Error('I don\'t have a clue!'))
        }

    }
}).array('image', 12)



const app = express();
// app.use('/', history());
// app.use(history({
//     htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
// }));



app.get('/api/queryCar', loader.get("/queryAllCar"))
app.post('/api/editDetail', loader.get("/editDetail"))

app.post('/api/insertMessage', loader.get("/insertMessage"))

app.post('/api/upLoadImg', upload, (req, res) => {

    // 一切都好
    const urlArr = []
    req.files.forEach((item, index) => {
        urlArr.push(`/upload/${item.filename}`)
    })
    res.send({
        code: 0,
        data: urlArr,
        msg: ""
    })
})


app.get('/api/querydetail', loader.get("/querydetail"))
app.get('/api/querytArticle', loader.get("/querytArticle"))

app.get('/api/querytArticleByType', loader.get("/querytArticleByType"))

app.get('/api/querytMessage', loader.get("/querytMessage"))
app.get('/api/deltMessage/:id', loader.get("/delMessage"))

app.get('/api/deltWz/:id', loader.get("/delWz"))


app.get('/api/queryPrice', loader.get("/queryPrice"))
app.get('/api/queryArticleByPage', loader.get("/queryArticleByPage"))
app.get('/api/querydetail', loader.get("/querydetail"))

app.get('/api/:filename', (req, res) => {
    const absPath = path.resolve(
        __dirname,
        "./download",
        req.params.filename
    );
    res.download(absPath, req.params.filename);
})

app.use((err, req, res, next) => {
    // console.log(TypeError(err))
    if (err) {
        res.status(500).send(err.message);
        // if (err instanceof multer.MulterError) {
        //     console.log(2)
        //         // 发生错误
        //     alert("请传入图片")
        //         // 
        // }
    }


})

app.use(history());
app.use(express.static("./page/"));

app.listen(globalConfig.port, function() {
    console.log("服务器启动")
})