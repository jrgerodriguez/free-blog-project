const router = require("express").Router();
const usersRoutes = require("./usersRoutes");
const articlesRoutes = require("./articlesRoutes");
const hardwareProductsRoutes = require("./hardwareProductsRoutes");
const digitalProductsRoutes = require("./digitalProductsRoutes");


router.get("/", (req, res) => {
    res.json({message: "App is working"})
})

router.use("/users", usersRoutes)

router.use("/articles", articlesRoutes)

router.use("/hardware-products", hardwareProductsRoutes)

router.use("/digital-products", digitalProductsRoutes)

router.get("/login", (req, res) => {
    res.redirect("/auth/google")
})

router.get("/logout", (req, res) => {
    res.redirect("/auth/logout")
})

module.exports = router
