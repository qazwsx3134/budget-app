const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

//為了要使用middleware 所以先建立一個Schema


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    pictureURL:{
        pictureURL: String,
        key: String
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    facebook:{
        id: String,
        token: String,
    }

})

userSchema.methods.toJSON = function () {
    const user = this 
    const userObject = user.toObject()

    delete userObject.password

    return userObject
}


userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//Hash password
//在User save之前執行這一段
//要使用function 不能用arrow 因為binding

userSchema.pre('save', async function(next){
    //this 會等於User 之所以加一行其實多餘但是比較好分辨

    const user = this

    //會觸發 when 第一次產生USER 或是UPDATE密碼的時候
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    //結束
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User