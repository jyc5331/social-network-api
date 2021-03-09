const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updatePizza,
  deletePizza,
} = require("../../controllers/user-controller");

// Set up GET all and POST at /api/users
// /api/users
router
  .route("/")
  //
  .get(getAllUsers)
  //
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
// /api/pizzas/:id
router
  .route("/:id")
  //
  .get(getUserById)
  //
  .put(updatePizza)
  //
  .delete(deletePizza);

module.exports = router;
