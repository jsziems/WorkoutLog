const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { logModel, LogModel } = require("../models")

/* 
** Create a log
*/
router.post("/create", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log
    const {id } = req.user
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry)
        res.status(200).json(newLog)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
** Get user's logs
*/
router.get("/", validateJWT, async (req, res) => {
    const { id } = req.user
    try {
        const myLogs = await LogModel.findAll({
            where: {
                owner_id: id
            }
        })
        res.status(200).json(myLogs)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
** Get user's logs by id
*/
router.get("/:id", validateJWT, async (req, res) => {
    const logId = req.params.id
    const userId = req.user.id

    const query = {
        where: {
            id: logId,
            owner_id: userId
        }
    }

    try {
        let userLogs = await LogModel.findOne(query)
        if (userLogs) {
            res.status(200).json(userLogs)
        } else {
            res.status(404).json({
                message: 'Log Id not found'
            })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


router.get('/practice', validateJWT, (req, res) => {
    res.send('Practice route!')
})

router.get('/about', (req, res) => {
    res.send('The About route!')
})

module.exports = router