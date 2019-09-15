import students from '../db/dummy';

class studentController {
    // Get all students
    static getAllStudents(req, res) {
        return res.status(200).json({
            students,
            success: "true",
            message: "All the students"
        });
    }

    //get student by id
    static getStudentById(req, res) {
        const findById = students.find(student => student.id === parseInt(req.params.id), 10);

        if(findById){
            return res.status(200).json({
                message: 'one student retrieved',
                success: 'true',
                student: findById
            });
        }

        return res.status(404).json({
            message: "no student found",
            success: 'false'
        });
    }
}

export default studentController;