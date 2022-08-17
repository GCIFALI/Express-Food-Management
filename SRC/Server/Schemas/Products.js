const mongoose = require('mongoose')

const schema = mongoose.Schema({
    UserSerial:{type:String,default:null},
    ProductName:String,
    ExpirationDate:Date,
    Status:{type:Number,default:0}
})

let Product = mongoose.model('Products', schema)

module.exports = Product