let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

// let mongoose = require('mongoose');
// let Animal = require('../models/animal.model');
const db = require("../models");
const User = db.users;

chai.use(chaiHttp);
 
//the parent block
describe('Testing the /petshop path', () => {
    //Testing GET /petshop
    describe('GET /petshop', () => {
        it('it should return a welcome message', (done) => {
            chai.request(server)
            .get('/petshop')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Welcome to the petshop api.');
                done();
            });
        });
    });
    // Finished GET /petshop
    
    //Testing GET /petshop/animals
    describe('GET /petshop/animals', () => {
        it('it should GET all the animals', (done) => {
            chai.request(server)
            .get('/petshop/animals')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
                done();
            });
        });
    });
    //Finished GET /petshop/animals

    //Testing POST /petshop/animals - negative test
    describe('POST /petshop/animals - negative', () => {
        it('it should not POST an animal without name field', (done) => {
            let animal = {
                species: "dog",
                breed: "caninus canine",
                age: 12,
                colour: "yellow"
            };
            chai.request(server)
                .post('/petshop/animals')
                .send(animal)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Content can not be empty!');
                    done();
                });
        });
    });
    //Finished POST /petshop/pets - negative test

    //Testing POST /petshop/animals - positive test
    describe('POST /petshop/animals', () => {
        let animal;

        before(function(done) {
            User.find({})
            .then(data => {
                let userId = data[0]._id;
                animal = {
                    name: "fido",
                    species: "dog",
                    breed: "caninus canine",
                    age: 12,
                    colour: "yellow",
                    userid: userId
                }; 
                done();
            })
            .catch(err => {
                done(err);
            });
        });
        
        it('it should POST an animal ', (done) => {        
            chai.request(server)
                .post('/petshop/animals')
                .send(animal)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('species');
                    res.body.should.have.property('breed');
                    res.body.should.have.property('age');
                    res.body.should.have.property('colour');
                    done();
                });
        });
    });
    //Finished POST /petshop/pets
});