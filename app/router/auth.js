const {AuthController} = require('../http/controllers/auth.controller');
const { expressValidationMapper } = require('../http/middlewares/checkError');
const { registerValidator, loginValidator } = require('../http/validations/auth');

const router = require('express').Router();

router.post('/register', registerValidator(), expressValidationMapper, AuthController.register)
router.post('/login', loginValidator(), expressValidationMapper, AuthController.login)
module.exports = {
  authRoutes : router
}