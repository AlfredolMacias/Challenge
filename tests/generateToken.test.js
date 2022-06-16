const { decodeSign, verifyToken } = require("../helpers/generateToken");
const router = require('../routes/routes')// Link to your server file
const supertest = require('supertest');
const request = supertest(router);


let token = '';
beforeAll(async() => {
    const res = await request.post('/login').send({
        email: "admin@admin.com",
        password: "12345"
    });
    token = res.body.tokenSession;
});

describe('Pruebas en generate Token', () => { 
    
    it('Should return the token decoded', async() => {
        const verified = await verifyToken(token);
        expect(verified.id).toBe(1);
    });

    it('Should return null', async() => {
        const verified = await verifyToken();

        expect(verified).toBe(null);
    });


    it('Should return the token decoded', () => {
        const decoded = decodeSign(token);

        expect(decoded.id).toBe(1);
    });

    
 })