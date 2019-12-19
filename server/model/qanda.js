const mongoose = require('mongoose')
const validator = require('validator')


var ObjectId = mongoose.Schema.Types.ObjectId;

const Qanda = mongoose.model('Qanda',{
    city:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    topic:{
        type: String,
        required: true,
    },
    text:{
        type: String
    },
    author: [{
        user: ObjectId,
        name: String
     }] ,
    posted: {
        type: Date,
        default: Date.now
    },
    likeby: [{ user: ObjectId }] ,

    dislikeby: [{ user: ObjectId }] ,

    otherPic: [ {pictureURL: String,key: String} ],

    comment: [{ posted :{type: Date, default: Date.now} ,
        otherPic: [ {pictureURL: String,Key: String} ], 
        user: ObjectId,
        name: String, 
        text: String
    }] 

})

module.exports = Qanda