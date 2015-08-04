'use strict';

var exec = require( 'exec' );

function Wrk ( config ) {

	var required = [
		'threads',
		'connections',
		'duration',
		'baseUrl',
		'luaScript'
	];

	// check if the required config params are present
	for( var param in required ) {
		if( !config.hasOwnProperty( required[ param ] ) ) {
			throw new TypeError( required[ param ] + ' is required' );
		}
	}

	// check if baseUrl is defined and is of the correct format
	if ( !config.baseUrl ||
			config.baseUrl.length < 1 ||
			typeof config.baseUrl !== 'string' ||
			!config.baseUrl.match( /^http(s)?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*?(:[0-9]+)?(\/)?$/i ) ) {

		throw new Error( 'baseUrl is not of the correct type or format' );

	}

	// check if luaScript is defined correctly
	if ( !config.luaScript ||
			config.luaScript.length < 1 ||
			typeof config.luaScript !== 'string' ) {

		throw new Error( 'luaScript is empty or is not a string' );

	}

	// check if threads, connections, and  duration are defined as numbers and are greater than 0
	for( var param in config ) {
		if ( param !== 'baseUrl' && param !== 'luaScript' ) {
			if ( typeof config[ param ] !== 'number' || config[ param ] < 1 ) {
				throw new TypeError( param + ' should be a number and is greater than 0' );
			}
		}
	}

	// if everything passes
	this.config = config;

}

Wrk.prototype.runBenchmark = function ( callback ) {

	exec( [
		'wrk',
		'-t', this.config.threads,
		'-c', this.config.connections,
		'-d', this.config.duration + 's',
		'-s', this.config.luaScript,
		this.config.baseUrl
	], function ( err, output, code ) {

		callback( err, output );

	} );

};

module.exports = Wrk;
