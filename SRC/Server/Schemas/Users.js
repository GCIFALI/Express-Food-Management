const mongoose = require('mongoose')

const schema = mongoose.Schema({
    serial: {type:String,default:null},
    name: String,
    email: String,
    password: String
})

let Users = mongoose.model('Users', schema)

module.exports = Users