const router = require('../routes/routes');
// const  = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(router);


describe('Pruebas en Comment Controller', () => { 
    
    it('Should return a 200 code', async() => {
        
        const res = await request.post('/comment').send({
            body_comment: "Mi comentario",
            postId: 1,
            userId: 1, 
        });

        expect(res.status).toBe(200);
     });
 })