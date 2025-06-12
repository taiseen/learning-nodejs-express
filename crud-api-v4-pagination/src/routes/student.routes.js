import fileUpload from '../utils/file-upload-rules.js';
import express from 'express';
import {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudent,
    updateStudent,
} from '../controllers/student.controllers.js';


const router = express.Router();


router.get('/', getAllStudents);


router.get('/:id', getStudentById);


// 'profile_pic' is the name of the image field in the db schema.
// This middleware run & the image already uploaded before creating the student.
router.post('/', fileUpload.single('profile_pic'), createStudent);



// when user hit this route... 
// 1st - the image is uploaded by this middleware (even if the student ID doesn't exist)
// 2nd - the student is updated in the database
// If the student is not found, we should delete the uploaded image from the file system to avoid unused files
router.put('/:id', fileUpload.single('profile_pic'), updateStudent);


router.delete('/:id', deleteStudent);


export default router;