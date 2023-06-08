"use strict"

const express = require("express")
const router = express.Router()

const controller = require("./controllers")

router.get('/', controller.output.main)
// router.get('/login', controller.output.login)
// router.get('/register', controller.output.register)
router.get('/logout', controller.output.logout)
router.get('/test',controller.output.test)
router.get('/main',controller.output.lobby)

router.post('/login', controller.process.login)
router.post('/register', controller.process.register)
router.post('/sendMessage', controller.process.sendMessage)


module.exports = router;