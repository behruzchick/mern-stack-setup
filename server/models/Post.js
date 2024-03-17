const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  img:{
    name: String,
    data:Buffer
  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:'User'
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});


const PostModel = mongoose.model('Post', PostSchema);

module.exports = {
    PostModel
};
