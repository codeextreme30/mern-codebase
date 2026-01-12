# MERN CB01 Backend

Backend API for MERN Stack Application built with Node.js and Express.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp env.example .env
```

3. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mern-cb01
```

4. Start the server:
```bash
# For production
npm start

# For development (with watch mode)
npm run dev

# Or using nodemon (if installed)
npm run nodemon
```

The server will start on `http://localhost:5000`

### Verify Server Status

Test the health check endpoint:
```bash
curl http://localhost:5000/api/status
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                # MongoDB connection configuration
├── controllers/             # Request handlers
├── middleware/              # Custom middleware functions
├── models/                  # Mongoose models
├── repositories/            # Data access layer
│   └── base.repository.js   # Base repository with common CRUD operations
├── routes/                  # API routes
├── services/                # Business logic layer
│   └── base.service.js      # Base service with common operations
├── utils/                   # Utility functions
│   ├── response.js          # Unified API response handler
│   └── errorHandler.js      # Global error handler
├── server.js                # Main server file
├── .env                     # Environment variables (not in git)
├── env.example              # Example environment variables
├── package.json
└── README.md
```

## 🏗️ Architecture

The project follows a layered architecture:

- **Routes**: Define API endpoints
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Handle data access and database operations
- **Models**: Define database schemas

## 📝 API Response Format

All API responses follow a unified format:

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "status": 200
}
```

### Error Response
```json
{
  "success": false,
  "data": null,
  "message": "Error message",
  "status": 500,
  "errors": {}
}
```

## 🧪 Testing

Test the server status endpoint:
```bash
curl http://localhost:5000/api/status
```

Expected response: `200 OK` with server status information.

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **dotenv**: Environment variable management
- **cors**: Cross-origin resource sharing

## 🔧 Available Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with watch mode (Node.js built-in)
- `npm run nodemon`: Start development server with nodemon (requires nodemon installation)

## 🏭 Creating a New Module

To create a new module (e.g., `Product`), follow these steps:

### Step 1: Create the Model
Create `models/product.model.js`:
```javascript
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // ... other fields
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
```

### Step 2: Create the Repository
Create `repositories/product.repository.js`:
```javascript
import BaseRepository from './base.repository.js';
import Product from '../models/product.model.js';

class ProductRepository extends BaseRepository {
  constructor() {
    super(Product);
  }
  
  // Add custom methods if needed
  async findByCategory(category) {
    return await this.findAll({ category });
  }
}

export default ProductRepository;
```

### Step 3: Create the Service
Create `services/product.service.js`:
```javascript
import BaseService from './base.service.js';
import ProductRepository from '../repositories/product.repository.js';

class ProductService extends BaseService {
  constructor() {
    super(new ProductRepository());
  }
  
  // Add custom business logic if needed
  async getProductsByCategory(category) {
    return await this.repository.findByCategory(category);
  }
}

export default ProductService;
```

### Step 4: Create the Controller
Create `controllers/product.controller.js`:
```javascript
import ApiResponse from '../utils/response.js';
import ProductService from '../services/product.service.js';

const productService = new ProductService();

export const getAllProducts = async (req, res, next) => {
  try {
    const result = await productService.getAll({}, req.query);
    return ApiResponse.success(res, result, 'Products retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

// Add other controller methods...
```

### Step 5: Create the Routes
Create `routes/product.routes.js`:
```javascript
import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
```

### Step 6: Register Routes in server.js
```javascript
import productRoutes from './routes/product.routes.js';
app.use('/api/products', productRoutes);
```

### Naming Convention
Follow this naming pattern:
- **Model**: `[name].model.js` (e.g., `user.model.js`)
- **Repository**: `[name].repository.js` (e.g., `user.repository.js`)
- **Service**: `[name].service.js` (e.g., `user.service.js`)
- **Controller**: `[name].controller.js` (e.g., `user.controller.js`)
- **Routes**: `[name].routes.js` (e.g., `user.routes.js`)

### Example: User Module
See the complete example in:
- `models/user.model.js`
- `repositories/user.repository.js`
- `services/user.service.js`
- `controllers/user.controller.js`
- `routes/user.routes.js`

## ✅ Checklist

- ✅ Server runs successfully with `npm start` or `npm run dev`
- ✅ Database connection established (prints "Connected to MongoDB")
- ✅ Project structure follows MVC pattern
- ✅ Environment variables managed via `.env` file
- ✅ CORS middleware enabled for frontend requests
- ✅ Express JSON parser enabled
- ✅ Health check endpoint at `/api/status` returns 200 OK
- ✅ Global error handler implemented
- ✅ Code follows CamelCase naming convention
- ✅ README.md updated with setup instructions
- ✅ Example module (User) implemented
- ✅ Standardized API response format