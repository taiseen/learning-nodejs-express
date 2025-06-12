import multer from 'multer';
import path from 'path';



const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        // console.log('✅✅✅ File upload location...');
        
        cb(null, './src/uploads')
    },

    filename: (req, file, cb) => {
        // console.log('✅✅✅ File Renaming...');
        
        const newFileName = Date.now() + path.extname(file.originalname);

        cb(null, newFileName)
    }
})



const fileFilter = (req, file, cb) => {

    // console.log('🟢🟢🟢 File Type Info :- ');
    // console.log(file);

    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Only images are allowed!'), false)
    }
}



const fileUpload = multer({
    storage,
    fileFilter,
    limit: { fileSize: 1024 * 1024 * 3 }
})



export default fileUpload;