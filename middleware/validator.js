const joi = require("joi");

const uploadUrlSchema = joi.array().items(joi.object({
        url: joi.string().trim().required(),
        description: joi.string().trim().required()
    })).required().min(1).max(20);

const urlQueryParamsSchema = joi.object({
        page: joi.number().min(1).default(1),
        description: joi.string().trim(),
        createdAfter: joi.date(),
        createdBefore: joi.date()
    })
const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true // remove unknown props
}

const validators = {
    uploadUrlBody : async (req,res,next) => {
        try {
            let reqBody = JSON.parse(JSON.stringify(req.body));
            let {error, value} = uploadUrlSchema.validate(reqBody,options);
            if(error) {
                return next({status:400,title:error.details[0].message});
            }else{
                req.reqBody = value;
                return next();
            }
        } catch (error) {
            return next(error);
        }
    },
    urlQueryParams : async (req, res, next) => {
        try {
            let reqParams = JSON.parse(JSON.stringify(req.query));
            let {error, value} = urlQueryParamsSchema.validate(reqParams,options);
            console.log("error here is : "+error);
            if(error) {
                return next({status:400,title:error.details[0].message});
            }else{
                req.reqParams = value;
                return next();
            }
        } catch (error) {
            console.log("error is :"+error);
            return next(error);
        }
    }
}

module.exports = validators;