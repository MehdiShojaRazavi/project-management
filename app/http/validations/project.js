const { body } = require("express-validator");

function createProjectValidator(){
  return [
    body('title').notEmpty().withMessage('project title should not be blank'),
    body('tags').isArray({min: 0, max: 10}).withMessage('project tags should not be blank or less than 10 tags'),
    body('text').notEmpty().isLength({min: 20}).withMessage('project text should not be blank or less than 20 character')
  ]
}
module.exports = {
  createProjectValidator
}