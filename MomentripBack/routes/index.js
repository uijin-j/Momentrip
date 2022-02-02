const express = require('express');
const router = express.Router();

const authRouter = require('./auth/index');
const bookRouter = require('./book/index');
const categoryRouter = require('./category/index');
const momentRouter = require('./moment/index');
const userRouter = require('./user/index');

router.use('/auth', authRouter);
router.use('/book', bookRouter);
router.use('/category', categoryRouter);
router.use('/moment', momentRouter);
router.use('/user', userRouter);

module.exports = router;
