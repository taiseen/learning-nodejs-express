import express from 'express';
const app = express();

const PORT = process.env.PORT || 3000;
const serverListener = () => console.log(`🚀 Server is running on http://localhost:${PORT}`);
app.listen(3000, serverListener);


// 🔴🔴🔴 for POST, PUT, PATCH, DELETE request body data
// express.json() middleware is used to parse:-
// raw data >> into >> JSON data, from the request body
app.use(express.json());
// for process form data
app.use(express.urlencoded({ extended: false }));



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


// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- app.post() method
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/data
// send the request body as response
app.post('/data', (req, res) => {
    // server read - user sended data form req.body property
    const data = req.body;
    res.send(data)
});




// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- app.get() method with req property
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/info
app.get('/info', (req, res) => {
    // req properties...
    const data1 = req.hostname;
    const data2 = req.ip;
    const data3 = req.ips;
    const data4 = req.method
    const data5 = req.originalUrl;
    const data6 = req.path; // only return route name
    const data7 = req.protocol; // http or https
    const data8 = req.secure; // true or false
    const data9 = req.route; // return route object

    res.send(data1);
});

// http://localhost:3000/info/10
app.get('/info/:userId', (req, res) => {
    const data = req.route; // return route related internal info
    res.send(data)
});


// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- app.get() method with req methods00
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/info/10
app.get('/type', (req, res) => {
    // req methods...
    // client side accepts, which kind of content type?
    if (req.accepts('html')) {
        res.send("<h1>Hello HTML</h1>")
    } else if (req.accepts('json')) {
        res.send({ message: 'Hello JSON' })
    } else if (req.accepts('xml')) {
        res.send("<message>Hello XML</message>")
    } else {
        res.send("Content type not supported.")
    }
});

// to get request heder info
// http://localhost:3000/headers
app.get('/headers', (req, res) => {
    const data1 = req.headers; // full server information...
    const data2 = req.header('user-agent'); // get specific header info
    const data3 = req.get('accept'); // get specific header info
    res.send(data3)
});



// server can check the content type of request body data that come by POST method
// http://localhost:3000/data-type
app.post('/data-type', (req, res) => {
    if (req.is('application/json')) {
        res.send("Valid JSON Data")
    } else if (req.is('text/html')) {
        res.send("HTML Data")
    } else {
        res.status(400).send("Unsupported Content-Type.")
    }
})



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- app.get() method with req methods
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

// http://localhost:3000/ejs
app.get('/ejs', (req, res) => {
    res.render('home');
});

// http://localhost:3000/ejs/10
app.get('/ejs/:userId', (req, res) => {
    const userId = req.params.userId; // get route parameter value

    const items = ['Apple', 'Banana', 'Cherry',
        'Date', 'Elderberry', 'Fig', 'Grape'];

    const users = [
        { name: 'Akshay Kumar', age: 25, city: 'Delhi' },
        { name: 'Salman Khan', age: 24, city: 'Mumbai' },
        { name: 'Shahid Kapoor', age: 23, city: 'Goa' },
        { name: 'John Abraham', age: 22, city: 'Delhi' },
        { name: 'Kartrina Kaif', age: 23, city: 'Agra' }
    ];

    res.render('dynamicValue', {
        items,
        users,
        userId,
        sms: '',
    });
});



// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟢🟢🟢 example of :- app.get() & .post() method with res.render() for EJS 
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

app.get('/form', (req, res) => {
    res.render('form', { message: '' });
});

app.post('/submit', (req, res) => {
    const name = req.body.userName;
    res.render('form', { message: name });
});