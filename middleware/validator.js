const joi = require("joi");
const schema = joi.array().items(joi.object({
        url: joi.string().trim().required(),
        description: joi.string().trim().required()
    })).required().min(1).max(20);
const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true // remove unknown props
}

const validators = {
    validateBody : async (req,res,next) => {
        try {
            var reqBody = JSON.parse(JSON.stringify(req.body));
            let {error, value} = schema.validate(reqBody,options)
            if(error) {
                return next({status:400,title:error.details[0].message});
            }else{
                req.reqBody = value;
                return next();
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = validators;