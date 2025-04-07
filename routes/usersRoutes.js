const express = require("express")
const router = express.Router()
const usersController = require("../controllers/users-controller") 

//This route gets all users and their information
// GET users/
router.get("/", usersController.getAllUsers)

//This route gets one user and their details based on the id
// GET users/id
router.get("/:id", usersController.getUserById)

//This route creates a new user into the database
// POST users/
router.post("/", usersController.createNewUser)

//This route updates an existing user
// PUT users/id
router.put("/:id", usersController.updateUserById)

//This route updates an existing user
// DELETE users/id
router.delete("/:id", usersController.deleteUserById)

module.exports = router