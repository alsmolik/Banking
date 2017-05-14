const supertest = require('supertest');
const server = supertest.agent("http://localhost:3000");

describe("SAMPLE unit test", function () {
    it("should return home page", function () {
        return server
            .get('/api/users/1/payments/list')
            .expect(200);
    });
});