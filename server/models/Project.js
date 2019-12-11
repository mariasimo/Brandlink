const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  path: { type: String, required: true, unique: true },
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
