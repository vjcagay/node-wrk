var Wrk = require( '../lib/node-wrk' );
require( 'should' );

describe( 'node-wrk -- duration', function () {

	var testConfig = {
	   'threads'     : 1,
	   'connections' : 1,
	   'duration'    : 1,
	   'baseUrl'     : 'http://localhost:4000',
	   'luaScript'   : './test.lua'
	};

	afterEach( function () {
		testConfig.duration = 1;
	} );

	describe( 'should require "duration"', function () {

		before( function () {
			delete testConfig.duration;
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( TypeError );
			testWrk.should.throw( 'duration is required' );

		} );

	} );

	describe( '"duration" should be a number', function () {

		before( function () {
			testConfig.duration = '1';
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( TypeError );
			testWrk.should.throw( 'duration should be a number and is greater than 0' );

		} );

	} );

	describe( '"duration" should be greater than 0', function () {

		before( function () {
			testConfig.duration = 0;
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( TypeError );
			testWrk.should.throw( 'duration should be a number and is greater than 0' );

		} );

	} );

} );
