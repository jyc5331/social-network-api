const { Schema, model } = require("mongoose");
const reactionsSchema = require("./Reactions");
const thoughtsSchema = require("./Thoughts");
const opts = { toJSON: { virtuals: true }, id: false };

//users

const usersSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: "Username is Required",
      unique: true,
    },

    email: {
      type: String,
      unique: true,
      required: "Email is Required",
      match: [/.+@.+\..+/],
    },

    userCreated: {
      type: Date,
      default: Date.now,
    },
    //HELP Friends: Array of \_id values referencing the User model (self-reference)
    //reactions: [reactionsSchema],
    //thoughts: [thoughtsSchema],
  },
  opts
);

UserSchema.virtual("friendCount").get(function () {
  return "hello";
  //retrieves the length of the user's friends array field on query
  //return this(friends.length)
});

const Users = model("Users", usersSchema);

module.exports = Users;
