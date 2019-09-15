import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

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
});