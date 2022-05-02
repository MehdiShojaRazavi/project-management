const { UserModel } = require("../../models/user");

class UserController{
  getProfile(req, res, next){
    try{
      const user = req.user;
      return res.status(200).json({
        status : 200,
        success : true,
        user
      })
    } catch(error){
      next(error)
    }
  }
  async editProfile(req, res, next){
    try{
      let data = req.body;
      const userId = req.user._id;
      let fields = ['fname', 'lname', 'skills']
      let badValues = ['', ' ', null, undefined, 0, -1, NaN]
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key]
        for(let i=0; i<= badValues.length-1; i++){
          if (badValues[i] == value) delete data[key]
        }
      })
      const result = await UserModel.updateOne({_id : userId}, {$set : data})
      if (result.modifiedCount > 0){
        return res.status(200).json({
          status : 200,
          success : true,
          message : 'update completed successfully'
        })
      }
      throw {status : 400, message : 'update failed'}
    } catch (error){
      next(error)
    }
  }
  async uploadProfileImage(req, res, next){
    try{
      const user_ID = req.user._id;
      const filePath = req.file?.path.replace('\\\\', '/').substring(7);
      const result = await UserModel.updateOne({_id : user_ID}, {$set : {profile_image : filePath}})
      if (result.modifiedCount == 0) throw {status : 400, success : false, message : 'update failed'}
      return res.status(200).json({
        status : 200,
        success : true,
        message : 'update completed successfully'
    })
    } catch(error){
      next(error)
    }
  }
  addskills(){

  }
  editSkills(){
    
  }
  acceptInviteInTeam(){

  }
  rejectInviteInTeam(){

  }
}
module.exports = {
  UserController : new UserController()
}