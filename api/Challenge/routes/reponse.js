const route = require('express').Router()
const ctrlReponse = require('../controllers/reponse')

route.post('/createreponse', ctrlReponse.createReponse)
route.put('/editreponse', ctrlReponse.editReponse)
route.get('/allreponse', ctrlReponse.allReponse)
route.delete('/deletereponse', ctrlReponse.deleteReponse)


module.exports = route