const express = require("express")
const router = express.Router()
const digitalProductsController = require("../controllers/digital-controller")
const validation = require("../middlewares/validate")
const {isAuthenticated} = require("../middlewares/authenticate")

//This route gets all digital products and their information
// GET digital-products/
router.get("/", digitalProductsController.getAllDigitalProducts)

//This route gets one digital products and their details based on the id
// GET digital-products/id
router.get("/:id", digitalProductsController.getDigitalProductById)

//This route creates a new product into the database
// POST digital-products/
router.post("/", isAuthenticated, validation.createAndUpdateDigitalProduct, digitalProductsController.createNewDigitalroduct)

//This route updates an existing product
// PUT digital-products/id
router.put("/:id", isAuthenticated, validation.createAndUpdateDigitalProduct, digitalProductsController.updateDigitalProductById)

//This route deletes an existing product
// DELETE digital-products/id
router.delete("/:id", digitalProductsController.deleteDigitalProductById)

module.exports = router
