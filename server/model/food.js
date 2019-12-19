const mongoose = require('mongoose')
const validator = require('validator')


var ObjectId = mongoose.Schema.Types.ObjectId;

const Food = mongoose.model('Food',{
        city:{
            type: String,
            required: true,
        },
        type:{
            type: String,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        englishname:{
            type: String,
            required: true,
        },
        description:{
            type: String
        },
        map:{
            type: String
        },
        label:[ {subLabel: String} ],

        address:{
            type: String,
        },
        pictureURL:{
            pictureURL: String,
            key: String,
        },
        website:{
            type: String
        },
        instaURL:{
            type: String
        },
        posted: {
            type: Date,
            default: Date.now
        },
        averagePrice: {
            type: Number, 
            min: 0, 
        },
        BusinessHours:{
            type: String
        },
        hourstay: {
            type: Number, 
            min: 0, 
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

module.exports = Food