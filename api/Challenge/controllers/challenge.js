const challenge = require('../models/challenge')
const reponse = require('../models/reponse')


exports.addChallenge = (req, res) => {

    var userId = req.auth.userid
    if(!userId){
        console.log("tsis auth")
        res
        .status(403)
        .json({message: "Forbidden"})
    }

    userId = userId.userId

    const {title, content, lien, statut, difficulte} = req.body

    console.log(req.body)
    
    if(!title || !content){
        res
        .status(401)
        .json({message: "parametre introuvable"})
    }

    
    if (req.files){
        var fileArray = []
        req.files.map(()=>{
            fileArray.push(`${req.protocole}://${req.host}/challengeImage/${req.file.filename}`)
        })

        const newChallenge = new challenge({
            author: "640cb0d0a995dc3141ecea93",// a remplacer avec userId
            Title: title,
            content: content,
            lien: lien,
            statut: statut,
            image: fileArray,
            difficulte: difficulte,

        })

        newChallenge
        .save()
        console.log("challenge creer file")
        res
        .status(201)
        .end()
    }

    else{
        const newChallenge = new challenge({
            author: "640cb0d0a995dc3141ecea93",// a remplacer avec userId
            Title: title,
            statut: statut,
            content: content,
            difficulte: difficulte,
            lien: lien,

        })
        console.log("challenge creer")
        newChallenge
        .save()
        res
        .status(201)
        .json({message: "ajoute avec succes"})
    }




}

exports.allChallenge = (req, res) => {
const userId = req.auth.userid
if(!userId){
    res
    .status(403)
    .json({error: "Forbidden"})
}

challenge.find({}).populate("author participants")
.then((result) => {
    res
    .status(200)
    .json(result)
})
.catch((err)=>{
    res
    .status(401)
    .json({message: err})
})

}

//Ato ko mila remplacena

exports.mesChallenges = (req, res) => {
const userId = req.auth.userid
if(!userId){
    res
    .status(403)
    .json({error: "Forbidden"})
}
challenge.find({author: {_id: "640cb0d0a995dc3141ecea93"}}).populate("author participants")
.then((result)=>{
    res
    .status(200)
    .json(result)
})
.catch((err)=>{
    res
    .status(401)
    .json({message: err})
})
}


exports.editChallenge = (req, res) => {
const userId = req.auth.userid
if(!userId){
    res
    .status(403)
    .json({error: "Forbidden"})
}

const {
    title,
    content,
    lien,
    image,
    statut,
    challId,
    difficulte} = req.body

    if (!author || !title || !content){
        res
        .status(401)
        .json({message: "Parametre introuvable"})
    }

    if (req.files){
        var fileArray = []
        req.files.map((file)=>{
            fileArray.push(`${req.protocole}://${req.host}/challengeImage/${req.file.filename}`)
        })
        const newChallenge = challenge.updateOne({$and: [{author: {_id: userId}}, {_id: challId}]},
            {
            Title: title,
            content: content,
            statut: statut,
            lien: lien,
            image: fileArray,
            difficulte: difficulte

        })
        newChallenge
        .then((newChallenge) => res.status(201).json({data: newChallenge}))
        .catch((err) => res.status(500).json({message:err}))
    }

    else{
        const newChallenge = challenge.updateOne({$and: [{author: {_id: userId}}, {_id: challId}]},
            {
            Title: title,
            statut: statut,
            content: content,
            difficulte: difficulte,
            lien: lien,
        })
        newChallenge
        .then((newChallenge) => res.status(201).json({data: newChallenge}))
        .catch((err) => res.status(500).json({message:err}))
    }

}


exports.oneChallenge = (req, res) => {

const {challId} = req.body.challengeid
const userId = req.auth.userid
if(!userId){
    res
    .status(403)
    .json({error: "Forbidden"})
}
challenge.findOne({_id: challId}).populate("author participants")
.then((result) => {
    res
    .status(200)
    .json(result)
})
.catch((err)=>{
    res
    .status(401)
    .json({message: err})
})
}



exports.deleteChallenge = (req, res) => {
const userId = req.auth.userid
if(!userId){
    res
    .status(403)
    .json({error: "Forbidden"})
}

const {challengeId} = req.body.challengeId

reponse.deleteMany({challenge: {_id: challengeId}})
challenge.deleteOne({_id: challengeId})
.then((result)=>{res.status(201).json({message: "Effacer avec succes"})})
.catch((err)=>{res.status(401).json({erreur: err})})
}

//Ato ko MILA SOLONA LE USERID
exports.mesparticipations = (req, res) => {
const userId = req.auth.userid
if(!userId){
    res
    .status(403)
    .json({error: "Forbidden"})
}

reponse.find({author: {_id: "640cb0d0a995dc3141ecea93"}})
.populate("challenge")
.select("challenge")
.then((result)=>{
    res
    .status(201)
    .json(result)
})
.catch((err)=>{res.status(401).json({message: err})})
}

exports.statechallenge = (req, res) => {
const userId = req.auth.userid
if(!userId){
    res
    .status(403)
    .json({error: "Forbidden"})
}

challenge.find({$or: [{statut: resolu}, {statut: Resolu}]})
.populate("author participants")
.then((result)=>{
    res
    .status(201)
    .json(result)
})
.catch((err)=>{res.status(401).json({message: err})})

}

exports.participer = (req, res) => {

const challId = req.body

if(!challId){
    res
    .status(401)
    .json({error: "donnee introuvable"})
}

const userId = req.auth.userid
if(!userId){
    res
    .status(403)
    .json({error: "Forbidden"})
}



challenge.updateOne(
    {_id: challId},
    {$push: {participants: {_id: userId}}, $inc: nbr_participant},
    {new: true}
)
.then((result)=>{console.log(result)})
.catch((err)=>{res.status(403).json({error: err})})
challenge.findOne({_id: challId}).populate("author participants")
.then((result) => {
    res
    .status(200)
    .json(result)
})
.catch((err)=>{
    res
    .status(401)
    .json({message: err})
})
}