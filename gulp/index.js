'use strict';

var fs = require('fs'),
    argv = require('yargs').argv,
    tasks = fs.readdirSync('./gulp/tasks/'),
    minimist = require('minimist'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    knownOptions = {
      string: 'env',
      default: { env: null }
    };

var options = minimist(process.argv.slice(2), knownOptions);

//==== these need to run before "require('./config')" ===/
// platform
global.ios = argv.ios;
global.android = argv.android;
global.mobile = ( global.android || global.ios );
// env
global.production = argv.production;
global.staging = argv.staging;
//========================================================/

require('./config');

// other params
global.all = argv.all;
global.local = argv.local;
global.ghostOn = argv.ghostOn;
global.test = argv.test;
global.nolint = argv.nolint;
global.safari = argv.safari;
global.phantom = argv.phantom;
global.firefox = argv.firefox;
global.chrome = argv.chrome;
global.edge = argv.edge;
global.ie11 = argv.ie11;
global.ie10 = argv.ie10;
global.ie9 = argv.ie9;
global.ie8 = argv.ie8;
global.ie = ie11 || ie10 || ie9 || ie8;



// production is used for circle ci to build docker image
// it won't run nginx because CI uses nginx base image to create a docker image
// * if you would like to build the app with API running on actual production server, specify the name of the API by passing argument (ex: gulp --staging --env stg )
if( production ){
  global.dest = "built";
  global.env = "production";
}else if( staging ){
  global.dest = "built";
  global.env = "staging";
}else{
  global.dest = "development";
  global.env = "development";
}

// outputing the environment information in console
gutil.log(  chalk.green('[ ENVIRONMENT ] : '+chalk.bold( env )) );
// 
tasks.forEach(function (task) {
  require('./tasks/' + task);
});
