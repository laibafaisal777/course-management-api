
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is missing from the .env file');
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 10000,
    });

    console.log('MongoDB Connected Successfully!');
    console.log(`Database Host: ${conn.connection.host}`);

    return conn;
  } catch (error) {
    console.error('\n===== MONGODB CONNECTION ERROR =====');
    console.error('Message:', error.message);
    console.error('Code:', error.code || 'Not provided');

    if (error.reason) {
      console.error('Reason:', error.reason);
    }

    if (error.cause) {
      console.error('Cause:', error.cause);
    }

    console.error('===================================\n');

    throw error;
  }
};

module.exports = connectDB;
