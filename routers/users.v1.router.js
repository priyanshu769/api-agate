const express = require("express")
const router = express.Router()
const { extend } = require("lodash")

// Model
const { User } = require("../models/users.model.js")

router.route("/")
    .get(async (req, res) => {
        try {
            const users = await User.find({})
            res.json({ success: true, users })
        } catch (error) {
            res.json({ success: false, message: "Users fetch failed", errorMessage: error.message })
        }
    })
    .post(async (req, res) => {
        try {
            const saveUser = req.body
            const userToSave = new User(saveUser)
            const userSaved = await userToSave.save()
            res.json({ success: true, userToSave })
        } catch (error) {
            res.json({ success: false, message: "Unable to save User", errorMessage: error.message })
        }
    })

router.param("id", async (req, res, next, id) => {
    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ success: false, message: "error getting user" })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(400).json({ success: false, message: "error while retrieving user" })
    }
})

router.route("/:id")
    .get((req, res) => {
        let { user } = req
        user.__v = undefined
        res.json({ success: true, user })
    })
    .post(async(req, res) => {
        const updateUser = req.body
        let {user} = req

        user = extend(user, updateUser)
        user = await user.save()
        res.send({success: true, user})
    })

module.exports = router