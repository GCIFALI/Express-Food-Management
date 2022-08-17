const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 8080

app.set('views', path.join(__dirname, './Views'));

app.use(express.static('./assets'))

app.use(express.urlencoded({ extended: false }))

module.exports = { app, port }