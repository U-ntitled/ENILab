const reponse = require('../models/reponse')


exports.createReponse = (req, res) => {
    const userId = req.auth.userid
    if(!userId){
        res
        .status(403)
        .json({message: "Forbiden"})
    }

    const {challId, content} = req.body
    if(!challId || !content){
        res
        .status(401)
        .json({message: "Parametre introuvable"})
    }

    if (req.files){
        const file = ''
        req.files.map(()=>{
            file=`${req.protocole}://${req.host}/challengeImage/${req.file.filename}`
        })

        const newReponse = new reponse({
            author: "640cb0d0a995dc3141ecea93",// a remplacer avec userId
            challenge: challId,
            content: content,
            image: file,

        })

        newReponse
        .save()
        console.log("reponse creer file")
        res
        .status(201)
        .end()
    }
    else{
        const newReponse = new reponse({
            author: "640cb0d0a995dc3141ecea93",// a remplacer avec userId
            challenge: challId,
            content: content,

        })
        console.log("challenge creer")
        newReponse
        .save()
        res
        .status(201)
        .json({message: "ajoute avec succes"})
    }

}

exports.editReponse = (req, res) => {
    const userId = req.auth.userid
    if(!userId){
        res
        .status(403)
        .json({message: "Forbiden"})
    }

    const {reponseId, content} = req.body

    if(!content){
        res
        .status(401)
        .json({error: "parrametres introuvable"})
    }

    if(req.files){
        const file = ''
        req.files.map(()=>{
            file=`${req.protocole}://${req.host}/challengeImage/${req.file.filename}`
        })

        reponse.upda

        const newReponse = reponse.updateOne(
            {_id: reponseId},
            {
                content: content,
                image: file,
            }
        
        )
        newReponse
        .then((newReponse) => res.status(201).json({data: newReponse}))
        .catch((err) => res.status(500).json({message:err}))
    }
    else{
        const newReponse = reponse.updateOne(
            {_id: reponseId},
            {
                content: content,
            }
        
        )
        newReponse
        .then((newReponse) => res.status(201).json({data: newReponse}))
        .catch((err) => res.status(500).json({message:err}))
    }

    
}

exports.allReponse = (req, res) => {
    const userId = req.auth.userid
    if(!userId){
        res
        .status(403)
        .json({message: "Forbiden"})
    }
    const {challId} = req.body
    reponse.find({challenge: {_id: challId}})
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

exports.deleteReponse = (req, res) => {
    const userId = req.auth.userid
    if(!userId){
        res
        .status(403)
        .json({message: "Forbiden"})
    }
    const {reponseId} = req.body
    reponse.deleteOne({_id: reponseId})
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

