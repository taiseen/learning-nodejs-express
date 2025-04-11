const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const serverListener = () => console.log(`🚀 Server is running on http://localhost:${PORT}`);
app.listen(3000, serverListener);


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/user', (req, res) => res.send('Hello User!'));


// example:- 
// http://localhost:3000/user/sam-24
app.get('/user/:userid-:bookid', (req, res) => {
    res.send(req.params)
})


// example:- of route parameters
// http://localhost:3000/user/sam/24
app.get('/user/:name/:age', (req, res) => {
    const name = req.params.name
    const age = req.params.age

    res.send(req.params)
})


// example:- of query parameters
// http://localhost:3000/search?name=sam&age=24
// http://localhost:3000/search?contrey=bangladesh&city=dakha
// http://localhost:3000/search?country=bangladesh&city=dakha&name=sam&age=24
app.get('/search', (req, res) => {
    const name = req.query.name
    const age = req.query.age

    // res.send(`Hello ${name}, you are ${age} years old`);

    res.send(req.query)
})