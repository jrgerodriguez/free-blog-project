const router = require("express").Router();
const usersRoutes = require("./usersRoutes");
const articlesRoutes = require("./articlesRoutes");

router.get("/", (req, res) => {
    res.json({message: "App is working"})
})

router.use("/users", usersRoutes)

router.use("/articles", articlesRoutes)


module.exports = router
