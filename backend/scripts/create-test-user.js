/**
 * Script to create a test user in the database
 * Run with: node scripts/create-test-user.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

// Load environment variables
dotenv.config();

const createTestUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create test users
    const users = [
      {
        name: 'Ahmed Ali',
        email: 'ahmed@example.com',
        age: 25,
        bio: 'Software Developer',
      },
      {
        name: 'Sara Mohamed',
        email: 'sara@example.com',
        age: 28,
        bio: 'Frontend Developer',
      },
      {
        name: 'Mohamed Hassan',
        email: 'mohamed@example.com',
        age: 30,
        bio: 'Full Stack Developer',
      },
    ];

    // Clear existing users (optional)
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users:`);
    
    createdUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createTestUser();
