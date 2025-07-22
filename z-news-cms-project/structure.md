## File Structure

```jsx
root/
├── 📂 public/
│   ├── 📂 css/
│   │   ├── bootstrap.min.css
│   │   ├── font-awesome.css
│   │   └── style.css
│   ├── 📂 fonts/
│   │   ├── ... ... ...
│   │   ├── ... ... ...
│   │   └── FontAwesome.otf
│   ├── 📂 images/
│   │   └── news.jpg
│   ├── 📂 js/
│   │   └── summernote-bs5.js
│   └── 📂 uploads/
│       ├── ... ... .jpg
│       └── ... ... .png
│
│
├── 📂 src/
│   ├── 📂 config/ 
│   │   └── 🛠️ index.js
│   │
│   ├── 📂 connection/
│   │   └── 🗃️ dbConnection.js
│   │
│   ├── 📂 controllers/
│   │   ├── 📂 admin/ 🛡️
│   │   │   ├── 📝 article.controller.js
│   │   │   ├── 🗂️ category.controller.js
│   │   │   ├── 💬 comment.controller.js
│   │   │   └── 👥 user.controller.js
│   │   │
│   │   └── 🌐 clientSite.controller.js
│   │
│   ├── 📂 middleware/
│   │   ├── 🛡️ isAdmin.js
│   │   ├── 🔑 isLogin.js
│   │   ├── 🔑 loadCommonData.js
│   │   ├── 📸 multer.js
│   │   └── 🔑 validation.js
│   │
│   ├── 📂 models/
│   │   ├── 🗂️ category.model.js
│   │   ├── 💬 comment.model.js
│   │   ├── 📝 news.model.js
│   │   ├── ⚙️ setting.model.js
│   │   └── 👥 user.model.js
│   │
│   ├── 📂 routes/
│   │   ├── 🛡️ admin.routes.js
│   │   └── 🌐 frontend.routes.js
│   │
│   ├── 📂 views/
│   │   ├── 📂 admin/
│   │   │   ├── 📂 articles/
│   │   │   │   ├── create.ejs
│   │   │   │   ├── index.ejs
│   │   │   │   └── update.ejs
│   │   │   │
│   │   │   ├── 📂 categories/
│   │   │   │   ├── create.ejs
│   │   │   │   ├── index.ejs
│   │   │   │   └── update.ejs
│   │   │   │
│   │   │   ├── 📂 comments/
│   │   │   │   └── index.ejs
│   │   │   │
│   │   │   ├── 📂 error/
│   │   │   │   ├── 401.ejs
│   │   │   │   ├── 404.ejs
│   │   │   │   └── 500.ejs
│   │   │   │
│   │   │   ├── 📂 partials/
│   │   │   │   └── error.ejs
│   │   │   │
│   │   │   ├── 📂 users/
│   │   │   │   ├── create.ejs
│   │   │   │   ├── index.ejs
│   │   │   │   └── update.ejs
│   │   │   │
│   │   │   ├── 📊 dashboard.ejs
│   │   │   ├── 🏗️ layout.ejs
│   │   │   ├── 🔑 login.ejs
│   │   │   └── ⚙️ settings.ejs
│   │   │
│   │   ├── 📂 partials/
│   │   │   ├── loop.ejs
│   │   │   └── sidebar.ejs
│   │   │
│   │   ├── ❌ 404.ejs
│   │   ├── ✍️ author.ejs
│   │   ├── 🗂️ category.ejs
│   │   ├── 🚫 errors.ejs
│   │   ├── 🏠 index.ejs
│   │   ├── 🏗️ layout.ejs
│   │   ├── 🔍 search.ejs
│   │   └── 📄 single.ejs
│   │
│   └── ⚙️ app.js
|   
├── 🔒 .env
├── 📦 package.json
├── 📖 README.md
├── 🏛️ structure.md
└── 🔐 yarn.lock
```
