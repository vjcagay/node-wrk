'use strict';

var express = require( 'express' );
var Wrk     = require( '../lib/node-wrk' );
require( 'should' );

describe( 'node-wrk -- runBenchmark', function () {

	var wrk;
	var server;
	var app;

	describe( 'server is running -- benchmark set for 2s', function () {

		var testConfig = {
		   'threads'     : 1,
		   'connections' : 1,
		   'duration'    : 2,
		   'baseUrl'     : 'http://localhost:9759',
		   'luaScript'   : 'test/test.lua'
		};

		var isGETSuccessful = false;

		before( function () {

			server = express();

			server.get( '/test', function( req, res ) {
				res.send( 'Hello, World! in GET' );
			} );

			app = server.listen( 9759 );

		} );

		before( function ( done ) {

			wrk = new Wrk( testConfig );

			wrk.runBenchmark( function ( err, output ) {

				if( !err )
					isGETSuccessful = true;

				done();

			} );

		} );

		after( function ( done ) {
			app.close( function () {
				done();
			} );
		} );

		it( 'GET request should be successful', function () {
			isGETSuccessful.should.equal( true );
		} );

	} );

	describe( 'server is NOT running', function () {

		var testConfig = {
		   'threads'     : 1,
		   'connections' : 1,
		   'duration'    : 2,
		   'baseUrl'     : 'http://localhost:9759',
		   'luaScript'   : 'test/test.lua'
		};

		var isGETSuccessful = false;

		before( function ( done ) {
			wrk = new Wrk( testConfig );

			wrk.runBenchmark( function ( err, output ) {

				if ( err )
					isGETSuccessful = false;

				done();

			} );

		} );

		it( 'GET request should NOT be successful', function () {
			isGETSuccessful.should.equal( false );
		} );

	} );

} );
