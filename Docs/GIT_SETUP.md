# 🔧 إعداد Git و GitHub

## خطوات رفع المشروع على GitHub

### 1. تهيئة Git (إذا لم يكن موجوداً)
```bash
cd "d:\softintty\31-12\New folder\mern-cb01\backend"
git init
```

### 2. إضافة جميع الملفات
```bash
git add .
```

### 3. عمل Commit أولي
```bash
git commit -m "Initial commit: Backend setup with Node.js and Express

- Server setup with Express.js
- MongoDB connection configured
- Project structure (MVC pattern)
- Base Repository and Base Service
- Unified API Response handler
- Global Error Handler
- Health check endpoint (/api/status)
- Environment variables management
- Documentation updated"
```

### 4. إنشاء فرع develop
```bash
git checkout -b develop
```

### 5. إنشاء Repository على GitHub
1. اذهب إلى [GitHub](https://github.com)
2. اضغط على "New repository"
3. اختر اسم للمشروع (مثلاً: `mern-cb01-backend`)
4. لا تختار "Initialize with README" (لأننا لدينا ملفات بالفعل)
5. اضغط "Create repository"

### 6. إضافة Remote Repository
```bash
git remote add origin https://github.com/YOUR_USERNAME/mern-cb01-backend.git
```

### 7. Push إلى GitHub
```bash
# Push فرع develop
git push -u origin develop

# Push فرع main أيضاً (اختياري)
git checkout main
git merge develop
git push -u origin main
```

## ✅ التحقق من النجاح

بعد الرفع، تأكد من:
- [ ] جميع الملفات موجودة على GitHub
- [ ] ملف `.env` غير موجود (محمي في .gitignore)
- [ ] ملف `env.example` موجود
- [ ] README.md يظهر بشكل صحيح
- [ ] فرع `develop` موجود

## 📝 ملاحظات

- **لا ترفع ملف `.env`** - محمي في `.gitignore`
- استخدم `env.example` كدليل للمتغيرات المطلوبة
- تأكد من أن جميع البيانات الحساسة في `.env` فقط

## 🔄 العمل اليومي

```bash
# الانتقال لفرع develop
git checkout develop

# إضافة التغييرات
git add .

# عمل commit
git commit -m "Description of changes"

# Push التغييرات
git push origin develop
```
