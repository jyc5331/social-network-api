const { Schema, Types } = require("mongoose");

const reactionsSchema = new Schema({
  ReactionId: {
    type: Types.ObjectId,
    default: new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: "A response between 1-280 characters is required.",
    maxlength: 280,
  },
  userName: {
    type: String,
    required: "username is Required",
  },
  createdAt: {
    timestamps: true,
    type: Date,
    default: Date.now,
    // Use moment in a getter method to format the timestamp on query
  },
});

module.exports = reactionsSchema;
