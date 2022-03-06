const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const { v4 } = require("uuid")
const app = express()
const config = require("../config/config.js")

app.use(express.json())

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let CONTACTS = [{ id: v4(), name: 'John', value: '+2183833283', marked: false }]

// GET
app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS)
  }, 1000)
})

// POST
app.post('/api/contacts', (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false }
  CONTACTS.push(contact)
  res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter((c) => c.id !== req.params.id)
  res.status(200).json({ message: 'The contact has been deleted(' })
})

// PUT
app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex((c) => c.id == req.params.id)
  CONTACTS[idx] = req.body
  res.json(CONTACTS[idx])
})

app.use(express.static(path.resolve(__dirname, '../../client/dist/')))

app.listen(process.env.PORT || config.port,
    () => console.log('Server has been started on port 3000...')
)
