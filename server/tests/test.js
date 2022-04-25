const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);

chai.should();describe("Contracts", () => {
    describe("Post /active", () => {
        // Test to get all students record
        it("Get all active contracts and return success code 200", (done) => {
             chai.request(app)
                 .post('/active')
                 .send({wallet: '0xbe31Cb6f8c0ec74d13f92614072c73eBAC62833F'})
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                  });
         });

         it("Should return null ", (done) => {
            chai.request(app)
                .post('/active')
                .send({wallet: 'asd'})
                .end((err, res) => {
                    expect(err).to.be.null
                    done();
                 });
        });
    });
});

chai.should();describe("Contracts", () => {
    describe("Post /create", () => {
        it("Create a contract and return success code 200", (done) => {
             chai.request(app)
                 .post('/create')
                 .send({"client": "testClient",
                 "wallet": "0xB49d9E50036635feb9A27defDb4bE9E1Fe65D7e0",
                 "date": "26/02/2022",
                 "amount": 0.5,
                 "owner": "0xbe31Cb6f8c0ec74d13f92614072c73eBAC62833F"})
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                  });
         });

         it("Return success message from the server", (done) => {
            chai.request(app)
                .post('/create')
                .send({"client": "testClient",
                "wallet": "0xB49d9E50036635feb9A27defDb4bE9E1Fe65D7e0",
                "date": "26/02/2022",
                "amount": 0.5,
                "owner": "0xbe31Cb6f8c0ec74d13f92614072c73eBAC62833F"})
                .end((err, res) => {
                    let resMessage = res.body.message;
                    resMessage.should.have.string('Created')
                    done();
                 });
        });
    });
});