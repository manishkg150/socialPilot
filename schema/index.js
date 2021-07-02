const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schemas = {
    s3ImageUrls: null
};

const initSchemas = (function(){
    let s3imagecollection = 's3imagecollection';
    let s3imageSchema = new Schema({
        description: {type: String, index: true},
        s3url: {type: String},
        createdAt: {type: Date, default: Date.now, index: true, immutable: true}
    });
    s3imageSchema.plugin(mongoosePaginate);
    schemas.s3ImageUrls = mongoose.model(s3imagecollection, s3imageSchema);
})();

module.exports = schemas;