const express = require('express');
const router = express.Router();
const momentController = require('../../controller/momentController');


router.get('/', momentController.findAllMoment); //moment 모두 불러오기
router.post('/', momentController.registerMoment); // moment 만들기
router.get('/select/:id', momentController.findMomentById); // 특정 moment 불러오기
router.get('/user/all/:user_id',momentController.findMomentByUserId); //특정 유저의 moment 보기
router.get('/book/all/:book_id',momentController.findAllMomentByOneBook); // 특정 book에 속하는 moments 불러오기
router.patch('/:id', momentController.updateMomentById); // 특정 moment 업데이트
router.delete('/:id', momentController.deleteMomentById);// 특정 moment 삭제


module.exports = router;
