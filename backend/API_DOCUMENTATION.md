# 📚 API Documentation - Authentication

**المطور:** يسرا زياد - مهندسة برمجيات  
**التاريخ:** 2024-01-12  
**الإصدار:** 1.0.0

---

## 📋 الفهرس

1. [نظرة عامة](#نظرة-عامة)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [Endpoints](#endpoints)
5. [Response Format](#response-format)
6. [Error Handling](#error-handling)
7. [Swagger Documentation](#swagger-documentation)
8. [Postman Collection](#postman-collection)

---

## 🎯 نظرة عامة

API Authentication يوفر:
- ✅ تسجيل مستخدم جديد مع تشفير كلمة المرور
- ✅ تسجيل دخول مع JWT Token
- ✅ الحصول على بيانات المستخدم الحالي
- ✅ حماية المسارات بـ JWT Middleware
- ✅ Validation للبيانات المدخلة

---

## 🌐 Base URL

```
http://localhost:5000
```

---

## 🔐 Authentication

### JWT Token

جميع المسارات المحمية تتطلب JWT Token في Authorization header:

```
Authorization: Bearer {token}
```

### الحصول على Token

1. **Register:** Token يتم إرجاعه تلقائياً عند التسجيل
2. **Login:** Token يتم إرجاعه عند تسجيل الدخول الناجح

### Token Expiration

- **Default:** 7 days
- **Configurable:** عبر متغير البيئة `JWT_EXPIRES_IN`

---

## 📡 Endpoints

### 1. Register User

**Endpoint:** `POST /api/auth/register`

**Description:** تسجيل مستخدم جديد

**Access:** Public

**Request Body:**
```json
{
  "name": "Ahmed Ali",
  "email": "ahmed.ali@example.com",
  "password": "Ahmed12345",
  "age": 25,
  "bio": "Software Developer"
}
```

**Required Fields:**
- `name` (string, min 3 characters)
- `email` (string, valid email format, unique)
- `password` (string, min 8 characters, must contain uppercase, lowercase, and number)

**Optional Fields:**
- `age` (number, positive)
- `bio` (string, max 500 characters)

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "6964be968d0b27dd7272c643",
      "name": "Ahmed Ali",
      "email": "ahmed.ali@example.com",
      "age": 25,
      "bio": "Software Developer",
      "role": "user",
      "createdAt": "2024-01-12T09:27:50.246Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully",
  "status": 201
}
```

**Error Responses:**
- `400` - Validation error
- `409` - Email already exists

---

### 2. Login

**Endpoint:** `POST /api/auth/login`

**Description:** تسجيل دخول المستخدم

**Access:** Public

**Request Body:**
```json
{
  "email": "ahmed.ali@example.com",
  "password": "Ahmed12345"
}
```

**Required Fields:**
- `email` (string, valid email format)
- `password` (string)

**Note:** حقل `email` يقبل email أو username أو phone number (inputname="email")

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "6964be968d0b27dd7272c643",
      "name": "Ahmed Ali",
      "email": "ahmed.ali@example.com",
      "age": 25,
      "bio": "Software Developer",
      "role": "user",
      "createdAt": "2024-01-12T09:27:50.246Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful",
  "status": 200
}
```

**Error Responses:**
- `400` - Validation error
- `401` - Invalid email or password
- `403` - Account is deactivated

---

### 3. Get Current User

**Endpoint:** `GET /api/auth/me`

**Description:** الحصول على بيانات المستخدم الحالي

**Access:** Private (requires JWT token)

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "6964be968d0b27dd7272c643",
      "name": "Ahmed Ali",
      "email": "ahmed.ali@example.com",
      "age": 25,
      "bio": "Software Developer",
      "role": "user",
      "createdAt": "2024-01-12T09:27:50.246Z",
      "updatedAt": "2024-01-12T09:27:50.246Z"
    }
  },
  "message": "User profile retrieved successfully",
  "status": 200
}
```

**Error Responses:**
- `401` - Not authorized (missing or invalid token)
- `404` - User not found
- `403` - Account is deactivated

---

## 📝 Response Format

### Success Response

جميع الاستجابات الناجحة تتبع نفس التنسيق:

```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "status": 200
}
```

### Error Response

جميع الاستجابات الخاطئة تتبع نفس التنسيق:

```json
{
  "success": false,
  "data": null,
  "message": "Error message",
  "status": 400,
  "errors": []
}
```

---

## ⚠️ Error Handling

### Validation Errors (400)

```json
{
  "success": false,
  "data": null,
  "message": "Validation Error",
  "status": 400,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters long"
    }
  ]
}
```

### Unauthorized (401)

```json
{
  "success": false,
  "data": null,
  "message": "Invalid email or password",
  "status": 401
}
```

### Forbidden (403)

```json
{
  "success": false,
  "data": null,
  "message": "Account is deactivated",
  "status": 403
}
```

### Not Found (404)

```json
{
  "success": false,
  "data": null,
  "message": "User not found",
  "status": 404
}
```

### Conflict (409)

```json
{
  "success": false,
  "data": null,
  "message": "User with this email already exists",
  "status": 409
}
```

---

## 📖 Swagger Documentation

### الوصول إلى Swagger UI

افتح المتصفح على:
```
http://localhost:5000/api/docs
```

### الملف

- **الموقع:** `doc/auth-openapi.yaml`
- **التنسيق:** OpenAPI 3.0

### الميزات

- ✅ تفاصيل كاملة لجميع Endpoints
- ✅ أمثلة Request/Response
- ✅ تجربة API مباشرة من المتصفح
- ✅ Authentication testing

---

## 📬 Postman Collection

### الملف

- **الموقع:** `doc/postman_auth_collection.json`
- **التقرير:** `doc/POSTMAN_TESTING_REPORT.md`

### الاستيراد

1. افتح Postman
2. اضغط **Import**
3. اختر ملف `postman_auth_collection.json`
4. اضغط **Import**

### المتغيرات المطلوبة

| Variable | Value |
|----------|-------|
| `baseUrl` | `http://localhost:5000` |
| `token` | (يتم ملؤه تلقائياً) |

