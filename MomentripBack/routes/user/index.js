const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');

router.get('/', userController.findAll);
router.get('/:user_id', userController.findUserById);
router.patch('/user_id', userController.updateUser);
router.delete('/user_id', userController.deleteUser);

/*router.post('/:id/follow', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});*/

module.exports = router;

