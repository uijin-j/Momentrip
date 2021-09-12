const express = require('express');
const router = express.Router();

const authRouter = require('./auth/index');
const bookRouter = require('./book/index');
const momentRouter = require('./moment/index');

router.use('/auth', authRouter);
router.use('/book', bookRouter);
router.use('/moment', momentRouter);

module.exports = router;
