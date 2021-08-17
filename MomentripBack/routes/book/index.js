const express = require('express');
const router = express.Router;
const bookController = require('../../controller/bookController');


router.post('/', bookController.registerBook); // book 만들기
router.get('/', bookController.findAllBook) //book 모두 불러오기
router.get('/select/:id', bookController.findBookById) // 특정 book 불러오기
router.get('/user/all/:user_id', bookController.searchBookByUserId()) //특정 유저의 book 보기
router.update('/:id', ) // 특정 book 업데이트
router.delete('/:id') // 특정 book 삭제


module.exports = router;

