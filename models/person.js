const mongoose = require('mongoose')


const url = process.env.MONGODB_URI

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

personSchema.statics.format = function (person) {
    return {
        id: person._id,
        name: person.name,
        number: person.number
    }
}
const Person = mongoose.model('Person', personSchema)

module.exports = Person