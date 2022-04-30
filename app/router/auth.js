const {AuthController} = require('../http/controllers/auth.controller');
const { expressValidationMapper } = require('../http/middlewares/checkError');
const { registerValidator } = require('../http/validations/auth');

const router = require('express').Router();

router.post('/register', registerValidator(), expressValidationMapper, AuthController.register)
module.exports = {
  authRoutes : router
}