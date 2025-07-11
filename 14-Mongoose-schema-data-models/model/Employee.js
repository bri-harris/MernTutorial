const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//objectID is automatically created by mongoose
const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
})


//by default when mongoose creates the "Employee" model, it will set it to lowercase and plural, so will look for an "employees" collection in mongodb
module.exports = mongoose.model("Employee", employeeSchema);