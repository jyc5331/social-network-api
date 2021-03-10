const { Users } = require("../models");

const friendController = {
  //add and delete
  addNewFriend({ params, body }, res) {
    console.log(body);
    Users.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: params.userId },
          //$push works exactly like it would in vanilla JS and is built into mongoose
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  removeFriend({ params }, res) {
    //you can also use `deleteOne` and `deleteMany`
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = friendController;
