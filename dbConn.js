const mongoose = require('mongoose');
const dbConn = {
    connectToMongo: async (dbUrl) => {
        try {
            console.log("going to connect to db : "+dbUrl);
            let conn = await mongoose.connect(dbUrl, {
                useNewUrlParser: "true",
                useFindAndModify: false,
                keepAlive: 1,
                useUnifiedTopology: true
            });
            console.log("connection established");
            return conn;
        } catch (error) {
            console.log("error in connection : "+error);
            return error;
        }
    }
}

module.exports = dbConn;