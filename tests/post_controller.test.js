// const app = require('../app'); // Link to your server file
const router = require('../routes/routes');
const supertest = require('supertest');
// const request = supertest(app);
const request = supertest(router);



describe('Pruebas en Post Controller', () => { 
    
    it('Should return a 409 code', async() => {
        
        const res = await request.post('/post').send({
            body_post: "Mi Post",
            userId: 1, 
        });

        expect(res.status).toBe(409);
     });
 })