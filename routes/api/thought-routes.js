const router = require("express").Router();

const {
  getAllThoughts,
  addThought,
  getThoughtById,
  updateThought,
  removeThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts/<userId>
//remembering that a post sends data to a server
router.route("/").get(getAllThoughts);
router.route("/").post(addThought);

//getThoughtById and removeThought both unable to find a thought that exists
// /api/thoughts/<userId>/<thoughtId>
router.route("/:thoughtId").get(getThoughtById);

router.route("/:thoughtId").put(updateThought);

router.route("/:thoughtId").delete(removeThought);

//reactions post and delete
// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