### الاختبارات المتوفرة

1. ✅ Register User
2. ✅ Login
3. ✅ Login - Invalid Email
4. ✅ Login - Wrong Password
5. ✅ Get Current User (Protected)
6. ✅ Get Current User - No Token
7. ✅ Get Current User - Invalid Token

### Automated Tests

- التحقق من Status Code
- التحقق من وجود Token
- التحقق من بيانات المستخدم
- حفظ Token تلقائياً

---

## 🔧 Code Documentation

### JSDoc Comments

جميع الملفات تحتوي على توثيق JSDoc كامل:

- `controllers/auth.controller.js` - Controllers documentation
- `services/auth.service.js` - Services documentation
- `middleware/auth.js` - Middleware documentation

### مثال

```javascript
/**
 * Login user
 * @route POST /api/auth/login
 * @access Public
 * @param {Object} req.body - User login credentials
 * @param {string} req.body.email - User email (required, valid email format)
 * @param {string} req.body.password - User password (required)
 * @returns {Object} 200 - Login successful with JWT token
 * @returns {Object} 400 - Validation error
 * @returns {Object} 401 - Invalid email or password
 */
```

---

## ✅ Checklist

- [x] API Documentation كامل
- [x] Swagger Documentation محدث
- [x] Postman Collection جاهز
- [x] تقرير اختبار Postman
- [x] Code Documentation (JSDoc)
- [x] إضافة اسم المطور (يسرا زياد)

---

## 📞 الدعم

للمزيد من المعلومات:
- راجع `README.md`
- راجع `POSTMAN_TESTING_REPORT.md`
- افتح Swagger UI: `http://localhost:5000/api/docs`

---

**المطور:** يسرا زياد - مهندسة برمجيات  
**التاريخ:** 2024-01-12
