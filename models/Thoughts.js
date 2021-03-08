const { Schema, model } = require("mongoose");
const opts = { toJSON: { virtuals: true }, id: false };

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "A response between 1-280 characters is required.",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      timestamps: true,
      type: Date,
      default: Date.now,
    },
    userName: {
      type: String,
      required: "username is Required",
    },
    //reactions: [reactionsSchema]
  },
  opts
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return "hello";
  //retrieves the length of the thought's reactions array field on query.
  //return this(reactions.length)
});

const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;
