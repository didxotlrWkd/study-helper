const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_access_key,
})
require('dotenv').config()

const uploadFile = (filename, bucketname, file) => {
    return new Promise((resolve, reject) => {
        // 파일 확장자에 따라 Content-Type 설정
        const extension = filename.split('.').pop().toLowerCase();
        let contentType;

        if (extension === 'mp3') {
            contentType = 'audio/mpeg';
        } else if (extension === 'pdf') {
            contentType = 'application/pdf';
        } else {
            return reject(new Error('Unsupported file type.'));
        }

        const params = {
            Key: filename,
            Bucket: bucketname,
            Body: file,
            ContentType: contentType,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
        });
    });
};

module.exports = uploadFile
