const router = require("express").Router();

const {
  addThought,
  removeThought,
} = require("../../controllers/thought-controller");

// /api/thoughts/<userId>
//remembering that a post sends data to a server
router.route("/:userId").post(addThought);

// /api/thoughts/<pizzaId>/<commentId>
router.route("/:userId/:thoughtId").delete(removeThought);

module.exports = router;
