// Dependencies
const express = require('express')
const cors = require('cors')

// Configuration
const app = express()

// Middleware for controllers
app.use(cors())
app.use(express.json())

const budgetingContoller = require('./controllers/budgetingController.js')

app.use('/api/transactions', budgetingContoller)

app.get('/', (req, res) => {
    res.send('Welcome to Budgeting App')
})

// 404 PAGE
app.get('*', (req, res) => {
    res.json({ error: 'Page not found' })
})

// Export
module.exports = app














