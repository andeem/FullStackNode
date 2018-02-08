const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Martti Tienari',
        number: '040-123456'
    },
    {
        id: 3,
        name: 'Arto Järvinen',
        number: '040-123456'
    },
    {
        id: 4,
        name: 'Lea Kutvonen',
        number: '040-123456'
    }
]

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body
    if (!(newPerson.name)) {
        res.status(404).json({ error: 'name must be defined' })
    } else if (!(newPerson.number)) {
        res.status(404).json({ error: 'number must be defined' })
    } else if (persons.find(person => person.name === newPerson.name)) {
        res.status(404).json({ error: 'name must be unique' })
    } else {
        newPerson.id = Math.floor(Math.random() * 10000)
        persons = persons.concat(newPerson)
        res.json(newPerson)
    }

})

app.get('/info', (req, res) => {
    res.send(`puhelinluettelossa ${persons.length} henkilön tiedot<br/>${new Date()}`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`servu juoksee portissa ${PORT}`)
})