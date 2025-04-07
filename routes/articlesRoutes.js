const express = require("express")
const router = express.Router()
const articlesController = require("../controllers/articles-controller")
const { techArticle } = require("../models/index");

//This route gets all technology articles
// GET technology/
router.get("/", articlesController.getAllArticles(techArticle))

//This route gets one technology article based on the id
// GET technology/id
router.get("/:id", articlesController.getArticleById(techArticle))

//This route creates a new technology article into the database
// POST technology/
router.post("/", articlesController.createNewArticle(techArticle))

//This route updates an existing technology article
// PUT technology/id
router.put("/:id", articlesController.updateArticleById(techArticle))

//This route deletes an existing technology article
// DELETE technology/id
router.delete("/:id", articlesController.deleteArticleById(techArticle))

module.exports = router