const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/userModel");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("./keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/callback",
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, done) {
      const existingUser = await User.getUserByEmail(profile._json.email);

      if (!existingUser) {
        const newUser = new User(
          profile._json.family_name,
          profile._json.given_name,
          profile._json.email,
          profile.id
        );

        await newUser.saveUser();

        return done(null, newUser);
      } else {
        return done(null, existingUser);
      }
    }
  )
);
