
module.exports = function errHandler(err, req, res, next) {
    var code = err.status || 500;
    var title = err.title || 'some internal error!';

    var response = {
        code: code,
        message: title
    };
    res.status(code).json(response);
};