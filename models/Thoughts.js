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
    reactions: [
      {
        type: Schema.Types.ObjectId,
        //ref tells mongoose from whence to populate the specified array, Reactions.js
        ref: "Reactions",
      },
    ],
  },
  opts
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;
