const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const serverListener = () => console.log(`🚀 Server is running on http://localhost:${PORT}`);
app.listen(3000, serverListener);



app.set('view engine', 'ejs'); // template engine 



app.get('/', (_, res) => res.send('Hello World!'));

app.get('/user', (_, res) => res.send('Hello User!'));



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- route parameters
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/user/sam
app.get('/user/:userid', (req, res) => res.send(req.params));


// http://localhost:3000/user/sam-24
app.get('/user/:userid-:bookid', (req, res) => res.send(req.params));


// http://localhost:3000/user/sam/24
app.get('/user/:name/:age', (req, res) => {
    const name = req.params.name
    const age = req.params.age

    res.send(req.params)
})



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- query parameters
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/search?name=sam&age=24
// http://localhost:3000/search?contrey=bangladesh&city=dakha
// http://localhost:3000/search?country=bangladesh&city=dakha&name=sam&age=24
app.get('/search', (req, res) => {
    const name = req.query.name
    const age = req.query.age

    // res.send(`Hello ${name}, you are ${age} years old`);

    res.send(req.query)
})


app.get('/contact', (_, res) => res.send("<h1>Contact Page</h1>"));


// http://localhost:3000/user-info
app.get('/user-info', (_, res) => {
    const obj = {
        name: 'sam',
        age: 24
    };

    res.send(obj)
});



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- res.redirect() method
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// example:- redirect to /contact page, when user visit at /about page...
app.get('/about', (_, res) => res.redirect('/contact'));

// 301 permanent redirect for (SEO) redirect
app.get('/about-v2', (_, res) => res.redirect(301, 'https://www.google.com'));

app.get('/about-v3', (_, res) => res.redirect('..')); // back to previous page



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- res.render() method
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// render at browser this test.ejs file, when user visit at /test page
app.get('/test', (_, res) => res.render("test"));



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- res.render() method
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

app.get('/test', (_, res) => res.download("test"));



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- res.download() method
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/download
// download a file from server to client, when user visit at /download page
app.get('/download', (_, res) => res.download('./files/t.png', 'Image.png'));



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- res.download() method
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/img
// send a image file to client, when user visit at /img page
app.get('/img', (_, res) => res.sendFile(__dirname + '/files/t.png'));



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- res.end() method
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/end
app.get('/end', (_, res) => {
    res.write('This is end() testing');
    res.end(); // end the response
});



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- res.sendStatus() method
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/error
app.get('/error', (_, res) => res.sendStatus(404));

// http://localhost:3000/404
app.get('/404', (_, res) => res.status(404).send('Page not found'));



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- res.headersSent() method
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/header
app.get('/header', (_, res) => {

    console.log('headers sent:- ' + res.headersSent); // false
    res.send('Hello World!');
    console.log('headers sent:- ' + res.headersSent); // true
});



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- res.set() & res.get() method
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/check
app.get('/check', (_, res) => {
    res.set('taiseen', 'Web Developer'); // set a custom header

    res.send('Response Header Set... check at browser network tab...');

    const resHeader = res.get('taiseen'); // get the custom header value
    console.log({ resHeader });
});
