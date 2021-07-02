const createError = require('http-errors');
const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const config = require('./config');
const dbConn = require('./dbConn');
const filePath = '/var/config/socialPilot.json';
var { NODE_ENV } = process.env;
NODE_ENV = NODE_ENV || 'dev';
config.node_env = NODE_ENV;
const mongo = config[NODE_ENV].database.mongo;
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/socialPilot', indexRouter);
const startApp = async () => {
    let configData = await fs.readFile(filePath);
    if(configData instanceof Error){
      process.exit(0);
    }
    configData = JSON.parse(configData);
    config[NODE_ENV].s3.s3AccessKey = configData.accessKeyId;
    config[NODE_ENV].s3.s3SecretKey = configData.secretAccessKey;
    const dbUrl= mongo.prefix+configData.MONGO_USERNAME+":"+configData.MONGO_PASSWORD+"@"+mongo.host+mongo.dbName+"?retryWrites=true&w=majority";
    let conn = await dbConn.connectToMongo(dbUrl);
    if(conn instanceof Error){
      throw conn;
    }
    app.listen(config["serverPort"], function () {
      console.log(`Server listening at ${config["serverPort"]}`);
    }); 
}
startApp();
module.exports = app;
