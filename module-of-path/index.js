import express from 'express';
import path from 'path';
import url from 'url';


const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (_, res) => {

    const filePath = '/users/test/docs/report.pdf';

    console.log("BaseName: " + path.basename(filePath));
    console.log("DirName : " + path.dirname(filePath));
    console.log("ExtName : " + path.extname(filePath));


    const filePathInfo = path.parse(filePath);
    console.log({ filePathInfo });


    // it can resolve both relative + absolute path
    const absolutePath = path.join(__dirname, 'public', 'images', 'avatar.jpg');
    const relativePath = path.join('public', 'images', 'avatar.jpg');


    console.log({ absolutePath });
    console.log({ relativePath });


    // it can resolve only absolute path
    const fullPath = path.resolve('public', 'image.jpg');
    console.log({ fullPath });


    res.json({
        filePath,
        "path.basename": path.basename(filePath),
        "path.dirname": path.dirname(filePath),
        "path.extname": path.extname(filePath),
        filePathInfo,
        fullPath,
        relativePath,
        absolutePath,
    })
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`📢 Server running :- http://localhost:${PORT}`)
});