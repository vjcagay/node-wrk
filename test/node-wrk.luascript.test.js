var Wrk = require( '../lib/node-wrk' );
require( 'should' );

describe( 'node-wrk -- luaScript', function () {

	var testConfig = {
	   'threads'     : 1,
	   'connections' : 1,
	   'duration'    : 1,
	   'baseUrl'     : 'http://localhost:4000',
	   'luaScript'   : './test.lua'
	};

	afterEach( function () {
		testConfig.luaScript = './test.lua';
	} );

	describe( 'should require "luaScript"', function () {

		before( function () {
			delete testConfig.luaScript;
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( Error );
			testWrk.should.throw( 'luaScript is required' );

		} );

	} );

	describe( '"luaScript" should not be an empty string', function () {

		before( function () {
			testConfig.luaScript = 1;
		} );

		var testWrk = ( function () {
			new Wrk( testConfig );
		} );

		it( 'should return an error', function () {

			testWrk.should.throw( Error );
			testWrk.should.throw( 'luaScript is empty or is not a string' );

		} );

	} );

} );
