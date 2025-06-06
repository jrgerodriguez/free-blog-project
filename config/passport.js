const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://free-blog-project.onrender.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile)
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
