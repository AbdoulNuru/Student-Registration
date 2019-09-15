import Router from 'express';
import studentController from '../controller/studentController';

const routes = Router();

routes.get('/api/v1/students', studentController.getAllStudents);
routes.get('/api/v1/students/:id', studentController.getStudentById);

export default routes;