const { TeamModel } = require("../../models/team");

class TeamController{
  async createTeam(req, res, next){
    try{
      const {fname, username, description} = req.body;
      const owner = req.user._id;
      const team = await TeamModel.create({
        fname,
        description,
        username,
        owner
      })
      if (!team) throw {status : 500, success : false, message : 'Error in create Team'}
      return res.status(201).json({
        status : 201,
        success : true,
        message : 'create team successfull'
      })
    } catch (error){
      next (error)
    }
  }
  async getListOfTeam(req, res, next){
    try {
      const teams = await TeamModel.find({});
      return res.status(200).json({
        status : 200,
        success : true,
        teams
      })
    } catch (error) {
      next(error)
    }
  }
  inviteUserToTeam(){

  }
  removeTeamById(){

  }
  updateTeam(){

  }
  removeUserFromTeam(){
    
  }
}

module.exports = {
  TeamController : new TeamController()
}