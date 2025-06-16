import fs from 'fs';

export const writeFile = (req, res) => {

    fs.writeFile('./public/txt/output.txt', 'This is a test message.', (err) => {

        if (err) {
            return res.status(500).send("Failed to write file 🔴");
        }

        res.send('File written successfully ✅');
    })
};



export const readFile = (req, res) => {

    fs.readFile('./public/txt/output.txt', (err, data) => {

        if (err) {
            return res.status(500).send("File not found 🔴");
        }

        res.setHeader('Content-Type', 'text/plain');
        res.send(data);
    })
}



export const appendFile = (req, res) => {

    fs.appendFile('./public/txt/output.txt', '\nNew Line appended.', (err) => {

        if (err) {
            return res.status(500).send("Failed to append file 🔴");
        }

        res.send("Content Appended ✅");
    })
}



export const deleteFile = (req, res) => {

    fs.unlink('./public/txt/output.txt', (err) => {

        if (err) {
            return res.status(500).send("Failed to delete file 🔴");
        }

        res.send("File Deleted Successfully ✅");
    })
}



export const readFolder = (req, res) => {

    fs.readdir('./public', (err, files) => {

        if (err) {
            console.log(err);
            return;
        }

        files.forEach(file => {
            console.log(file)
        })

        res.send("File Read Successfully ✅");
    })
};



export const renameFile = (req, res) => {

    fs.rename('./public/txt/output.txt', './public/txt/new-output.txt', (err) => {

        if (err) {
            return res.status(500).send("Failed to rename file 🔴");
        }

        res.send("File renamed Successfully ✅");
    })
}



export const streamText = (req, res) => {

    const fileStream = fs.createReadStream('./public/txt/new-output.txt');

    fileStream.on('open', () => {
        fileStream.pipe(res);
    })

    fileStream.on('error', () => {
        res.status(500).send("File not found or error reading file 🔴");
    })
}



export const createFolder = (req, res) => {

    fs.mkdir('./public/myFolder', (err) => {

        if (err) {
            return res.status(500).send("Error creating folder 🔴");
        }

        res.send("Folder created Successfully ✅");
    })
}



export const renameFolder = (req, res) => {

    fs.rename('./public/myFolder', './public/renamedFolder', (err) => {

        if (err) {
            return res.status(500).send("Error renaming folder 🔴", err);
        }

        res.send("Folder renamed Successfully ✅");
    })
}



export const deleteFolder = (req, res) => {

    fs.rmdir('./public/renamedFolder', (err) => {

        if (err) {
            return res.status(500).send("Error deleting folder 🔴", err);
        }

        res.send("Folder deleted Successfully ✅");
    })
}



export const readPdf = (req, res) => {

    fs.readFile('./public/pdf/aws-data.pdf', (err, data) => {

        if (err) {
            return res.status(500).send("PDF not found 🔴", err);
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.send(data);
    })
}



export const readJson = (req, res) => {

    fs.readFile('./public/json/data.json', (err, data) => {

        if (err) {
            return res.status(500).send("JSON not found 🔴", err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
}



export const writeJson = (req, res) => {

    const filePath = './public/json/data.json';
    const data = { name: 'Salman Khan', email: 'salman@email.com', age: 25 };

    fs.writeFile(filePath, JSON.stringify(data), (err) => {

        if (err) {
            return res.status(500).send("Failed to write JSON file 🔴", err);
        }

        res.send('JSON File written successfully ✅');
    })
}



export const appendJson = (req, res) => {

    const filePath = './public/json/data.json';
    const newData = { name: 'Jon Do', email: 'jon@email.com', age: 23 };

    fs.readFile(filePath, (err, data) => {

        if (err) {
            return res.status(500).send("Failed to read JSON file 🔴", err);
        }

        let jsonData;
        jsonData = JSON.parse(data);

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData]
        }

        jsonData.push(newData);

        fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {

            if (err) {
                return res.status(500).send("Failed to write JSON file 🔴", err);
            }

            res.send('JSON File appended successfully ✅');
        })
    })

}



export const readImage = (req, res) => {

    fs.readFile('./public/img/image.png', (err, data) => {

        if (err) {
            return res.status(500).send("Image not found 🔴", err);
        }

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(data);
    })
}



export const readVideo = (req, res) => {

    fs.readFile('./public/video/earth.mp4', (err, data) => {

        if (err) {
            return res.status(500).send("Video not found 🔴", err);
        }

        res.setHeader('Content-Type', 'video/mp4');
        res.send(data);
    })
}



export const fileInfo = (req, res) => {

    fs.stat('./public/video/earth.mp4', (err, stats) => {

        if (err) {
            return res.status(500).send("File not found 🔴", err);
        }

        res.send(stats.size + 'bytes');
        console.log("File : " + stats.isFile());
        console.log("Folder : " + stats.isDirectory());
    })
}



export const fileExists = (req, res) => {

    fs.access('./public/video/earth123.mp4', (err) => {

        if (err) {
            return res.send("File does not exist 🔴");
        }

        res.send("File Exists ✅");
    })
}