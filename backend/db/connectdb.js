const mongoose = require('mongoose')

const connectdb = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongodb connected")
    })
    .catch((err) => {
        console.log('failed',err)
    })
}

module.exports = {connectdb}