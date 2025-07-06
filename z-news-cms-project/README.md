> 25 - June - 2025

# Blog Management System

A comprehensive blog management system with both frontend and admin panel functionalities, built with Node.js, Express, and EJS templates.

## System Architecture

### Backend System

- 🗄️ Express.js server setup
- 🔐 Authentication system (login, logout)
- 🗃️ Database connection (MongoDB)
- 🛡️ Role-based access control
  - Role wise article - read + update + delete
- 📝 Article management - CRUD
- 🗂️ Category management - CRUD
- 👥 User management - CRUD

### Frontend System

- 📋 Public-facing blog pages
- 🔓 Admin login interface
- ✅ Dashboard overview
- 📝 Article management UI
- 🗂️ Category management UI
- 👥 User management UI

## API Endpoints

### Frontend Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Home page with articles |
| `/search` | GET | Search articles |
| `/author/:name` | GET | Articles by author |
| `/single/:id` | GET | Single article view |
| `/single/:id` | POST | Add comment to article |
| `/category/:name` | GET | Articles by category |

### Admin Routes

#### Auth & Settings

| Route | Method | Description |
|-------|--------|-------------|
| `/admin/` | GET | Admin login page |
| `/admin/index` | POST | Admin login submission |
| `/admin/logout` | GET | Admin logout |
| `/admin/dashboard` | GET | Admin dashboard |
| `/admin/settings` | GET | System settings page |
| `/admin/save-settings` | POST | Save system settings |

#### User Management

| Route | Method | Description |
|-------|--------|-------------|
| `/admin/users` | GET | List all users |
| `/admin/add-user` | GET | Add user page |
| `/admin/add-user` | POST | Create new user |
| `/admin/update-user/:id` | GET | Edit user page |
| `/admin/update-user/:id` | POST | Update user |
| `/admin/delete-user/:id` | DELETE | Delete user |

#### Category Management

| Route | Method | Description |
|-------|--------|-------------|
| `/admin/category` | GET | List all categories |
| `/admin/add-category` | GET | Add category page |
| `/admin/add-category` | POST | Create new category |
| `/admin/update-category/:id` | GET | Edit category page |
| `/admin/update-category/:id` | POST | Update category |
| `/admin/delete-category/:id` | DELETE | Delete category |

#### Article Management

| Route | Method | Description |
|-------|--------|-------------|
| `/admin/articles` | GET | List all articles |
| `/admin/article/new` | GET | Add article page |
| `/admin/add-article` | POST | Create new article |
| `/admin/article/:id/edit` | GET | Edit article page |
| `/admin/updata-article/:id` | POST | Update article |
| `/admin/delete-article/:id` | DELETE | Delete article |

#### Comment Management

| Route | Method | Description |
|-------|--------|-------------|
| `/admin/comments` | GET | List all comments |

## Technical Details

### Middlewares

- `express.json()` - Parse JSON requests
- `express-ejs-layouts` - Layout support for EJS
- `cookie-parser` - Parse cookies
- `express.urlencoded` - Parse URL-encoded bodies
- `express.static` - Serve static files
- Custom middlewares for authentication (`isLogIn`, `isAdmin`)
- File upload handling with `multer`

### View Engine

- EJS templates with layout support
- Separate layouts for frontend and admin panel
- Views organized in hierarchical structure
