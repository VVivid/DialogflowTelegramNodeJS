const express = require('express')
const botController = require('../controllers/botController')
const router = express.Router()

router.route('/').post(botController).get((req,res) => res.send('Bot is live'))

module.exports = router