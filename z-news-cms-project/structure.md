## File Structure

```jsx
root/
├── 📂 public/
│   ├── 📂 css/
│   │   ├── bootstrap.min.css
│   │   ├── font-awesome.css
│   │   └── style.css
│   ├── 📂 fonts/
│   │   ├── fontawesome-webfont.eot
│   │   ├── fontawesome-webfont.svg
│   │   ├── fontawesome-webfont.ttf
│   │   ├── fontawesome-webfont.woff
│   │   ├── fontawesome-webfont.woff2
│   │   └── FontAwesome.otf
│   ├── 📂 images/
│   │   └── news.jpg
│   ├── 📂 js/
│   │   └── summernote-bs5.js
│   └── 📂 uploads/
│       ├── ... ... .jpg
│       └── ... ... .png
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
│   │   └── 📸 multer.js
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
│   │   │   └── sidebar.ejs
│   │   │
│   │   ├── ❌ 404.ejs
│   │   ├── ✍️ author.ejs
│   │   ├── 🗂️ category.ejs
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
