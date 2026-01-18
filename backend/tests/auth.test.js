import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import connectDB, { disconnectDB } from '../config/db.js';

let app;
let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongoServer.getUri();
  process.env.JWT_SECRET = 'test-secret';

  // Connect mongoose
  await connectDB();

  // Import app after DB is ready
  const serverModule = await import('../server.js');
  app = serverModule.default;
});

afterAll(async () => {
  // Disconnect mongoose and stop in-memory server
  await disconnectDB();
  if (mongoServer) await mongoServer.stop();
});

afterEach(async () => {
  // Clear all collections
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe('Auth API', () => {
  test('Register -> should create user and return token (201)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test.user@example.com',
        password: 'Password123',
      })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.user).toHaveProperty('email', 'test.user@example.com');
    // password should not exist in response
    expect(res.body.data.user).not.toHaveProperty('password');
  });

  test('Login -> should return token for valid credentials (200)', async () => {
    // create user first
    await request(app).post('/api/auth/register').send({
      name: 'Login User',
      email: 'login.user@example.com',
      password: 'Password123',
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login.user@example.com', password: 'Password123' })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
  });

  test('Protected -> should return 401 when no token provided', async () => {
    const res = await request(app).get('/api/auth/me').expect(401);
    expect(res.body.success).toBe(false);
  });

  test('Protected -> should return 200 with valid token', async () => {
    // register and login to get token
    await request(app).post('/api/auth/register').send({
      name: 'Protected User',
      email: 'protected.user@example.com',
      password: 'Password123',
    });

    const login = await request(app).post('/api/auth/login').send({
      email: 'protected.user@example.com',
      password: 'Password123',
    });

    const token = login.body.data.token;

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.user).toHaveProperty('email', 'protected.user@example.com');
  });

  test('Invalid token -> should return 401', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalid.token.here')
      .expect(401);

    expect(res.body.success).toBe(false);
  });
});
