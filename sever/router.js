let express = require('express')
let router = express.Router()
let blog = require('./router/blog_api')
let user = require('./router/user')
let team = require('./router/team_api')
let achievement = require('./router/achievement_api')

router.use('/', blog)
router.use('/user', user)
router.use('/', team)
router.use('/', achievement)

module.exports = router
