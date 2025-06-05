import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('🟢🟢🟢 File upload location...');
        cb(null, './uploads')
    },

    filename: (req, file, cb) => {
        console.log('🟢🟢🟢 File Renaming...');
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})


//file.mimetype.startsWith('image/')

const fileFilter = (req, file, cb) => {

    console.log('🟢🟢🟢 File Info :- ');
    console.log(file);

    if (file.fieldname === 'userFile') {

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(new Error('Only images are allowed!'), false)
        }

    } else if (file.fieldname === 'userDocuments') {

        if (file.mimetype === 'application/pdf') {
            cb(null, true)
        } else {
            cb(new Error('Only PDF are allowed for documents'), false)
        }

    } else {
        cb(new Error('Unknown Field.'), false)
    }
}


const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 3 },
    fileFilter: fileFilter
})

export const uploadFields = upload.fields([
    { name: 'userFile', maxCount: 1 },
    { name: 'userDocuments', maxCount: 3 }
])
