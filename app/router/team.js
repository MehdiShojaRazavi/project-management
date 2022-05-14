const router = require('express').Router();
const { TeamController } = require('../http/controllers/team.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidationMapper } = require('../http/middlewares/checkError');
const { createTeamValidator } = require('../http/validations/team');

router.post('/create', checkLogin, createTeamValidator(), expressValidationMapper, TeamController.createTeam)
router.get('/list', checkLogin, TeamController.getListOfTeam)

module.exports = {
  teamRoutes : router
}