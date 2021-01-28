let express = require('express')
let router = express.Router()
let blog = require('./router/blog')
let user = require('./router/user')
let team = require('./router/team')
let achievement = require('./router/achievement')

router.use('/blog', blog)
router.use('/user', user)
router.use('/team', team)
router.use('/achievement', achievement)

module.exports = router
