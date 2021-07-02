module.exports = {
	sendJSON: function (req, res, next) {
		res.json(req.res_data);
	}
}