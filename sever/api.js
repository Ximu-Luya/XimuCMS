let express = require('express')
let router = express.Router()
let blog = require('./blog_api')
let user = require('./user_api')
let team = require('./team_api')
let achievement = require('./achievement_api')

router.use('/', blog)
router.use('/', user)
router.use('/', team)
router.use('/', achievement)

module.exports = router
