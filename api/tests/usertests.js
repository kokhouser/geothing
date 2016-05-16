/**
 * Unit tests for Users API routes
 * TESTS ARE CURRENTLY BROKEN DUE TO ADDITION OF AUTHENTICATION
 */

process.env.NODE_ENV = 'test'; //Setting test enviroment

var supertest = require("supertest");
var bcrypt = require('bcrypt');
var should = require("should");
var app = require('../server');
var authentication = require('../routes/authentication');

var server = supertest.agent("http://localhost:8080"); //Change port here
var userModel = require('../models/user');

describe("Test getting Users", function(){

	var user;
	var token;

	// Creates a user and inserts into test database before any tests are run
	beforeEach(function() {
		user = new userModel();
		user.username = "Test user";
		user.password = bcrypt.hashSync("testPassword", 10);
		user.email = "testemail@email.com";
		user.save(function(err) {
			if (err) {
				console.log("Error creating new test user.");
			}
		});
	});

	// Deletes test user after tests are run
	afterEach(function() {
		userModel.remove({
			_id: user._id
		}, function (err,user) {
			if (err) {
				console.log("Error removing new test user.");
			}
		});
	});

	it ("should return list of all users", function(done){
		// Set token before each request
		server.post('/api/authenticate').send({'username': user.username, 'password': "testPassword"})
		.end(function(err, res) {
			token = res.body.token;
			server
			.get("/api/users")
			.set('x-access-token', token)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err,res){
				should.not.exist(err);
				res.status.should.equal(200);
				userList = JSON.parse(res.text);
				userList.length.should.equal(1);
				done();
			});
		});
	});

	it ("should return a single user by id", function (done) {
		server.post('/api/authenticate').send({'username': user.username, 'password': "testPassword"})
		.end(function(err, res) {
			token = res.body.token;
			server
			.get("/api/users/" + user._id)
			.set('x-access-token', token)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err,res){
				should.not.exist(err);
				res.status.should.equal(200);
				newUser = JSON.parse(res.text);
				should.exist(newUser);
				done();
			});
		});
	});
});

describe("Test creating Users", function(){

	var testId;

	// Deletes test user after tests are run
	afterEach(function() {
		userModel.remove({
			_id: testId
		}, function (err,user) {
			if (err) {
				console.log("Error removing new test user.");
			}
		});
	});

	it ("should create a new user", function(done){
		server
		.post("/api/users")
		.send({ username: "Test User", password: "password", email: "testemail@email.com"})
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err,res){
			should.not.exist(err);
			res.status.should.equal(200);
			newUser = JSON.parse(res.text);
			should.exist(newUser);
			testId = newUser.user.id;
			done();
		});
	});
});

