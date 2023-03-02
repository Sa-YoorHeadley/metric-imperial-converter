const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Convert a valid input such as 10L: GET request to /api/convert', () => {
        chai
        .request(server)
        .get('/api/convert?input=10L')
        .end((error, res) => {
            assert.strictEqual(res.status, 200)
            assert.strictEqual(res.body.initNum, 10)
            assert.strictEqual(res.body.initUnit, 'L')
            assert.strictEqual(res.body.returnNum, 2.64172)
            assert.strictEqual(res.body.returnUnit, 'gal')
        })
    })
    test('Convert an invalid input such as 32g: GET request to /api/convert.', () => {
        chai
        .request(server)
        .get('/api/convert?input=32g')
        .end((error, res) => {
            assert.strictEqual(res.status, 200)
            assert.strictEqual(res.body.error, 'invalid unit')
        })
    })
    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', () => {
        chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end((error, res) => {
            assert.strictEqual(res.status, 200)
            assert.strictEqual(res.body.error, 'invalid number')
        })
    })
    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', () => {
        chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end((error, res) => {
            assert.strictEqual(res.status, 200)
            assert.strictEqual(res.body.error, 'invalid number and unit')
        })
    })
    test('Convert with no number such as kg: GET request to /api/convert', () => {
        chai
        .request(server)
        .get('/api/convert?input=kg')
        .end((error, res) => {
            assert.strictEqual(res.status, 200)
            assert.strictEqual(res.body.initNum, 1)
            assert.strictEqual(res.body.initUnit, 'kg')
            assert.strictEqual(res.body.returnNum, 2.20462)
            assert.strictEqual(res.body.returnUnit, 'lbs')
        })
    })

});
