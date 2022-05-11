
const autoBind = require('auto-bind');
const { ProjectModel } = require('../../models/project')
class ProjectController{
  constructor(){
    autoBind(this)
  }
  async createProject(req, res, next){
    try{
      const {title, text, tags, image} = req.body;
      const owner = req.user._id;
      const result = await ProjectModel.create({title, text, owner, tags, image})
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
  async getAllProject(req, res, next){
    try{
      const owner = req.user._id
      const projects = await ProjectModel.find({owner});
      return res.status(200).json({
        status : 200,
        success : true,
        projects
      })
    } catch (error){
      next(error)
    }
  }
  async _findProject(owner, projectId){
    const project = await ProjectModel.find({owner, _id : projectId})
    if (!project) throw {status : 404, success : false, message : 'project not found'}
    return project
  }
  async getProjectById(req, res, next){
    try{
      const owner = req.user._id;
      const projectId = req.params.id;
      const project = await this._findProject(owner, projectId);
      if (project.length == 0) throw {status : 400, success : false, message : 'not found project with this ID'} 
      return res.status(200).json({
        status : 200,
        success : true,
        project
      })
    } catch (error){
      next(error)
    }
  }
  async removeProject(req, res, next){
    try{
      const owner = req.user._id;
      const projectId = req.params.id;
      await this._findProject(owner, projectId);
      const deleteProjectResult = await ProjectModel.deleteOne({_id : projectId});
      if (deleteProjectResult.deletedCount == 0) throw {status : 400, success : false, message : 'Error on deleting project'};
      return res.status(200).json({
        status : 200,
        success : true,
        message : 'delete project successfull'
      })
    } catch (error){
      next(error)
    }
  }
  async updateProject(req, res, next){
    try{
      const owner = req.user._id;
      const projectID = req.params.id;
      await this._findProject(owner, projectID);
      const data = {...req.body}
      Object.entries(data).forEach(([key, value]) => {
        if (!["title", "text", "tags"].includes(key)) delete data[key];
        if (["", " ", null, 0, -1, undefined, NaN, false].includes(value)) delete data[key];
        if (key === "tags" && data['tags'].constructor === Array){
          data['tags'] = data['tags'].filter(v => {
            if (!["", " ", null, 0, -1, undefined, NaN, false].includes(v)) return v
          })
          if(data['tags'].length === 0) delete data['tags'];
        }
      })
      const updateResult = await ProjectModel.updateOne({_id : projectID}, {$set : data})
      if (updateResult.modifiedCount == 0) throw {status : 400, success : false, message : 'Error on updating data'};
      return res.status(200).json({
        status : 200,
        success : true,
        message : 'update project successfull'
      })
    } catch (error){
      next(error)
    }
  }
  async updateImageProject(req, res, next){
    try{
      console.log('updateImageProject')
      const {image} = req.body;
      const owner = req.user._id;
      const projectID = req.params.id;
      await this._findProject(projectID, owner);
      const updateResult = await ProjectModel.updateOne({_id : projectID}, {$set : {image}});
      if (updateResult.modifiedCount == 0) throw {status: 400, message: 'Error on updating image'};
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'update project successfull'
      })
    }catch(error){
      next(error)
    }
  }


  getAllProjectOfTeam(){

  }
  getProjectOfUser(){

  }
}
module.exports = {
  ProjectController : new ProjectController()
}