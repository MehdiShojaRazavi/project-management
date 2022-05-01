const { UserModel } = require("../../models/user");
const { verifyJwtToken } = require("../../modules/functions");

const checkLogin = async (req, res, next) => {
  try{
    const AUTH_ERROR = {status : 402, message : 'Please log in to your account'}
    const authorization = req?.headers?.authorization;
    console.log(authorization)
    if (!authorization) throw AUTH_ERROR
    let token = authorization.split(' ')?.[1];
    if (!token) throw AUTH_ERROR
    const result = verifyJwtToken(token);
    const {username} = result;
    console.log(result)
    const user = await UserModel.findOne({username}, {password : 0})
    if (!user) throw AUTH_ERROR
    req.user = user;
    return next();

  } catch(error) {
    next(error);
  }
}
module.exports = {
  checkLogin
}