/**
 * Unit tests for API routes
 */

process.env.NODE_ENV = 'test'; //Setting test enviroment

var supertest = require("supertest");
var should = require("should");
var app = require('../server');

var server = supertest.agent("http://localhost:8080"); //Change port here

describe("Test is server up", function(){

	it ("should return welcome page", function(done){
		server
		.get("/api")
		.expect(200)
		.end(function(err,res){
			res.status.should.equal(200);
			done();
		});
	});
});