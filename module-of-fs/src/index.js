import {
    appendFile, appendJson, createFolder, deleteFile, deleteFolder, fileExists,
    fileInfo, readFile, readFolder, readImage, readJson, readPdf, readVideo,
    renameFile, renameFolder, streamText, writeFile, writeJson,
} from './controllers/file-operations.js';

import express from 'express';
import path from 'path';
import url from 'url';


const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public')); // static files

app.set('view engine', 'ejs'); // template engine 
app.set('views', path.join(__dirname, 'views'));



// Write File
app.get('/write-file', writeFile);

// Read File
app.get('/read-file', readFile);

// Append File
app.get('/append-file', appendFile);

// Delete File
app.get('/delete-file', deleteFile);

// Read a Folder / directory
app.get('/read-folder', readFolder)

// File Rename
app.get('/rename-file', renameFile);

// Stream Data
app.get('/stream-text', streamText);

// Create Folder
app.get('/create-folder', createFolder);

// Rename Folder
app.get('/rename-folder', renameFolder);

// Delete Folder
app.get('/delete-folder', deleteFolder);

// Read PDF File 
app.get('/read-pdf', readPdf);

// Read JSON File 
app.get('/read-json', readJson);

// Write JSON file 
app.get('/write-json', writeJson);

// Write JSON file and keep existing data
app.get('/append-json', appendJson);

// Read image file
app.get('/read-image', readImage);

// Read video file
app.get('/read-video', readVideo);

// Getting information for a file
app.get('/file-info', fileInfo);

// check if file exists
app.get('/file-exists', fileExists);



app.get('/', (_, res) => {
    // res.send("File System (fs) operations...");
    res.render('index');
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`📢 Server running :- http://localhost:${PORT}`)
});