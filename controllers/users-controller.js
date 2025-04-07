const { User } = require("../models/index");
const mongoose = require("mongoose")

async function getAllUsers(req, res) {
  //#swagger.tags=['Users']
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json({ message: "Unable to retrieve users" });
    }
  } catch (error) {
    console.error("Unable to get users:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserById(req, res) {
  //#swagger.tags=['Users']
  const userId = req.params.id;

  if ( !userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Missing user ID or Invalid user ID format" });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.error("Unable to get users:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createNewUser(req, res) {
  //#swagger.tags=['Users']
    const { firstName, lastName, email, city, country, instagram, facebook } = req.body;

    const userDocument = {
        firstName,
        lastName,
        email,
        city,
        country,
        instagram,
        facebook
    }

    if (!userDocument.firstName || !userDocument.lastName || !userDocument.email || !userDocument.city || !userDocument.country) {
        return res.status(400).json({error: "Missing required fields"})
    }

    try {
        await User.create(userDocument)
        res.status(201).json({message: "New User Created Successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateUserById(req, res) {
  //#swagger.tags=['Users']
    const userId = req.params.id;

    if ( !userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Missing user ID or Invalid user ID format" });
    }

    const { firstName, lastName, email, city, country, instagram, facebook } = req.body;

    const userDocument = {
        firstName,
        lastName,
        email,
        city,
        country,
        instagram,
        facebook
    }

    if (!userDocument.firstName || !userDocument.lastName || !userDocument.email || !userDocument.city || !userDocument.country) {
        return res.status(400).json({error: "Missing required fields"})
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        await User.updateOne(
            {_id: userId },
            {$set: userDocument}
        )
        res.status(200).json({message: "User updated successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteUserById(req,  res) {
  //#swagger.tags=['Users']
    const userId = req.params.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({message: "Missing user ID or Invalid user ID format"})
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        await User.deleteOne({_id: userId})
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { getAllUsers, getUserById, createNewUser, updateUserById, deleteUserById };