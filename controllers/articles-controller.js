const mongoose = require("mongoose");

function getAllArticles(Schema) {
    //#swagger.tags=['Articles']
  return async function (req, res) {
    try {
      const articles = await Schema.find({});
      if (articles) {
        res.status(200).json(articles);
      } else {
        res.status(400).json({ message: "Unable to retrieve articles" });
      }
    } catch (error) {
      console.error("Unable to get Articles:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

function getArticleById(Schema) {
    //#swagger.tags=['Articles']
  return async function (req, res) {

    const articleId = req.params.id;

    if (!articleId || !mongoose.Types.ObjectId.isValid(articleId)) {
        return res.status(400).json({ message: "Missing article ID or Invalid article ID format" })
    }

    try {
        const article = await Schema.findById(articleId)
        if (article) {
            res.status(200).json(article)
        } else {
            res.status(404).json({message: "Article Not Found"})
        }
    } catch (error) {
        console.error("Unable to get Articles:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
  };
}

function createNewArticle(Schema) {
    //#swagger.tags=['Articles']
    return async function (req, res) {

        const { title, content, publishedAt } = req.body;

        const articleDocument = {
            title,
            content,
            publishedAt
        }

        if (!articleDocument.title || !articleDocument.content) {
            return res.status(400).json({error: "Missing required fields"})
        }

        try {
            await Schema.create(articleDocument)
            res.status(201).json({message: "New Article Created Successfully"})
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal Server Error" });
        }

    }
}

function updateArticleById(Schema) {
    //#swagger.tags=['Articles']
    return async function (req, res) {

        const articleId = req.params.id;

        if (!articleId || !mongoose.Types.ObjectId.isValid(articleId)) {
            res.status(400).json({ message: "Missing article ID or Invalid article ID format" })
        }

        const { title, content, publishedAt } = req.body;

        const articleDocument = {
            title,
            content,
            publishedAt
        }

        if (!articleDocument.title || !articleDocument.content) {
            return res.status(400).json({error: "Missing required fields"})
        }

        try {
            const article = await Schema.findById(articleId);
            if (!article) {
                res.status(404).json({ message: "Article not found" })
            }
            await Schema.updateOne(
                {_id: articleId},
                {$set: articleDocument}
            )
            res.status(200).json({message: "Article updated successfully"})
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

function deleteArticleById(Schema) {
    //#swagger.tags=['Articles']
    return async function (req, res) {

        const articleId = req.params.id;

        if (!articleId || !mongoose.Types.ObjectId.isValid(articleId)) {
            return res.status(400).json({message: "Missing article ID or Invalid article ID format"})
        }

        try {
            const article = await Schema.findById(articleId);
            if (!article) {
                res.status(404).json({message: "Article Not Found"})
            }
            await Schema.deleteOne({_id: articleId})
            res.status(200).json({message: "Article deleted successfully"})
        } catch (error) {
            console.error(error)
            res.status(500).json({error: "Internal Server Error"})
        }
    }
}

module.exports = { getAllArticles, getArticleById, createNewArticle, updateArticleById, deleteArticleById };
