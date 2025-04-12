const express = require("express")
const router = express.Router()
const hardwareProductsController = require("../controllers/hardware-controller")
const validation = require("../middlewares/validate")
const {isAuthenticated} = require("../middlewares/authenticate")

//This route gets all hardware products and their information
// GET hardware-products/
router.get("/", hardwareProductsController.getAllHardwareProducts)

//This route gets one hardware products and their details based on the id
// GET hardware-products/id
router.get("/:id", hardwareProductsController.getHardwareProductById)

//This route creates a new product into the database
// POST hardware-products/
router.post("/", isAuthenticated, validation.createAndUpdateHardwareProduct, hardwareProductsController.createNewHardwareProduct)

//This route updates an existing product
// PUT hardware-products/id
router.put("/:id", isAuthenticated, validation.createAndUpdateHardwareProduct, hardwareProductsController.updateHardwareProductById)

//This route deletes an existing product
// DELETE hardware-products/id
router.delete("/:id", hardwareProductsController.deleteHardwareProductById)

module.exports = router
