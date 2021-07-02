const config = require('../config');
const aws = require('aws-sdk');
var s3;

let s3Upload = {
    putObject: async (body, key, type) => {
        try {
            let node_env = config.node_env;
            if(!s3) {
                s3 = await s3Upload.getS3Obj();
                if(s3 instanceof Error) return s3;
            }
            let params = {
                Bucket: config[node_env].s3.bucketName,
                Body: body,
                Key: config[node_env].s3.initPath+key,
                ACL: config[node_env].s3.ACL,
                ContentType: type
            }
            let uploadData = await s3.upload(params).promise();
            return uploadData;
        } catch (err) {
            return err;
        }
    },
    getS3Obj: async () => {
        try {
            let node_env = config.node_env;
            return new aws.S3({accessKeyId: config[node_env].s3.s3AccessKey,secretAccessKey: config[node_env].s3.s3SecretKey});
        } catch (error) {
            return error;
        }
    } 
};

module.exports = s3Upload;