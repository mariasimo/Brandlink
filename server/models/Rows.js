const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const rowSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true }, 
    layout: String,
    slots: [],
    content: []
}, {
   strict: false 
}, {
  timestamps: true,
  // toJSON: {
  //   transform: (doc, ret) => {
  //     ret.id = doc._id;
  //     delete ret._id;
  //     delete ret.__v;
  //     // delete ret.password;
  //     delete ret.createdAt;
  //     return ret;
  //   }
  // }
});

const Rows = mongoose.model('Rows', rowSchema);
module.exports = Rows;

