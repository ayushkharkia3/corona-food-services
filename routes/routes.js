const express = require('express');

const controller = require('../controller/controller');

const router = express.Router();

router.get('/', controller.getIndex);
router.post('/', controller.postIndex);
router.post('/register', controller.postRegister);
router.get('/:pin/:date/:time/view', controller.getView)
module.exports = router;