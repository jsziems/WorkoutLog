const Express = require("express")
const router = Express.Router()

router.get('/practice', (req, res) => {
    res.send('Practice route!')
})

router.get('/about', (req, res) => {
    res.send('The About route!')
})

module.exports = router