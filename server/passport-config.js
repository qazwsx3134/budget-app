// 引入 passport 模組
const passport = require('passport')
// 引入驗證機制： passport-local
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy;
const User =require('./model/user')



function initialize(passport){

const  authenticateUser = async (req,email, password, done)=>{

  // 驗證邏輯 code..
try {
  const user = await User.findByCredentials(email, password)
  
  if (!user) 
  {
       return done(null, false) 
  }
  return done(null, user)
} catch (e) {
  return done(e)
}

}


//Local Strategy
// 透過 passport.user() 建立驗證機制
  passport.use(new LocalStrategy(
  // 當請 passport 用此驗證機制驗證時，處理驗證邏輯的 code...
  {
      //預設是到req.body中名為 username 和 password 的欄位取得帳號、密碼資訊
      // 改以名為 email 的欄位資訊作為帳號
      usernameField: 'email',

      // 改以名為 password 的欄位資訊作為密碼
      passwordField: 'password',

      // 讓 varify callback 函式可以取得 req 物件
      passReqToCallback: true 

    },// Varify Callback
    authenticateUser))

    

    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://wayfarertw.com/auth/facebook/callback",
      profileFields: ['id', 'emails', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      

      const user = await User.findOne({'email': profile.emails[0].value},function(err, user){
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        else {
          const newUser = new User();
          
          
          newUser.facebook.id = profile.id;
          newUser.facebook.token = profile.token;
          newUser.firstName = profile.name.givenName;
          newUser.lastName = profile.name.familyName;
          newUser.email = profile.emails[0].value;
          newUser.password = profile.id;
          
          newUser.save(function(err){
            if (err) {
              throw err;
            }
            return done(null, newUser);
          })
        }
      })     
    }
  ));

  passport.serializeUser((user, done)=> {
    // 只將用戶 id 序列化存到 session 中
    done(null, user._id)
  })

  passport.deserializeUser((_id, done)=> {
    // 透過使用者 id 到 MongoDB 資料庫尋找用戶完整資訊
    User.findById(_id, function(err, user) {
      done(err, user)
    })
  })

}



  
module.exports = initialize
