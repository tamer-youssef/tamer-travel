const express = require('express');
const router = express.Router();
const connection = require('./mysql')

// GET all countries
router.get("/countries", function(req, res) {
    connection.query("SELECT * FROM countries", (err, result) => {
        if (err) throw err
        else {res.send(result)}
    })
})

// GET country (by name)
router.get("/countries/name/:name", function(req, res) {
    let countryName = req.params.name
    connection.query("SELECT * FROM countries WHERE name = ?", countryName, (err, result) => {
        if (err) throw err;
        else {res.send(result)}
    })
})

// GET country (by budget)
router.get("/countries/budget/:budget", function(req, res) {
    let countryBudget = req.params.budget
    connection.query("SELECT * FROM countries WHERE budget < ?", countryBudget, (err, result) => {
        if (err) throw err;
        else {res.send(result)}
    })
})

// POST country
router.post("/countries", function(req, res) {

    let countryName = req.body.name
    let countryDescription = req.body.description
    let countryNationality = req.body.nationality
    let countryCurrency = req.body.currency
    let countryLatitude = req.body.latitude
    let countryLongitude = req.body.longitude
    let countryBudget = req.body.budget

    connection.query("INSERT INTO countries (name, description, nationality, currency, latitude, longitude, budget) values (?, ?, ?, ?, ?, ?, ?)", 
    [countryName, countryDescription, countryNationality, countryCurrency, countryLatitude, countryLongitude, countryBudget],
    (err, result) => {
        if (err) throw err;
        else {res.send(result)}
    })
})

// PUT existing country data
router.put("/countries/:name", function(req, res) {
    let countryName = req.params.name
    let updateFields = {}
    if (req.body.description) {
        updateFields.description = req.body.description
    }
    if (req.body.nationality) {
        updateFields.nationality = req.body.nationality
    }
    if (req.body.currency) {
        updateFields.currency = req.body.currency
    }
    if (req.body.latitude) {
        updateFields.latitude = req.body.latitude
    }
    if (req.body.longitude) {
        updateFields.longitude = req.body.longitude
    }
    if (req.body.budget) {
        updateFields.budget = req.body.budget
    }
    connection.query("UPDATE countries SET ? WHERE name = ?", [updateFields, countryName], (err, result) => {
        if (err) throw err;
        else {res.send(result)}
    })
})

// DELETE country (by name)
router.delete("/countries/:name", function(req, res) {
    let countryName = req.params.name
    connection.query("DELETE FROM countries WHERE name = ?", countryName, (err, result) => {
        if (err) throw err;
        else {res.send({error: false, data: result})}
    })
})

module.exports = router;