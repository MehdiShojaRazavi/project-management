const path = require('path')
const {createUploadPath} = require('./functions')
const uploadFile = async(req, res, next) => {
const path = require('path')
  try{
    if (!(req?.files && req?.files.image)) throw {status : 400, suceess : false, message : 'Error in send a image'}
    const image = req?.files.image
    const ext = path.extname(image.name)
    if (!['.jpg', '.png', 'jepg', 'gif', 'webg'].includes(ext)) throw {status : 400, suceess : false, message : 'Error in reciving image'}
    const imagePath = path.join(createUploadPath(), (Date.now() + ext))
    req.body.image = imagePath
    const uploadPath = path.join(__dirname, '..', '..', imagePath)

    image.mv(uploadPath, (error) => {
      if (error) throw {status : 500, success : false, message : 'Error in image upload on server'}
    })
    return res.status(200).json({
      status : 200,
      success : true,
      message : 'image is uploaded'
    })
  } catch(error){
    next(error)
  }
}

module.exports = {
  uploadFile
}