const { Thoughts, Users } = require("../models");

const thoughtController = {
  // add thoughts to a user and add this information to another schema
  addThought({ params, body }, res) {
    console.log(body);
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          //"userId" might need to be "id"
          { _id: params.userId },
          //$push works exactly like it would in vanilla JS and is built into mongoose
          { $push: { comments: _id } },
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

  //the following code removes the comment from the pizza and deletes it
  removeThought({ params }, res) {
    //findoneanddelete deletes whatever is associated with the id and returns the data to us
    Thoughts.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return Thoughts.findOneAndUpdate(
          { _id: params.userId },
          //pull removes the established item to be deleted from the database
          { $pull: { comments: params.thoughtId } },
          { new: true }
        );
      })
      //the new DB is returned to the user
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
