const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  path: { type: String, required: true, unique: true },
  colorPalette : [ {name: String, hexadecimal: String} ],
  typeset : [
    {
      fontFamily: {type: String}, 
      searchStr: {type: String},
      type: { type: String }
    }
  ],
  assets : [
    {secure_url: String, resource_type: String}
  ]
  // textStyles : [
  //   {
  //     name: {type: String},
  //     fontFamily: {type: String}, //Just can be one of the fonts added previously
  //     fontWeight: {type: Number},
  //     lineHeight: {type: Number},
  //     letterSpacing : {type: Number},
  //     uppercase: {type: Boolean}
  //   }
  // ]
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      // delete ret.password;
      delete ret.createdAt;
      return ret;
    }
  }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
