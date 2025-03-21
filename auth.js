const passport = require("passport");
const localStartegy = require("passport-local").Strategy;
const Person = require("./models/person");
passport.use(
  new localStartegy(async (USERNAME, password, done) => {
    try {
      console.log("Recevieved Credential", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "incorrect username." });
      }
      // const isPasswordMatched = user.password === password ? true : false;
      const isPasswordMatched = await user.comparePassword(password);
      if (isPasswordMatched) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrect password." });
      }
    } catch (err) {
      return done(err);
    }
  })
);
module.exports = passport;
