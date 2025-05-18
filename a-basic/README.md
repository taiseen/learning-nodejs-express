> 12 - April - 2025

# Leaning Nodejs + Express

- Basic Practicing || Experimenting

```js
npm run dev
```

## Learning Context:-

- request property & methods
- response property & methods
- app.use() - for get user sended data parse by middleware
- ejs template usage
  - ui
  - partial (reuse common file - a systemic way)
  
# API Routes Documentation

[localhost]: http://localhost:3000

| Route | Method | Parameters | Description |
|-------|--------|------------|-------------|
| [`/`][localhost] | GET | None | Returns "Hello World!" |
| [`/user`][localhost] | GET | None | Returns "Hello User!" |
| [`/user/:userid`][localhost] (e.g. [/user/sam][localhost]) | GET | `userid` | Returns the userid parameter |
| [`/user/:userid-:bookid`][localhost] (e.g. [/user/sam-24][localhost]) | GET | `userid`, `bookid` | Returns both parameters |
| [`/user/:name/:age`][localhost] (e.g. [/user/sam/24][localhost]) | GET | `name`, `age` | Returns both parameters |
| [`/search`][localhost] (e.g. [/search?name=sam&age=24][localhost]) | GET | Query params | Returns query parameters |
| [`/contact`][localhost] | GET | None | Returns HTML contact page |
| [`/user-info`][localhost] | GET | None | Returns a JSON object |
| [`/about`][localhost] | GET | None | Redirects to `/contact` |
| [`/about-v2`][localhost] | GET | None | 301 redirects to Google |
| [`/about-v3`][localhost] | GET | None | Redirects to previous page |
| [`/test`][localhost] | GET | None | Renders test.ejs template |
| [`/download`][localhost] | GET | None | Downloads t.png file |
| [`/img`][localhost] | GET | None | Sends image file |
| [`/end`][localhost] | GET | None | Demonstrates res.end() |
| [`/error`][localhost] | GET | None | Returns 404 status |
| [`/404`][localhost] | GET | None | Returns "Page not found" |
| [`/header`][localhost] | GET | None | Checks if headers were sent |
| [`/check`][localhost] | GET | None | Sets and gets custom header |
| [`/data`][localhost] | POST | Request body (JSON) | Returns request body data |
| [`/info`][localhost] | GET | None | Returns request hostname |
| [`/info/:userId`][localhost] (e.g. [/info/10][localhost]) | GET | `userId` | Returns route info |
| [`/type`][localhost] | GET | None | Content negotiation example |
| [`/headers`][localhost] | GET | None | Returns request headers |
| [`/data-type`][localhost] | POST | Request body | Checks content type |
| [`/ejs`][localhost] | GET | None | Renders home.ejs |
| [`/ejs/:userId`][localhost] (e.g. [/ejs/10][localhost]) | GET | `userId` | Renders dynamicValue.ejs with data |
| [`/form`][localhost] | GET | None | Renders form.ejs |
| [`/submit`][localhost] | POST | `userName` (form data) | Processes form submission |

## Parameter Types

1. **Route Parameters**: Defined in URL path (e.g., `/user/:id`)
2. **Query Parameters**: Passed after `?` in URL (e.g., `?name=value`)
3. **Request Body**: For POST/PUT requests (requires `express.json()` middleware)
4. **Form Data**: For form submissions (requires `express.urlencoded()` middleware)
