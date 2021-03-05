const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

//will the following line be sufficient or will they all need to be imported? TBD
const { Users } = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/usersdb", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);

// Create a new user
app.post("/api/users", ({ body }, res) => {
  Users.create(body)
    .then((dbUsersData) => {
      res.json(dbUsersData);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Retrieve all notebooks
app.get("/api/notebooks", (req, res) => {
  res.send("Hello!");
  //   Notebook.find()
  //     .then((dbNotebookData) => {
  //       res.json(dbNotebookData);
  //     })
  //     .catch((err) => {
  //       res.json(err);
  //     });
});

// Create a new note for a notebook
app.post("/api/notebooks/:notebookId/notes", (req, res) => {
  // Using the 'notebookId' in the params, find the notebook from the collection
  let notebookId = req.params.notebookId;
  // Notebook.findById(notebookId)

  // Add the 'req.body' to the 'notes' subdocument array in the notebook
  Notebook.findOneAndUpdate(
    { _id: notebookId },
    { $addToSet: { notes: req.body } },
    { new: true }
  )
    .then((dbNotebookData) => {
      res.json(dbNotebookData);
    })
    .catch((err) => {
      res.json(err);
    });
  //
});

// Delete a note from a notebook
app.delete("/api/notebooks/:notebookId/notes/:noteId", (req, res) => {
  // Using the 'notebookId' and 'noteId' in the params, find the notebook that contains the note
  // Remove the note from the 'notes' subdocument array in the notebook
  //
  // YOUR CODE HERE
  //
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
