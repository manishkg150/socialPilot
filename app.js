const fs = require('fs').promises;
const express = require('express');
const indexRouter = require('./routes/index');
const config = require('./config');
const dbConn = require('./dbConn');
const filePath = '/var/config/socialPilot.json';
const logger = require("./logger");
const NODE_ENV = process.env.NODE_ENV || 'dev';
const mongo = config[NODE_ENV].database.mongo;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    const conn = await dbConn.connectToMongo(dbUrl);
    if(conn instanceof Error){
      logger.log("error", "error in db connection : "+conn);
      throw conn;
    }
    app.listen(config["serverPort"], function () {
      logger.log("info", "server listening at "+config["serverPort"]);
      console.log("Server listening at : "+config["serverPort"]);
    }); 
}
startApp();


module.exports = app;
