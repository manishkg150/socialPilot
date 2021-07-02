const express = require('express');
const router = express.Router();
const resHandler = require('../handlers/response-handlers');
const error = require('../handlers/error');
const fileController = require('../middleware/fileController');
const validator = require('../middleware/validator');

router.post('/insert', validator.uploadUrlBody, fileController.uploadFile, resHandler.sendJSON, error);
router.get('/list', validator.urlQueryParams, fileController.geturls, resHandler.sendJSON, error);

module.exports = router;
