const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

    }catch (err) {
      console.error(err);
    } 
}

module.exports = connectDB;