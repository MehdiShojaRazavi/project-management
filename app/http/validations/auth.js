const { body } = require("express-validator");
const { UserModel } = require("../../models/user");

function registerValidator(){
  return [
    body("username").custom(async (value, ctx) => {
      if (value){
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
        if (usernameRegex.test(value)){
          const user = await UserModel.findOne({username : value})
          if (user) throw 'username is already in use';
          return true
        }
        throw 'username is incorrect'
      }
      throw 'username should not be blank'
    }),
    body("email",).isEmail().withMessage('email is incorrect')
    .custom(async email => {
      const user = await UserModel.findOne({email})
      if (user) throw 'email is already in use';
      return true;
    }),
    body("mobile").not().isEmpty().withMessage('mobile should not be blank')
    .custom(async mobile => {
      const user = await UserModel.findOne({mobile})
      if (user) throw 'mobile is already in use';
      return true;
    }),
    body("password").isLength({min : 6, max : 16}).withMessage('password must be between 6 and 16 character')
    .custom((value, ctx) => {
      if (!value) throw 'password should not be blank';
      if (value !== ctx?.req?.body?.confirm_password) throw 'The password is not the same as repeating it';
      return true
    })
  ]
}
module.exports = {
  registerValidator
}
