const schemas = require('../schema/index');
const limit = 10;

module.exports = {
    saveS3Urls: async(obj) => {
        try {
            return schemas.s3ImageUrls.insertMany(obj,{ordered: false, limit: 20});
        } catch (error) {
            return error;
        }
    },
    getS3Urls: async(filter, page) => {
		try {
			let options = {
                select: {description: 1, s3url : 1, createdAt: 0, _id: 0},
				page: page,
				limit: limit,
				sort: { createdAt: -1 }
			}
			let res = await schemas.s3ImageUrls.paginate(filter,options);
			return res;
        }
        catch(error) {
			return error;
		}	
	},
}