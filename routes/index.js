import Router from 'express';
import studentController from '../controller/studentController';

const routes = Router();

routes.get('/api/v1/students', studentController.getAllStudents);
routes.get('/api/v1/students/:id', studentController.getStudentById);
routes.post('/api/v1/students', studentController.createStudent);
routes.put('/api/v1/students/:id', studentController.updateStudentRecord);
routes.delete('/api/v1/students/:id', studentController.deleteStudentRecord);

export default routes;