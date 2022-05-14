const { body } = require("express-validator");
const { TeamModel } = require("../../models/team");

function createTeamValidator(){
  return [
    body('fname').isLength({min : 5}).withMessage('team name could not be less than 5 character'),
    body('description').notEmpty().withMessage('team description could not be blank'),
    body('username').custom(async (username) => {
      const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim
      if(usernameRegex.test(username)){
        const team = await TeamModel.findOne({username});
        if (team) throw 'username already useed with another team';
        return true;
      }
        throw 'username is incorrect'
    })
  ]
}
module.exports = {
  createTeamValidator
}