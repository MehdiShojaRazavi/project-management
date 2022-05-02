const { UserController } = require('../http/controllers/user.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidationMapper } = require('../http/middlewares/checkError');
const { imageValidator } = require('../http/validations/user');
const { upload_multer } = require('../modules/multer');

const router = require('express').Router();

router.get('/profile', checkLogin, UserController.getProfile)
router.post('/profile', checkLogin, UserController.editProfile)
router.post('/profile-image', 
  upload_multer.single("image"), imageValidator(), expressValidationMapper,
  checkLogin, UserController.uploadProfileImage
)

module.exports = {
  userRoutes : router
}