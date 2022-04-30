const { validationResult } = require("express-validator")

function expressValidationMapper(req, res, next){
  let message = {};
  const result = validationResult(req)
  if (result?.errors?.length > 0){
    result?.errors.forEach((err) => {
      message[err.param] = err.msg;
    });
    return res.status(400).json({
      status : 400,
      success : false,
      message
    });
  }
  next();
}

module.exports = {
  expressValidationMapper
};