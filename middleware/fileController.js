const parallel = require('async-parallel');
const apiRequest = require('../helpers/apiRequest');
const isImageUrl = require('is-image-url');
const s3Upload = require('../services/s3Service');
const dbService = require('../services/database');
const fileType = require('file-type');
const moment = require('moment');
const logger = require('../logger');
const max_size = 4 * 1024 * 1024;

var fileController = {
    uploadFile: async (req, res, next) => {
        try {
            let urlList = req.reqBody;
            let result = [];
            let successResult =[];
            await parallel.each(urlList, async urlObj => {
                if(isImageUrl(urlObj.url)){
                    let imageRes = await apiRequest.fetchRequest(urlObj);
                    if(imageRes instanceof Error) {
                        logger.log("error", "error in downloading image : "+imageRes);
                        result.push({description: urlObj.description, status: 'fail', errorMsg: 'Error in downloading : '+urlObj.url});
                    }
                    else if(Buffer.from(imageRes).length > max_size) {
                        result.push({description: urlObj.description, status: 'fail', errorMsg: 'File size is more than 4 MB :'+urlObj.url});
                    }
                    else {
                        let id = new Date().getTime();
                        let fileDetails = await fileType.fromBuffer(imageRes);
                        let key = id+'/'+urlObj.description+"."+fileDetails.ext;
                        let type = fileDetails.mime;
                        let s3Res = await s3Upload.putObject(imageRes, key, type);
                        if(s3Res instanceof Error){
                            logger.log("error", "error in uploading image to s3 : "+s3Res);
                            result.push({description: urlObj.description, status: 'fail', errorMsg: 'Error in uploading on s3 : '+urlObj.url});
                        }else{
                            let saveObj = {description: urlObj.description, s3url: s3Res.Location, status: 'success'};
                            successResult.push(saveObj);
                        }
                    }
                }
                else{
                    result.push({description: urlObj.description, status: 'fail', errorMsg: "Not a Image url : "+urlObj.url});
                }
            });
            let res = await dbService.saveS3Urls(successResult);
            if(res instanceof Error){
                logger.log("error", "error in saving s3urls to db "+res);
                return next(res);
            }
            req.res_data = result.concat(successResult);
            return next();
        } catch (error) {
            logger.log("error", "catch error in upload file "+error);
            return next(error);
        }
    },
    geturls: async (req, res, next) => {
        try {
            let queryParams = req.reqParams;
            let page = queryParams.page;
            let filter = {};
            if(queryParams.description) {
                filter.description = req.query.description;
            }
            if(queryParams.createdAfter || queryParams.createdBefore) {
                filter.createdAt = {};
                queryParams.createdAfter ? (filter.createdAt["$gte"] = moment(queryParams.createdAfter)) : '';
                queryParams.createdBefore ? (filter.createdAt["$lt"] = moment(queryParams.createdBefore)) : '';
            }
            let response = await dbService.getS3Urls(filter, page);
            if(response instanceof Error || !response) {
                logger.log("error", "error in get s3urls from db "+response);
                return next({status: 500,title:"some error in fetching urls"});
            }
            if(!response.docs || response.docs.length==0) {
                return next({status: 204,title:"No urls found!"});
            }
            req.res_data = {
                urls : response.docs,
                next_id: response.nextPage,
                previous_id: response.prevPage,
                total_count: response.totalDocs,
                totalPages: response.totalPages
            };
            return next();
        } catch (error) {
            logger.log("error", "catch error in getUrls : "+error);
            return next({status: 500, title: 'some error in fetching urls'})
        }
    }
}

module.exports = fileController;