const { ProjectModel } = require('../../models/project')
class ProjectController{
  async createProject(req, res, next){
    try{
      const {title, text, tags} = req.body;
      console.log(tags)
      const owner = req.user._id;
      const result = await ProjectModel.create({title, text, owner, tags})
      if (!result) throw {status: 400, success: false, message: 'Failed to add project'}
      return res.status(201).json({
        status : 201,
        success : true,
        message : 'The project was successfully registered'
      })
    }catch (error){
      next(error)
    }
  }
  getAllProject(){

  }
  getProjectById(){

  }
  getAllProjectOfTeam(){

  }
  getProjectOfUser(){

  }
  updateProject(){

  }
  removeProject(){

  }
}
module.exports = {
  ProjectController : new ProjectController()
}