const mongoose = require('mongoose')


mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    
})


// mongoose.connect('mongodb://127.0.0.1:27017/wayfarer-test', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
    
// })
