const passport = require("passport");
const router = require("express").Router();

//This route will authenticate with Google
router.get("/google", passport.authenticate("google", { scope: ["profile"] })
);

//Google Auth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
      // Successful authentication, redirect home.
    res.json({message: "You're logged in 🥳."});
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.json({ message: "You're logged out." });
    });
});

module.exports = router
