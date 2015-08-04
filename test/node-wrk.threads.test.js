var Wrk = require( '../lib/node-wrk' );
require( 'should' );

describe( 'node-wrk -- threads', function () {

	var testConfig = {
	   'threads'     : 1,
	   'connections' : 1,
	   'duration'    : 1,
	   'baseUrl'     : 'http://localhost:4000',
	   'luaScript'   : './test.lua'
	};

	afterEach( function () {
		testConfig.threads = 1;
	} );

	describe( 'should require "threads"', function () {

		before( function () {
			delete testConfig.threads;
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( TypeError );
			testWrk.should.throw( 'threads is required' );

		} );

	} );

	describe( '"threads" should be a number', function () {

		before( function () {
			testConfig.threads = '1';
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( TypeError );
			testWrk.should.throw( 'threads should be a number and is greater than 0' );

		} );

	} );

	describe( '"threads" should be greater than 0', function () {

		before( function () {
			testConfig.threads = 0;
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( TypeError );
			testWrk.should.throw( 'threads should be a number and is greater than 0' );

		} );

	} );

} );
