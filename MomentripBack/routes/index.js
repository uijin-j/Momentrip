const express = require('express');
const router = express.Router();

const authRouter = require('./auth/index');
const bookRouter = require('./book/index');
const momentRouter = require('./moment/index');
const userRouter = require('./user/index');

router.use('/auth', authRouter);
router.use('/book', bookRouter);
router.use('/moment', momentRouter);
router.use('/user', userRouter);

module.exports = router;
