const { Schema, Types } = require("mongoose");

const reactionsSchema = new Schema({
  noteId: {
    type: Types.ObjectId,
    default: new Types.ObjectId(),
  },
  noteText: {
    type: String,
    required: "Note text is Required",
  },
});

module.exports = reactionsSchema;
