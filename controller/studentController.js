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

    //create a new student
    static createStudent(req, res){
        if(!req.body.name){
            return res.status(400).json({
                success: 'false',
                message: 'student name is required'
            });
        }else if(!req.body.faculty){
            return res.status(400).json({
                success: 'false',
                message: 'student faculty is required'
            });
        }else if(!req.body.marks){
            return res.status(400).json({
                success: 'false',
                message: 'student marks are required'
            });
        }

        const student = {
            id: students.length + 1,
            name: req.body.name,
            faculty: req.body.faculty,
            marks: req.body.marks
        };

        students.push(student);
        return res.status(201).json({
            success: 'true',
            message: 'Student saved successfully',
            student
        });
    }

    static updateStudentRecord(req, res) {
        const studentId = parseInt(req.params.id, 10);
        let studentFound;
        let studentIndex;

        students.map((student, index)=>{
            if(student.id === studentId){
                studentFound = student;
                studentIndex = index;
            }
        });

        if(!studentFound){
            return res.status(400).json({
                success: 'false',
                message: 'No student found by that id'
            });
        }

        if(!req.body.name){
            return res.status(400).json({
                success: 'false',
                message: 'student name is required'
            });
        }else if(!req.body.faculty){
            return res.status(400).json({
                success: 'false',
                message: 'student faculty is required'
            });
        } else if (!req.body.marks){
            return res.status(400).json({
                success: 'false',
                message: 'student marks are required'
            });
        }

        const studentUpdated = {
            id: studentFound.id,
            name: req.body.name || studentFound.name,
            faculty: req.body.faculty || studentFound.faculty,
            marks: req.body.marks || studentFound.marks
        };

        students.splice(studentIndex, 1, studentUpdated);
        return res.status(201).json({
            success: 'true',
            message: 'Student updated successfully',
            studentUpdated
        });
    }

    static deleteStudentRecord(req, res) {
        const id = parseInt(req.params.id, 10);

        students.map((student,index)=>{
            if(student.id === id){
                students.splice(index, 1);
                return res.status(200).json({
                    success: 'true',
                    message: 'Student record deleted'
                });
            }
        });

        return res.status(400).json({
            success: 'false',
            message: 'no student found by that id'
        });
    }
}

export default studentController;