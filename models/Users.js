const { Schema, model } = require("mongoose");
const reactionsSchema = require("./Reactions");
const thoughtsSchema = require("./Thoughts");
const opts = { toJSON: { virtuals: true }, id: false };

//users

const UsersSchema = new Schema(
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

    //HELP Friends: Array of \_id values referencing the User model (self-reference)
    //reactions: [reactionsSchema],
    thoughts: [
      //HELP should these actually be showing up? thoughtText isn't showing up anywhere
      {
        type: Schema.Types.ObjectId,
        //ref tells mongoose from whence to populate the specified array, Thoughts.js
        ref: "Thoughts",
      },
    ],
  },
  opts
);

UsersSchema.virtual("friendCount").get(function () {
  return "hello";
  //retrieves the length of the user's friends array field on query the code will be:
  //return this.friends.length
});

const Users = model("Users", UsersSchema);

module.exports = Users;
