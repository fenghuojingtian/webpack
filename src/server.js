const express = require('express')
const app = express()
const fs = require('fs')
const dir = './server'

const list = fs.readdirSync(dir).map((v) => {
	require(dir + '/' + v)(app)
})

app.listen('9092')