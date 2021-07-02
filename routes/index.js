const express = require('express');
const router = express.Router();
const resHandler = require('../handlers/response-handlers');
const error = require('../handlers/error');
const fileController = require('../middleware/fileController');
const validator = require('../middleware/validator');

router.post('/uploadFile', validator.validateBody, fileController.uploadFile, resHandler.sendJSON, error);
router.get('/getUrls', fileController.geturls, resHandler.sendJSON, error);

module.exports = router;
