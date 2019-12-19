const mongoose = require('mongoose')
const validator = require('validator')


var ObjectId = mongoose.Schema.Types.ObjectId;

const Event = mongoose.model('Event',{
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
    organizer:{
        type: String,
    },
    text:{
        type: String
    },
    notes:{
        type: String
    },
    map:{
        type: String
    },
    address:{
        type: String,
    },
    pictureURL:{
        pictureURL: String,
        key: String
    },
    website:{
        type: String
    },
    posted: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    eventFee: {
        type: Number, 
        min: 0, 
    },
    likeby: [{ user: ObjectId }] ,

    dislikeby: [{ user: ObjectId }] ,

    otherPic: [ {
        pictureURL: String,
        key: String} ],


})

module.exports = Event