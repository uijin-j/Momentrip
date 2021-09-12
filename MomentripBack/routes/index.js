const express = require('express');
const router = express.Router();

const userRouter = require('./user/index');
const authRouter = require('./auth/index');
const bookRouter = require('./book/index');
const momentRouter = require('./moment/index');

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/book', bookRouter);
router.use('/moment', momentRouter);

module.exports = router;
