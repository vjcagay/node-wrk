var Wrk = require( '../lib/node-wrk' );
require( 'should' );

describe( 'node-wrk -- baseUrl', function () {

	var testConfig = {
	   'threads'     : 1,
	   'connections' : 1,
	   'duration'    : 1,
	   'baseUrl'     : 'http://localhost:4000',
	   'luaScript'   : './test.lua'
	};

	afterEach( function () {
		testConfig.baseUrl = 'http://localhost:4000';
	} );

	describe( 'should require "baseUrl"', function () {

		before( function () {
			delete testConfig.baseUrl;
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( TypeError );
			testWrk.should.throw( 'baseUrl is required' );

		} );

	} );

	describe( '"baseUrl" should be in a correct format', function () {

		describe( '"baseUrl" is blank', function () {

			before( function () {
				testConfig.baseUrl = '';
			} );

			var testWrk = ( function () {
				new Wrk( testConfig );
			} );

			it( 'should return an error', function () {

				testWrk.should.throw( Error );
				testWrk.should.throw( 'baseUrl is not of the correct type or format' );

			} );

		} );

		describe( '"baseUrl" is in a wrong format', function () {

			before( function () {
				testConfig.baseUrl = 'skgndf';
			} );

			var testWrk = ( function () {
				new Wrk( testConfig );
			} );

			it( 'should return an error', function () {

				testWrk.should.throw( Error );
				testWrk.should.throw( 'baseUrl is not of the correct type or format' );

			} );

		} );

		describe( '"baseUrl" is not a string', function () {

			before( function () {
				testConfig.baseUrl = 1;
			} );

			var testWrk = ( function () {
				new Wrk( testConfig );
			} );

			it( 'should return an error', function () {

				testWrk.should.throw( Error );
				testWrk.should.throw( 'baseUrl is not of the correct type or format' );

			} );

		} );

	} );

} );
