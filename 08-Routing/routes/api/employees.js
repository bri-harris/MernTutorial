const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json'); //kind of like connecting to a database

//set up routes, chain dif http methods we want to provide for the same route,
//a get req or post can be made to the same route w/ a dif result for each
router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .delete((req, res) => {
        res.json({
            "id": req.body.id
        })
    });

//parameter directly in URL, a get req
router.route('/:id')
    .get((req, res)=>{
        res.json({"id":req.params.id});
    });

module.exports = router;
