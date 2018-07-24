var express = require("express")
var router = express.Router()

import { sequelize, Op } from "../sequelize"
import { userInfo } from "os"

router.use("/leech", require(__dirname + "/leech"))

//Test DB connection
sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.")
	})
	.catch(err => {
		console.error("Unable to connect to the database:", err)
	})

/* GET home page. */
router.get("/", function(req, res) {
	res.render("index", { title: "Express" })
})

module.exports = router
