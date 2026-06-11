const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_STRING, {
      // Mongoose 6+ automatically handles options like useNewUrlParser and useUnifiedTopology
    });

    console.log(`MongoDB Connected: ${conn.connection.host} (Database: MovieAPI)`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure code
    process.exit(1);
  }
};

module.exports = connectDB;