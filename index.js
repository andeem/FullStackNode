const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(bodyParser.json())
morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(express.static('build'))



let persons = [

]

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(response => {
            res.json(response.map(Person.format))
        })
        .catch(error => console.log(error))
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(Person.format(person))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).end()
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(response => {
            res.status(204).end()
        })
        .catch(error => {
            console.log(error)
            res.status(400).end()
        })
})

app.put('/api/persons/:id', (req, res) => {
    const person = req.body
    Person
        .findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updated => {
            res.json(Person.format(updated))
        })
        .catch(error => {
            console.log(error)
            res.status(400).end()
        })
})

app.post('/api/persons', (req, res) => {
    const newPerson = new Person(req.body)
    if (!(newPerson.name)) {
        res.status(400).json({ error: 'name must be defined' })
    } else if (!(newPerson.number)) {
        res.status(400).json({ error: 'number must be defined' })
    } else {
        Person
            .find({ name: newPerson.name })
            .then(result => {
                if (result) {
                    res.status(400).json({ error: 'name must be unique' })
                } else {
                    newPerson
                        .save()
                        .then(result => {
                            res.json(Person.format(result))
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(400).end()
                        })
                }
            })


    }

})

app.get('/info', (req, res) => {
    Person
        .count()
        .then(count => {
            res.send(`puhelinluettelossa ${count} henkilön tiedot<br/>${new Date()}`)
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`servu juoksee portissa ${PORT}`)
})