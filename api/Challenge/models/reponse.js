const mongoose = require('mongoose')


const reponseChallenge = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },

    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "challenge",
    },

    content:{
        type: String,
        require: true,
    },

    image: {
        type: String,
        require: false,
        default: "one.two.three"
    },

    validation: {
        type: Boolean,
        default: false
    }


},
{
    timeistamp: true,
})

module.exports = mongoose.model("reponsechallenge", reponseChallenge)