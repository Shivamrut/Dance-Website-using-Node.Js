const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const users = require('./userDb')

function initializePassport(passport)
{
    passport.use(new LocalStrategy({usernameField:'username',passwordField:'password'}, async function(username,password,done)
    {
        
        try{
            const user = await users.findOne({username:username}).exec();
            console.log('check: ',user);
            if(!user)
            {
                return done(null,false,{message:'User does not exist'});
            }
            bcrypt.compare(password,user.password)
            .then((match)=>{
                // console.log(match);
                if(match)
                {
                    return done(null,user);
                }
                else{
                    return done(null,false,{message:'Incorrect Password'});
                }
            })
            .catch(e=>{
                return done(e);
            })
        }
        catch(e)
        {
            done(e);
        }
    }))
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user._id); // Assuming user object has a field named '_id'
      });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await users.findOne({ _id: id }).exec();
            if (user) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (err) {
            done(err);
          }
    });

}

module.exports = initializePassport;