const router = require('express').Router();
const { ProjectController } = require('../http/controllers/project.controller');
const { expressValidationMapper } = require('../http/middlewares/checkError');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { createProjectValidator } = require('../http/validations/project');
const { mongoIdValidator } = require('../http/validations/public');
const { uploadFile } = require('../modules/express-fileupload');
const fileupload = require('express-fileupload')

router.post("/create" , fileupload(), checkLogin, uploadFile, createProjectValidator(), expressValidationMapper, ProjectController.createProject)
router.get("/list", checkLogin, ProjectController.getAllProject)
router.get("/:id", checkLogin, mongoIdValidator(), expressValidationMapper, ProjectController.getProjectById)
router.delete("/remove/:id", checkLogin, mongoIdValidator(), expressValidationMapper, ProjectController.removeProject)
router.put("/edit/:id", checkLogin, mongoIdValidator(), expressValidationMapper,  ProjectController.updateProject)
router.patch("/edit-image/:id", fileupload(), checkLogin, uploadFile, mongoIdValidator(), expressValidationMapper, ProjectController.updateImageProject)

module.exports = {
  projectRoutes : router
}