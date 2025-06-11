import StudentModel from '../models/student.model.js';
import path from 'path';
import fs from 'fs';


const UPLOAD_DIR = './src/uploads';


const deleteImage = async (filename) => {

    if (!filename) return;

    // get file path or location...
    const filePath = path.join(UPLOAD_DIR, filename);

    // 💥💥💥 delete image file from file system...
    fs.unlink(filePath, (err) => {
        if (err) console.log(`⚠️ Failed to delete image (${filename}):`, err.message);
    });

};





export const getAllStudents = async (_, res) => {

    try {

        const storedData = await StudentModel.find();

        res.json(storedData);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}





export const getStudentById = async (req, res) => {

    const { id } = req.params;

    try {

        const storedData = await StudentModel.findById(id);

        if (!storedData) return res.status(404).json({ message: "Student can't found by this id" });

        res.json(storedData);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}





export const createStudent = async (req, res) => {

    const dataForCreate = req.body;

    const { filename } = req.file || {};

    try {

        // const data = await StudentModel.create(dataForCreate);

        const createdData = new StudentModel(dataForCreate)

        //  attach img file name with this data creation time
        if (filename) {
            createdData.profile_pic = filename;
        }

        const newData = await createdData.save()

        res.status(201).json(newData);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}





export const updateStudent = async (req, res) => {

    const dataForUpdate = req.body;

    const { filename } = req.file || {}; // filename could be undefined;

    const { id } = req.params;


    try {

        // try to find the student by ID
        const oldData = await StudentModel.findById(id);

        // if no student found with the given ID
        if (!oldData) {

            // But image was already uploaded by the middleware
            // So we need to delete that newly uploaded image to avoid saving unused files
            await deleteImage(filename); // 💥💥💥 very important user behavior impact

            return res.status(404).json({ message: "Student can't update by this id" });
        }


        // If new image uploaded, delete the old one and update the profile_pic field
        if (filename) {

            // 💥💥💥 Delete old image
            await deleteImage(oldData.profile_pic);

            // ✅✅✅ update new image file name
            dataForUpdate.profile_pic = filename;
        }


        const updatedData = await StudentModel.findByIdAndUpdate(id, dataForUpdate, { new: true });

        res.json(updatedData);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}





export const deleteStudent = async (req, res) => {

    const { id } = req.params;

    try {

        // Delete the student from the database
        const deletedData = await StudentModel.findByIdAndDelete(id);

        if (!deletedData) return res.status(404).json({ message: "Student can't delete by this id" });

        // If the student had an image, delete it from the file system
        await deleteImage(deletedData.profile_pic);

        res.json({ message: 'Student Deleted ✅' });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}