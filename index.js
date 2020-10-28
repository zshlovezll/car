const express = require("express");
var loader = require("./loader");
var globalConfig = require("./config")
const formidable = require("formidable")
const path = require("path")
const history = require('connect-history-api-fallback');
const app = express();
var url = require("url");

//开始引入模块
const SMSClient = require('@alicloud/sms-sdk')

app.get("/api/note", (req, res) => {
    var params = url.parse(req.url, true).query;
    // console.log(params)
    const phoneNum = "16620553301"
        // console.log("手机号码", obj.phoneNum)
    accessKeyId = 'LTAI4G9FmobqjRCbiLFDSYV7'; //你自己的accessKeyId 在用户信息管理中可以看到
    secretAccessKey = 'QEsTabGnnd8STNJXZWioqXa4m3Y6hQ'; //你自己的secretAccessKey  在用户信息管理中可以看到
    //初始化sms_client
    let smsClient = new SMSClient({ accessKeyId, secretAccessKey });

    // 开始发送短信
    smsClient.sendSMS({
        PhoneNumbers: phoneNum,
        SignName: "速途汽车租赁", //你自己的签名管理中
        TemplateCode: "SMS_204286193", //在模板管理中
        TemplateParam: `{"name":'${params.name}',"phone":'${params.phone}'}`, //短信模板变量对应的实际值，JSON格式
    }).then(result => {
        let { Code } = result;
        if (Code == 'OK') {
            res.send({
                    msg: "ok",
                })
                // console.log(result)
        }
    }).catch(err => {
        console.log(err)
        res.send({
            msg: "fail"
        })
    })
})



// 图片上传
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




app.get('/api/queryCar', loader.get("/queryAllCar"))
app.post('/api/editDetail', loader.get("/editDetail"))

app.post('/api/insertMessage', loader.get("/insertMessage"))

app.post('/api/insertCarInfo', loader.get("/insertCarInfo"))


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

app.get('/api/delCarInfo/:id', loader.get("/delCarInfo"))



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
        // }
    }


})

app.use(history());
app.use(express.static("./page/"));

app.listen(globalConfig.port, function() {
    console.log("服务器启动")
})