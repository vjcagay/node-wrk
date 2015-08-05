# node-wrk

`npm install node-wrk`

Node wrapper for [wrk](https://github.com/wg/wrk). Executes `wrk` command and parses its output to your Node application.

#### Usage example
```javascript
var Wrk = require( 'node-wrk' );

var testConfig = {
   'threads'     : 100,
   'connections' : 100,
   'duration'    : 5,
   'baseUrl'     : 'http://localhost:4000',
   'luaScript'   : './test.lua'
};

var wrk = new Wrk( testConfig );

wrk.runBenchmark( function ( err, output ) {
    console.log( output );
} );
```

Required parameters:

- `threads`
- `connections`
- `duration` in seconds
- `baseUrl` which would be your server's base URL
- `luaScript` which is the LUA script file that contains your benchmark

Returns:

- `err` if an error occurs
- `output` the `wrk` results after a successful benchmark

#### Important

Make sure [wrk](https://github.com/wg/wrk) is installed in your host machine and is accessible globally. You can grab and compile it from source code.
