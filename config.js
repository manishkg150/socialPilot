module.exports = {
    dev : {
        database : {
            mongo: {
                prefix : "mongodb+srv://",
                host : "cluster0-eactz.mongodb.net/",
                dbName : "socialPilot",
                userName : "manish_21023",
                password : "r0%23123%230t",
                connTimeout : 3000
            }
        },
        s3 : {
            bucketName : "manjuish",
            initPath: "static/images/",
            ACL : "public-read",
            s3AccessKey: "",
            s3SecretKey: ""
        }
    },
    staging : {
        database : {
            mongo: {
                prefix : "mongodb://",
                host : "",
                dbName : "socialPilot",
                connTimeout : 3000
            }
        },
        s3 : {
            bucketName : "manjuish",
            initPath: "static/images/",
            ACL : "public-read",
            s3AccessKey: "",
            s3SecretKey: ""
        }
    },
    production : {
        database : {
            mongo: {
                prefix : "mongodb://",
                host : "",
                dbName : "socialPilot",
                connTimeout : 3000
            }
        },
        s3 : {
            bucketName : "manjuish",
            initPath: "static/images/",
            ACL : "public-read",
            s3AccessKey: "",
            s3SecretKey: ""
        }
    },
    serverPort : 3000,
    node_env : ""
}