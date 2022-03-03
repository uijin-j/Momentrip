const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// const myBucket = require('./myBucket').bucket;
aws.config.loadFromPath(__dirname + '/../config/s3.js');


const s3 = new aws.S3();


// const upload = multer({ dest : 'uploads/' }); // 로컬 저장소에 저장하기
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'momentrip1',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE, // 누르면 다운로드X, 창으로만 보이게!
        key: function (req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정  (jpg 파일인지 아닌지 알기위해)
            // cb(null,  Date.now() + '.jpg'); //와 같음
        }
    })
}, 'NONE');

module.exports = upload;