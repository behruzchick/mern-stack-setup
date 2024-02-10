const mongoose = require('mongoose');

const YoureCardSchema = new mongoose.Schema({
  img:{
    name: String,
    data:Buffer
  },
  // Можно еще добавить сюда
  user:{
    type:mongoose.Types.ObjectId,
    ref:'User'
  },
});

const YoureModel = mongoose.model('Post', YoureCardSchema);

module.exports = {
    YoureModel
};
