import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        // console.log('✅✅✅ File upload location...');

        cb(null, '../../public/uploads')
    },

    filename: (req, file, cb) => {
        // console.log('✅✅✅ File Renaming...');

        const newFileName = Date.now() + path.extname(file.originalname);

        cb(null, newFileName)
    }
})


const fileFilter = (req, file, cb) => {

    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images (jpeg, jpg, png) are allowed.'), false);
    }
}


const fileUpload = multer({
    storage,
    fileFilter,
    limit: { fileSize: 1024 * 1024 * 3 } // 3mb
})


export default fileUpload;