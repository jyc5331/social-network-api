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

    friends: [
      {
        type: Schema.Types.ObjectId,
        //ref tells mongoose from whence to populate the specified array, Users.js
        ref: "Users",
      },
    ],
    thoughts: [
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
  return this.friends.length;
});

const Users = model("Users", UsersSchema);

module.exports = Users;
