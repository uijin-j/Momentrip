const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const authRouter = require('./auth');
const bookRouter = require('./book');
const momentRouter = require('./moment');

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/book', bookRouter);
router.use('/moment', momentRouter);

module.exports = router;
