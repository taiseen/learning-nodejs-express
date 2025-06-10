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

router.post('/', createStudent);

router.put('/:id', updateStudent);

router.delete('/:id', deleteStudent);


export default router;