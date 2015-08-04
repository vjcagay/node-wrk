'use strict';

var gulp     = require( 'gulp' );
var mocha    = require( 'gulp-mocha' );
var istanbul = require( 'gulp-istanbul' );

var paths = {
    'covered' : [ 'lib/*.js' ],
    'test' :    [ 'test/*.js' ]
};

gulp.task( 'test', function () {

    return gulp.src( paths.covered )
        .pipe( istanbul() )
        .pipe( istanbul.hookRequire() )
        .on( 'finish', function () {
            gulp.src( paths.test, { 'read' : false } )
                .pipe( mocha( { 'timeout' : 5000 } ) )
                .pipe( istanbul.writeReports() );
        } );

} );
