const mongoose = require('mongoose');
const logger = require('./logger');

const dbConn = {
    connectToMongo: async (dbUrl) => {
        try {
            let conn = await mongoose.connect(dbUrl, {
                useNewUrlParser: "true",
                useFindAndModify: false,
                keepAlive: 1,
                useUnifiedTopology: true
            });
            logger.log("info", "connection established");
            return conn;
        } catch (error) {
            logger.log("error", "error in connection : "+error);
            return error;
        }
    }
}

module.exports = dbConn;