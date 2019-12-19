const express = require('express')
const multer = require('multer')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

const router = new express.Router()

// Set the region 
aws.config.update({
    region: 'ap-northeast-1',
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


// Create S3 service object
s3 = new aws.S3({});

const upload = multer({
    storage: multerS3({
        s3 : s3,
        bucket: 'wayfarertwbucket',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            var newFileName = Date.now().toString()+'-'+file.originalname;
            //定義要放在哪個folder
            var fullPath = 'pictureURL/'+ newFileName;    
            cb(null, fullPath)
        }
    }),
    limits: {
        fileSize: 1024*1024*5 // we are allowing only 5 MB files
    },
    fileFilter(req, file, cb) {
        //若不是jepg jpg png的話 會丟ERROR
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        //callback 如果成功回傳 undefined 失敗回傳true 然後顯示error
        cb(undefined, true)
    }
})

router.post('/api/upload/single', upload.array('image',1), (req,res)=>{
    const picData = {
        pictureURL : req.files[0].location,
        key : req.files[0].key
    } 
    res.send(picData)
    
    
}, (error, req, res, next)=>{
    // 若有error會在這邊處理
    res.status(400).send({error : error.message})
})

router.post('/api/upload/multi', upload.array('image',3), (req,res)=>{
    const otherPic = [];
    
    for (let index = 0; index < req.files.length; index++) {
        otherPic.push({ 
                        pictureURL: req.files[index].location,
                        key : req.files[index].key
                        
                    })
    }
    res.send(otherPic)
}, (error, req, res, next)=>{
    // 若有error會在這邊處理
    res.status(400).send({error : error.message})
})

router.post('/api/delete/single', async(req,res)=>{
    
    var params = {
        Bucket: "wayfarertwbucket", 
        Key: req.body.key
       };
    console.log(params);
    
       await s3.deleteObject(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);           // successful response
         /*
         data = {
         }
         */
       }).promise();
    res.send(req.body.key)
}, (error, req, res, next)=>{
    // 若有error會在這邊處理
    res.status(400).send({error : error.message})
})


module.exports = router