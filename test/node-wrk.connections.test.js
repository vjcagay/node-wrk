var Wrk = require( '../lib/node-wrk' );
require( 'should' );

describe( 'node-wrk -- connections', function () {

	var testConfig = {
	   'threads'     : 1,
	   'connections' : 1,
	   'duration'    : 1,
	   'baseUrl'     : 'http://localhost:4000',
	   'luaScript'   : './test.lua'
	};

	afterEach( function () {
		testConfig.connections = 1;
	} );

	describe( 'should require "connections"', function () {

		before( function () {
			delete testConfig.connections;
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( TypeError );
			testWrk.should.throw( 'connections is required' );

		} );

	} );

	describe( '"connections" should be a number', function () {

		before( function () {
			testConfig.connections = '1';
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( TypeError );
			testWrk.should.throw( 'connections should be a number and is greater than 0' );

		} );

	} );

	describe( '"connections" should be greater than 0', function () {

		before( function () {
			testConfig.connections = 0;
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( TypeError );
			testWrk.should.throw( 'connections should be a number and is greater than 0' );

		} );

	} );

} );
