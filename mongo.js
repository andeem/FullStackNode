const mongoose = require('mongoose')

const user = ''
const pass = ''
const url = `mongodb://${user}:${pass}@ds229008.mlab.com:29008/puhelinluettelo`

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: Number
})



if (process.argv.length === 4) {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })

    person
    .save()
    .then(response => {
        console.log(`lisätään henkilä ${person.name} numero ${person.number} luetteloon`)
        mongoose.connection.close()
    })
} else {
    Person
    .find({name: 'eiloyvy'})
    .then(result => {
        console.log('puhelinluettelo:')
        console.log(result)
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
