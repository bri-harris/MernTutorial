const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');

//set up routes, chain dif http methods we want to provide for the same route,
//a get req or post can be made to the same route w/ a dif result for each
router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

//parameter directly in URL, a get req
router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;
