const route = require('express').Router()
const auth = require('../middleware/auth')
const ctrlChallenge = require('../controllers/challenge')


route.post('/createchallenge', ctrlChallenge.addChallenge)
route.get('/allchallenge', ctrlChallenge.allChallenge)
route.get('/meschallenges', ctrlChallenge.mesChallenges)
route.put('/editchallenge', ctrlChallenge.editChallenge)
route.get('/onechallenge', ctrlChallenge.oneChallenge)
route.delete('/deletechallenge', ctrlChallenge.deleteChallenge)
route.get('/mesparticipants', ctrlChallenge.mesparticipants)
route.get('statechallenge', ctrlChallenge.statechallenge)
route.put('/participer', ctrlChallenge.participer)

module.exports = route