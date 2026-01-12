import mongoose from 'mongoose';

/**
 * Connect to MongoDB Database
 * Validates environment variables before attempting connection
 * Handles connection errors gracefully
 */
const connectDB = async () => {
  // Validate environment variables
  if (!process.env.MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in environment variables');
    console.error('Please check your .env file and ensure MONGODB_URI is set');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connected');
  } catch (error) {
    // Handle different types of connection errors
    if (error.message.includes('authentication failed')) {
      console.error('❌ Error: MongoDB authentication failed. Please check your username and password.');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('❌ Error: Could not connect to MongoDB. Please ensure MongoDB is running.');
    } else if (error.message.includes('timeout')) {
      console.error('❌ Error: Connection timeout. Please check your network connection.');
    } else {
      console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    }
    process.exit(1);
  }
};

/**
 * Gracefully close MongoDB connection
 */
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error(`Error closing MongoDB connection: ${error.message}`);
  }
};

export default connectDB;
export { disconnectDB };
