import express from "express"
const router = express.Router()
import { SUCCESS, FAILED } from "../constants"
import request from "request"
import cheerio from "cheerio"

router.get("/", async (req, res) => {
	var options = {
		url:
			"http://phim14.net/xem-phim/ban-cung-la-nguoi_are-you-human-too.9257.298264.html"
	}
	//request lấy body của link
	request(options, function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			// khai báo cheerio để sử dụng jquery server
			const $ = cheerio.load(body)
			let arrServer = []
			$("#server_list .server_item").each(function() {
				var arrEpi = []
				$(this)
					.find(".episode_list li")
					.each(function() {
						arrEpi.push({
							number: $(this).text(),
							url: $(this)
								.find("a")
								.attr("href")
						})
					})
				console.log("arrEpi :", arrEpi)
				var serverName = $(this)
					.find("strong")
					.text()
					.replace(":", "")
					.trim()
					.toLocaleLowerCase()
				if (serverName.indexOf("hot") !== -1) {
					arrServer.push({
						arrServer: serverName,
						epis: arrEpi
					})
				}
			})
			console.log("arrServer :", arrServer)
		}
	})
})

router.get("/link", async (req, res) => {
	let url = "http://www.thaiwater.net/DATA/REPORT/php/scada.php"
	//request lấy body của link
	request.get(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			// khai báo cheerio để sử dụng jquery server
			const $ = cheerio.load(body)
			// console.log("title", $("#table10 .style_big_bu a").text())
			// console.log(
			// 	"href :",
			// 	"http://www.thaiwater.net" +
			// 		$("#table10 .style_big_bu a")
			// 			.attr("onclick")
			// 			.replace("open_graph('", "")
			// 			.replace("')", "")
			// )
			$("table").each(function() {
				let arrTable = []
				$(this)
					.find(".style_big_bu a")
					.each(function() {
						let title = $(this).text()
						let href =
							"http://www.thaiwater.net" +
							$(this)
								.attr("onclick")
								.replace(`open_graph('`, "")
								.replace(`')`, "")
						let table = {
							title: title,
							href: href
						}
						arrTable.push(table)
					})
				console.log(
					$(this)
						.find("tr")
						.attr("bgcolor")
				)
				// console.log("arrTable :", arrTable)
			})
		}
	})
})

module.exports = router
