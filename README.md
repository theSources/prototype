# prototype

[![Code Climate](https://codeclimate.com/github/theSources/prototype/badges/gpa.svg)](https://codeclimate.com/github/theSources/prototype) [![Test Coverage](https://codeclimate.com/github/theSources/prototype/badges/coverage.svg)](https://codeclimate.com/github/theSources/prototype)

This is prototype project aimed to verify **theSources** approaches before to dive into development.

## Build instructions

While it is not automated, you have to build sinon.js once to make fake server working.
Otherwise you will see error like the following
```
events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: No file for module 'underscore' found.
    at /Users/vic/Dropbox/proj/theSources/prototype/node_modules/gulp-amd-optimize/lib/trace.js:137:29
    at fn (/Users/vic/Dropbox/proj/theSources/prototype/node_modules/gulp-amd-optimize/node_modules/async/lib/async.js:582:34)
    at Object._onImmediate (/Users/vic/Dropbox/proj/theSources/prototype/node_modules/gulp-amd-optimize/node_modules/async/lib/async.js:498:34)
    at processImmediate [as _immediateCallback] (timers.js:354:15)
```

1. ```gulp bower``` - download dependencies
1. ```pushd bower_components/sinon/``` - go to sinon dir
1. ```gem install juicer```
1. ```npm install formatio lolex```
1. ```./build```
1. ```popd```
1. ```gulp build```
