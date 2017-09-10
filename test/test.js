import { expect } from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';

process.env.NODE_ENV = 'test';

const rootURL = '/api/v1';
const recipesUrl = `${rootURL}/recipes`;
const usersUrl = `${rootURL}/users`;


let data = {};
const request = supertest(app);


// # Test 0
describe('Wrong page', () => {
	it('Should return Oooops', (done) => {
		// calling a wrong api 
		request.get('/api/v1/jdkl/rjrknkmr/tjjkkr/jjrikijkr')
			.end((err, res) => 
			{
            	expect(res.status).to.equal(404); 
				expect(res.body.message).to.equal('Ooops! Something went wrong. try navigating from home page or log in');
				expect(res.body.status).to.equal('failed');
				done();
			});
	});
});

// # Test 1
describe('More Recipe API', () => {
	it('Should return home page', (done) => {
		// calling home page api
		request.get('/api/v1/')
			.end((err, res) => 
			{
            	expect(res.status).to.equal(200); 
				expect(res.body.message).to.equal('Welcome to More Recipe');
				expect(res.body.status).to.equal('successful');
				done();
			});
	});
});



// # Test 2
describe('User sign up', () => {
	beforeEach(() => {
		data = {
			firstName: 'Adewole',
			lastName: 'Babalola',
			email: 'ba@ba.com',
			password: 'abcdef',
		};
	});
	// # Test 3
	it('Should create new user', (done) => {
		request.post('/api/v1/users/signup')
			.send(data)
			.end((err, res) => 
			{
				//expect(res.status).to.equal(201); 
				expect(res.body.message).to.equal('User created');
				expect(res.body.status).to.equal('successful');
				done();
			});
	});

// # Test 4
	it('Used email', (done) => {
		request.post('/api/v1/users/signup')
			.send(data)
			.end((err, res) => 
			{
				//expect(res.status).to.equal(201); 
				expect(res.body.message).to.equal('email must be unique, pls fill the field appropriately');
				expect(res.body.status).to.equal('failed');
				done();
			});
	});
	
// # Test 5
	it('email null', (done) => {
		let temp = data
		temp.email = "";
		request.post('/api/v1/users/signup')
			.send(temp)
			.end((err, res) => 
			{
				expect(res.body.message).to.equal('email cannot be null, pls fill the field appropriately');
				expect(res.body.status).to.equal('failed');
				done();
			});
	});


// # Test 6
	it('first name null', (done) => {
		let temp = data
		temp.firstName = "";	
		request.post('/api/v1/users/signup')
			.send(temp)
			.end((err, res) => 
			{
				expect(res.body.message).to.equal('firstName cannot be null, pls fill the field appropriately');
				expect(res.body.status).to.equal('failed');
				done();
			});
	});


// # Test 7
	it('last name null', (done) => {
		let temp = data
		temp.lastName = "";	
		request.post('/api/v1/users/signup')
			.send(temp)
			.end((err, res) => 
			{
				//console.log(err + ">>>" + res.body);
            	//expect(res.status).to.equal(201); 
				expect(res.body.message).to.equal('lastName cannot be null, pls fill the field appropriately');
				expect(res.body.status).to.equal('failed');
				done();
			});
	});

// # Test 8
	it('password null', (done) => {
		let temp = data
		temp.password = "";	
		request.post('/api/v1/users/signup')
			.send(temp)
			.end((err, res) => 
			{
				//console.log(err + ">>>" + res.body);
            	//expect(res.status).to.equal(201); 
				expect(res.body.message).to.equal('password cannot be null, pls fill the field appropriately');
				expect(res.body.status).to.equal('failed');
				done();
			});
	});
});



describe('User sign in', () => {
	beforeEach(() => {
		data = {
			email: 'ba@ba.com',
			password: 'abcdef',
		};
	});

	// # Test 9
	it('Signed in', (done) => {
		request.post('/api/v1/users/signin')
			.send(data)
			.end((err, res) => 
			{
				//expect(res.status).to.equal(201); 
				expect(res.body.message).to.equal('Successfully signed in');
				expect(res.body.status).to.equal('successful');
				done();
			});
	});

	// # Test 10
	it('sign in, password null error', (done) => {
		let temp = data;
		temp.password = null
		request.post('/api/v1/users/signin')
			.send(temp)
			.end((err, res) => 
			{
				//console.log(err + ">>>" + res.body);
            	//expect(res.status).to.equal(201); 
				expect(res.body.message).to.equal('Both email and password are required, fill them accordingly');
				expect(res.body.status).to.equal('failed');
				done();
			});
	});

	// # Test 11
	it('sign in email null error', (done) => {
		let temp = data;
		temp.email = null
		request.post('/api/v1/users/signin')
			.send(temp)
			.end((err, res) => 
			{
				//console.log(err + ">>>" + res.body);
            	//expect(res.status).to.equal(201); 
				expect(res.body.message).to.equal('Both email and password are required, fill them accordingly');
				expect(res.body.status).to.equal('failed');
				done();
			});
	});

	// # Test 12
	// it('sign in email not well formated email', (done) => {
	// 	let temp = data;
	// 	temp.email = ''
	// 	request.post('/api/v1/users/signin')
	// 		.send(temp)
	// 		.end((err, res) => 
	// 		{
	// 			//console.log(err + ">>>" + res.body);
    //         	//expect(res.status).to.equal(201); 
	// 			expect(res.body.message).to.equal('Both email and password are required, fill them accordingly');
	// 			expect(res.body.status).to.equal('failed');
	// 			done();
	// 		});
	// });
	
});
