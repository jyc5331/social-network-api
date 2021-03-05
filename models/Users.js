const { Schema, Types } = require("mongoose");
const reactionsSchema = require("./Reactions");
const thoughtsSchema = require("./Thoughts");

//users

const usersSchema = new Schema({
  noteId: {
    type: Types.ObjectId,
    default: new Types.ObjectId(),
  },
  noteText: {
    type: String,
    required: "Note text is Required",
  },
});

module.exports = usersSchema;
