const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  path: { type: String, required: true, unique: true },
  colorPalette : [ {name: String, hexadecimal: String} ],
  typeset : [
    {
      fontFamily: {type: String}, 
      type: { type: String }
    }
  ],
  assets : [
    {name:String, secure_url: String, format: String}
  ],
  textstyles : [
    {
      name: {type: String, required: true, unique: true},
      fontFamily: {type: String}, //Just can be one of the fonts added previously
      fontWeight: {type: Number},
      fontSize: {type: Number},
      lineHeight: {type: Number},
      letterSpacing : {type: Number},
      uppercase: {type: Boolean}
    }
  ]
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

projectSchema.pre("save", function(next) {
  if(this.textstyles.length === 0)
  this.textstyles.push(
    {
      name: 'Heading 1',
      fontFamily: "'Rubik', Helvetica, Arial, sans-serif",
      fontSize: 4,
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: -0.1,
      uppercase: false
    },
    {
      name: 'Heading 2',
      fontFamily: "'Rubik', Helvetica, Arial, sans-serif",
      fontSize: 3.2,
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: -0.1,
      uppercase: false
    },
    {
      name: 'Heading 3',
      fontFamily: "'Rubik', Helvetica, Arial, sans-serif",
      fontSize: 2.4,
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: -0.1,
      uppercase: false
    },
    {
      name: 'Heading 4',
      fontFamily: "'Rubik', Helvetica, Arial, sans-serif",
      fontSize: 1.6,
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: 0,
      uppercase: false
    },
    {
      name: 'Body large',
      fontFamily: "'Rubik', Helvetica, Arial, sans-serif",
      fontSize: 1.3,
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: 0,
      uppercase: false
    },
    {
      name: 'Body',
      fontFamily: "'Rubik', Helvetica, Arial, sans-serif",
      fontSize: 1,
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: 0,
      uppercase: false
    },
    {
      name: 'Body small',
      fontFamily: "'Rubik', Helvetica, Arial, sans-serif",
      fontSize: 0.85,
      fontWeight: 500,
      lineHeight: 1.3,
      letterSpacing: 0.05,
      uppercase: false
    }
  )
  next();
})

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
