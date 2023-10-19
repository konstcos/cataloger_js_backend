const express = require('express');
const FileBrowserController = require('@src/domains/files/http/controllers/fileBrowserController');

const router = express.Router();
const fileBrowserController = new FileBrowserController();

router.post('/browser/list', fileBrowserController.dirList);
router.get('/image', fileBrowserController.image);

module.exports = router;
