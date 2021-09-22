const express = require('express');
const { reduce } = require('./models/budget');
const app = express()
const transactions = require("./models/budget")



app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
//Homepage
app.get("/", (req, res) => {
    res.render("homepage.ejs")
})
//Index Route
app.get("/budgets", (req, res) => {
    const bankAccount = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    res.render("index.ejs", {allTransactions: transactions, bankAccount: bankAccount})
})

//New Route
app.get("/budgets/new", (req, res) => {
    res.render("new.ejs",{model: transactions[0]})
})

//Create Route
app.post("/budgets", (req, res) => {
    req.body.amount = Number(req.body.amount)
    transactions.push(req.body)
    console.log(req.body)
    res.redirect("/budgets")
})

//Show Route
app.get("/budgets/:id", (req, res) => {
    res.render("show.ejs", { transaction: transactions[req.params.id] })
})

app.listen(3000, ()=> console.log("pinching pennies..."))