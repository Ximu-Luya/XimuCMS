const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')

let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            let changedName = (new Date().getTime() + '.png');
            cb(null, changedName);
        }
    })
});


// 单个文件上传
router.post('/uploadImg', upload.single('imgFile'), (req, res) => {
    let imgUrl = 'http://' + req.headers.host + '/uploads/' + req["file"].filename
    res.json({url: imgUrl})
});

router.get('/uploads/*', function (req, res) {
    res.sendFile(path.resolve("./" + req.url ))
    console.log("请求图片 " + req.url + " 已被接受");
})

module.exports = router;