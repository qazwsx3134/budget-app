//先確定moongoose有運行
require('./db/mongoose')
const path = require('path')
const express = require('express')
const app = express();

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')

const placeRouter = require('./routers/place')
const userRouter = require('./routers/user')
const foodRouter = require('./routers/food')
const eventRouter = require('./routers/event')
const qandaRouter = require('./routers/qanda')
const uploadRouter = require('./routers/upload')

// /Users/USER/mongodb/bin/mongod.exe --dbpath=/Users/USER/mongodb-data/


const initializePassport = require('./passport-config')
initializePassport(passport)




const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT ;



app.use(cookieParser());
app.use(express.json())
app.use(cors({
  credentials: true
}))

// 初始化 body-parser 和 express-session
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'wayfarer',
  resave: 'false',
  saveUninitialized: 'false',
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 5*60*60 * 1000  // 有效期，单位是毫秒
}
}))





// 初始化 Passport
app.use(passport.initialize())
// 如果要使用 login session 時需設定
app.use(passport.session({ secret: 'RongHao' }))

//把api寫在router裡面 然後用app.use去使用他 而且要放在passport下面
app.use(userRouter)
app.use(placeRouter)
app.use(foodRouter)
app.use(eventRouter)
app.use(qandaRouter)
app.use(uploadRouter)


//設定前端的網頁
app.use(express.static(publicPath));
// app.get('*', (req, res)=>{
//     res.sendFile(path.join(publicPath,'index.html'));
// });

app.listen(port, ()=>{
    console.log('Server is up!'+ port);
});