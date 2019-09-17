import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import students from '../db/dummy';

chai.should();
chai.use(chaiHttp);

describe('Students', () =>{
    it('should get all the students', (done)=>{
        chai.request(app)
        .get('/api/v1/students')
        .end((err, res)=> {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message', 'All the students');
        done();    
        });
    });

    it('should get a student by given id', (done) =>{
        const id = 2;
        chai.request(app)
        .get('/api/v1/students/'+ id)
        .end((err, res)=> {
            res.should.have.status(200);
            res.body.student.should.have.property('id', 2);
        done();    
        });
    });

    it('should not get a student by given id', (done)=> {
        const id = 5;
        chai.request(app)
        .get('/api/v1/students/'+ id)
        .end((err, res)=> {
            res.should.have.status(404);
            res.body.should.have.property('success', 'false');
        done();    
        });
    });

    it('should create a new student record', (done)=>{
        const student = {
            id: students.length + 1,
            name: 'Seth',
            faculty: 'networking',
            marks: 17
        };

        chai.request(app)
        .post('/api/v1/students')
        .send(student)
        .end((err, res)=> {
            res.should.have.status(201);
            res.body.should.have.property('message', 'Student saved successfully');
            res.body.student.should.have.property('name', 'Seth');
        done();    
        });

    });

    it('should update a student with a given id', (done) =>{
        const id = 3;

        chai.request(app)
        .put('/api/v1/students/'+ id)
        .send({ id: id, name: 'Seth', faculty: 'software engineering', marks: 16})
        .end((err, res)=> {
            res.should.have.status(201);
            res.body.should.have.property('message', 'Student updated successfully');
            res.body.studentUpdated.should.property('faculty', 'software engineering');
        done();    
        });
    });

    it('should not update a student with a given id', (done) => {
        const id = 5;

        chai.request(app)
            .put('/api/v1/students/' + id)
            .send({ id: id, name: 'Seth', faculty: 'software engineering', marks: 16 })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message', 'No student found by that id');
                done();
            });
    });

    it('should not update a student with a given id2', (done) => {
        const id = 3;

        chai.request(app)
            .put('/api/v1/students/' + id)
            .send({ id: id, faculty: 'software engineering', marks: 16 })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message', 'student name is required');
                done();
            });
    });

    it('should not update a student with a given id3', (done) => {
        const id = 3;

        chai.request(app)
            .put('/api/v1/students/' + id)
            .send({ id: id, name: 'Seth',marks: 16 })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message', 'student faculty is required');
                done();
            });
    });

    it('should delete a student with a given id', (done)=>{
        const id = 3;

        chai.request(app)
        .delete('/api/v1/students/'+ id)
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('message', 'Student record deleted');
        done();    
        });
    });

    it('should not delete a student with a given id', (done) => {
        const id = 5;

        chai.request(app)
            .delete('/api/v1/students/' + id)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message', 'no student found by that id');
                done();
            });
    });

});