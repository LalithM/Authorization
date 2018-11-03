const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
let Schema = mongoose.Schema;

let userSchema = new Schema({
  userName : {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  fullName:{
    type: String,
    required: true,
    default:''
  },
  userImage:{
    type:String,
    required:false,
    default:'default.png'
  },
  facebook:{
    type:String,
    default:''
  },
  fbTokens:Array,
  google:{
    type:String,
    default:''
  },
  googelTokens:''
  });

userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
  }
  
userSchema.methods.validatePassword = (password)=>{
    return bcrypt.compareSync(password,this.password);
  }
module.exports = mongoose.model('User',userSchema);
