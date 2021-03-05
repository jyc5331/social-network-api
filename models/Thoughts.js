const { Schema, Types } = require("mongoose");

const thoughtsSchema = new Schema({
  noteId: {
    type: Types.ObjectId,
    default: new Types.ObjectId(),
  },
  noteText: {
    type: String,
    required: "Note text is Required",
  },
});

module.exports = thoughtsSchema;
