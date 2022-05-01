const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  fname : {type : String},
  lname : {type : String},
  username : {type : String, required : true, unique : true},
  mobile : {type : String, required : true, unique : true},
  email : {type : String, required : true, unique : true},
  password : {type : String, required : true},
  rolls : {type : [String], default : ['USER']},
  skills : {type : [String], default : []},
  teams : {type : [mongoose.Types.ObjectId], default : []},
  token : {type : String, default : ''}
}, { 
  timestamps : true
})
const UserModel = mongoose.model('user', UserSchema);
module.exports = {
  UserModel
}