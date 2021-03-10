const { Thoughts, Users } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // add thoughts to a user and add this information to another schema
  addThought({ body }, res) {
    console.log(body);
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: body.userId },
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
  //get single thought by ID
  getThoughtById({ params }, res) {
    //the following line is a request the only accesses data that matches a specific ID as opposed to accessing the whole DB
    Thoughts.findOne({ _id: params.thoughtId })
      .then((dbUsersData) => {
        // If no user is found, send 404
        if (!dbUsersData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //update single thought by ID
  updateThought({ params, body }, res) {
    //findOneAndUpdate is taking in 3 arguments. the first tells the function what to match (target)
    //the second specifies what content is being updated. the third tells us to look at the new object
    Thoughts.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //the following code removes the thought from the user and deletes it
  removeThought({ params }, res) {
    //findoneanddelete deletes whatever is associated with the id and returns the data to us
    Thoughts.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        console.log(deletedThought);
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return Users.findOneAndUpdate(
          { username: deletedThought.userName },
          //pull removes the established item to be deleted from the database
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      //the new DB is returned to the user
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
