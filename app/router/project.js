const router = require('express').Router();
const { ProjectController } = require('../http/controllers/project.controller');
const { expressValidationMapper } = require('../http/middlewares/checkError');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { createProjectValidator } = require('../http/validations/project')
router.post("/create", checkLogin, createProjectValidator(), expressValidationMapper, ProjectController.createProject)
router.post("/all", checkLogin, expressValidationMapper, ProjectController.getAllProject)
module.exports = {
  projectRoutes : router
}