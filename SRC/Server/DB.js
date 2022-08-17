const mongoose = require('mongoose')

const connection = async () => {
    const atlas = await mongoose.connect('mongodb+srv://root:root@cluster0.ifchwmf.mongodb.net/AT2022')
}

module.exports = connection