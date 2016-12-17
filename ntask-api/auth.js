import passport from "passport";
import passportJwt from "passport-jwt";

const Strategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;



module.exports = app => {
    const Users = app.db.models.Users;
    const cfg = app.libs.config;
    const options = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    }
    const strategy = new Strategy(options, 
        (payload, done) => {
            Users.findById(payload.id)
            .then(user => {
                if(user){
                    return done(null, {
                        id: user.id,
                        email: user.email
                    })
                }
                
                return done(null, false);
            })
            .catch(error => done(error, null));
        });
    
    passport.use(strategy);
    return {
        initialize: () =>{
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    }
    
}