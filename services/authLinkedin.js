var passport = require('passport'),
    LinkedInStrategy = require('passport-linkedin').Strategy;


passport.use(new LinkedInStrategy({
        consumerKey: "779f6tmwjyjwr7",
        consumerSecret: "tWoFY3QhPIHRSs2f",
        callbackURL: "http://katalog-frontend.herokuapp.com/auth/linkedin/callback",
        profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline', 'positions']
    },
    function (token, tokenSecret, profile, done) {
        console.log(profile);
        return done(null,profile);
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
module.exports = passport;