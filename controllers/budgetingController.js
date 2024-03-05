const express = require('express')

function validateForm(req, res, next){
    if(!req.body.item_name || !req.body.amount || !req.body.from || !req.body.category || !req.body.date)
        res.status(400).json({message: "Invalid Inputs"})
    else next()
}

const transactions = express.Router()

let transactionsArray = require('../models/transaction.model.js')

// see all transactions
transactions.get('/', (req, res) => {
    res.json({ transactions: transactionsArray })
})

// get single transaction
transactions.get('/:id', (req, res) => {
    const { id } = req.params
    const transaction = transactionsArray.find((transaction) => transaction.id === +id)
    res.json({ transaction })
})

// create a new transaction

transactions.post('/', validateForm, (req, res) => {
    const newId = transactionsArray.length > 0 ? Math.max(...transactionsArray.map(transac => transac.id)) + 1  : 1;
    req.body.id = newId;
    transactionsArray.push(req.body);
    res.json({ transactions: transactionsArray });
});

// update a single transaction
transactions.put("/:id", (req, res) => {
    const { id } = req.params
    const transactionIndex = transactionsArray.findIndex((log) => log.id === +id)
    if (transactionIndex > -1) transactionsArray[transactionIndex] = req.body
    res.json({ transactions: transactionsArray })
})

// delete a single transaction
transactions.delete("/:id", (req, res) => {
    const { id } = req.params
    transactionsArray = transactionsArray.filter((transaction) => transaction.id !== +id)
    res.json({ transactions: transactionsArray })
})

module.exports = transactions