const { body } = require("express-validator");
const path = require('path');
function imageValidator(){
  return [
    body('image').custom((value, {req}) =>{
      if(Object.keys(req.file).length == 0) throw "please select a picture";
      const ext = path.extname(req.file.originalname);
      const exts = ['.jpg', '.png', '.jpeg', '.gif', '.webp'];
      if (!exts.includes(ext)) throw 'The uploaded image format is incorrect'
      const maxSize = 2 * 1024 * 1024;
      if (req.file.size > maxSize) throw 'Please select an image with a size of less than 2 MB'
      return true
    })
    
  ]
}

module.exports = {
  imageValidator
} 