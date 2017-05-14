const supertest = require('supertest');
const server = supertest.agent("http://localhost:3000");

describe("SAMPLE unit test", function () {
    it("should return home page", function () {
        server
            .get('/api/payments/1/list')
            .expect(200);
    });
});