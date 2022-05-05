const {param} = require('express-validator');

function mongoIdValidator(){
  return [
    param('id').isMongoId().withMessage('id is incorrect')
  ]
}
module.exports = {
  mongoIdValidator
}