const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

const {
  addNewFriend,
  removeFriend,
} = require("../../controllers/friend-controller");

// Set up GET all and POST at /api/users
// /api/users
router
  .route("/")
  //
  .get(getAllUsers)
  //
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
// /api/users/:id
router
  .route("/:id")
  //
  .get(getUserById)
  //
  .put(updateUser)
  //
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addNewFriend);
router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
