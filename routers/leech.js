import express from "express"
const router = express.Router()
import { SUCCESS, FAILED } from "../constants"
import request from "request"
import cheerio from "cheerio"
import axios from 'axios';


router.get("/main", async (req, res) => {
	let url = "http://www.thaiwater.net/DATA/REPORT/php/scada.php"
	//request lấy body của link
	request.get(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// khai báo cheerio để sử dụng jquery server
			const $ = cheerio.load(body)
			let arrTable = []
			$("table tbody tr").each(function () {
				let table = {}

				$(this)
					.find(".style_big_bu")
					.each(function (e) {
						let location = $(this).text().trim()
						let href = $(this).find("a").attr("onclick")

						if ($(this).find("a").attr("onclick")) {
							href = "http://www.thaiwater.net" + href.replace(`open_graph('`, "").replace(`')`, "")
						}

						table.location = location
						table.href = href
						arrTable.push(table)
					})

			})
			res.json({
				arrTable
			});

		}
	})
})

router.get("/mun_scada", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/mun_scada/mun_scada.php?lang='
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()



				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find(".style_r_bank").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").find("strong").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})

				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}


				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/upper_scada", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/mun_scada/mun_upper_scada.php?lang='
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()


				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find("tr:last-child").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})

				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}


				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/pakmun", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/pakmun/pakmun.php?lang='
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()


				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find(".style_r_bank").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").find("strong").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})

				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}


				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1 && i !== 6) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/phet_scada", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/phet_scada/phet_scada.php?lang='
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()



				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find(".style_r_bank").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").find("strong").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})
				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}

				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1 && i != 13) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/maeklong", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/maeklong/maeklong.php?lang='
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()


				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find(".style_r_bank").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").find("strong").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})
				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}

				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1 && i != 14) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/bhumibol", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/egat_tele/bhumibol/bhumibol.php'
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()


				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find(".style_r_bank").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").find("strong").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})
				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}

				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1 && i != 9) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/sirikit", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/egat_tele/sirikit/sirikit.php'
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()


				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find(".style_r_bank").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").find("strong").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})
				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}

				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1 && i != 12) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/ubolratana", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/egat_tele/ubolratana/ubolratana.php'
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()


				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find(".style_r_bank").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").find("strong").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})
				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}

				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1 && i != 11) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/rid_pk1", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/rid_pk1.php?lang='
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()


				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find(".style_r_bank").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").find("strong").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})
				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}

				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/bpk_scada", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/bpk_scada/bpk_scada.php?lang='
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()


				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find(".style_r_bank").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").find("strong").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})
				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}

				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1 && i != 11) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/lampao_scada", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/lampao_scada/lampao_scada.php?lang='
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()


				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find(".style_r_bank").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").find("strong").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})
				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}

				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1 && i != 11) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/chanthaburi_scada", async (req, res) => {
	let url = 'http://www.thaiwater.net/DATA/REPORT/php/chanthaburi_scada/chanthaburi_scada.php?lang='
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(body)

			let objTableLocation = {};
			let i = 0;
			$("table tbody").each(function (a) {

				let link = $(this).find(".modal").attr("href")
				let location = $(this).find(".style_big_bu").text().trim()

				let news = $(this).find("tr:nth-child(2)").find("td:first-child").text().replace(" :", "").trim()
				let newsTime = $(this).find("tr:nth-child(2)").find("td:nth-child(2)").text().trim()


				let arrTableOfRain = []
				$(this).find("tr").each(function (e) {

					if (e >= 2) {
						let rain = $(this).find(`td:first-child`).find("a").text().replace(":", "").trim()
						let rainLink = $(this).find(`td:first-child`).find("a").attr("href")
						let numberCount = $(this).find("td:nth-child(2)").find("strong").text().trim()
						let unit = $(this).find("td:nth-child(3)").text().trim()

						if (rainLink) {
							let tableOfRain = {
								rain: rain,
								rainLink: rainLink,
								numberCount: numberCount,
								unit: unit,
							}
							arrTableOfRain.push(tableOfRain)
						}
					}
				})

				let arrTableMbar = []
				$(this).find(".style_r_bank").each(function (e) {
					let mbar = $(this).find(`td:first-child`).text().replace(":", "").trim()
					let leftMbar = $(this).find("td:nth-child(2)").text().trim()
					let valueLeftMbar = $(this).find("td:nth-child(3)").find("strong").text().trim()
					let rightMbar = $(this).find("td:nth-child(4)").text().trim()
					let valueRightMbar = $(this).find("td:nth-child(5)").text().trim()


					let tableMbar = {
						mbar: mbar,
						leftMbar: leftMbar,
						valueLeftMbar: valueLeftMbar,
						rightMbar: rightMbar,
						valueRightMbar: valueRightMbar
					}
					arrTableMbar.push(tableMbar)

				})
				let tableLocation = {
					location: location,
					link: link,
					news: news,
					newsTime: newsTime,
					arrTableOfRain: arrTableOfRain,
					arrTableMbar: arrTableMbar
				}

				if (tableLocation.location.trim().length != 0) {
					i = i + 1
					if (i > 1 && i != 11) objTableLocation[`key ${i}`] = tableLocation;
				}

			})
			res.json({
				objTableLocation
			});
		}
	});
})

router.get("/test", async (req, res) => {
	try {

		const data = await axios.get('http://www.thaiwater.net/v3/json/telemetering/wl/warning')
		} catch (error) {
			throw error
		}

})

module.exports = router
