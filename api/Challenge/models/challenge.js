const mongoose = require('mongoose')
const reponse = require('./reponseChallenge')


const challengeSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    Title:{
        type:String,
        required:true
    },
    content:{
        type: String,
        require: true,
    },
    
    lien: {
        type: String,
        require: false,
        default: "",
    },

    image: [{
        type: String,
        require: false,
        default: "one.two.three"
    }],

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],

    reponse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reponsechallenge",
    }],

    statut: {
        type: String,
        require: false,
    },

    difficulte: {
        type: String,
        require: false,
        default: "Difficile"
    },

    nbr_participant: {
        type: Number,
        default: 0
    }

},
{
    timeistamp: true,
})

module.exports = mongoose.model("challenge", challengeSchema)