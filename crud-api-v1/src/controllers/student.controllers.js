import StudentModel from '../models/student.model.js';



export const getAllStudents = async (_, res) => {

    try {

        const data = await StudentModel.find();

        res.json(data);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}



export const getStudentById = async (req, res) => {

    const { id } = req.params;

    try {

        const data = await StudentModel.findById(id);

        if (!data) return res.status(404).json({ message: "Student can't found by this id" });

        res.json(data);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}



export const createStudent = async (req, res) => {

    const dataForCreate = req.body;

    try {

        const data = await StudentModel.create(dataForCreate);

        res.status(201).json(data);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}



export const updateStudent = async (req, res) => {

    const dataForUpdate = req.body;

    const { id } = req.params;

    try {

        const data = await StudentModel.findByIdAndUpdate(id, dataForUpdate, { new: true });

        if (!data) return res.status(404).json({ message: "Student can't update by this id" });

        res.json(data);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}



export const deleteStudent = async (req, res) => {

    const { id } = req.params;

    try {
        const data = await StudentModel.findByIdAndDelete(id);

        if (!data) return res.status(404).json({ message: "Student can't delete by this id" });

        res.json({ message: 'Student Deleted ✅' });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}