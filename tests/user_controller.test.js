const router = require('../routes/routes'); // Link to your server file
const supertest = require('supertest');
const request = supertest(router);

let token = ""
beforeAll(async() => {
    const res = await request.post('/login').send({
        email: "admin@admin.com",
        password: "12345"
    });
    token = res.body.tokenSession;
});

describe('Tests in user controller', () => { 
   
    it('Should return a 409 code', async () =>{
        const res = await request.post('/user');

        expect(res.status).toBe(409);
    });

    it('Should return a 400 when is empty de req.body', async() =>{
        console.log(token);
        const res = await request.post('/user').set('authorization', token);
        expect(res.status).toBe(400);
    });

    it('Should return a 200 code at CreateUser', async () =>{
        const res = await request.post('/user').set('authorization', token).send({
            name: "Test",
            email: "test@test".com,
            password:"12345",
            role: "user"
        });

        expect(res.status).toBe(200)
    });
    
    it('Should return a 404 when user is not found at login', async() => {
        const res = await request.post('/login').send({
            email: "admin@admin.com",
            password: "123453in"
        });
        expect(res.status).toBe(409);
    });

    it('Should return a 200 code at login', async() => {
        const res = await request.post('/login').send({
            email: "admin@admin.com",
            password: "12345"
        });
        expect(res.status).toBe(200);

    });


    it('Should return a 200 code at findAllUsers', async() =>{
        const res = await request.get('/users').set({authorization:token});
        expect(res.status).toBe(200);
    }); 

    it('Should return a 200 code at Update an user', async() => {
        const res = await request.put('/user/1').set('authorization', token);
        expect(res.status).toBe(200);
    });

    
});
