"use strict";

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    fs = require('fs'),
    inject = require("gulp-inject"),
    runSequence = require('run-sequence'),
    rename = require("gulp-rename"),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    prompt = require('gulp-prompt'),
    run = require("gulp-run"),
    exec = require('child_process').exec,
    notify = require('gulp-notify'),
    sentences,
    num,
    result,
    task,
    port_number,
    app_path;


if(production){
  port_number = config.servers.ports.prodServer;
  app_path = config.servers.nginx.app_path;
}else{
  port_number = config.servers.ports.devServer;
  app_path = APP_PATH + "/" + BUILD_FOLDER;
}


/*
  This function will ask for password to do sudo command
 */
var askForPermission = function(callback){
  gutil.log(  chalk.bgBlue.white.bold('[ NGINX server ] is Asking for permission') );
  gutil.beep();
  gulp.src(config.paths.src.index)
    .pipe(notify('You need to enter your system password to start NGINX server'))
    .pipe(
      prompt.prompt({
      type: 'password',
      name: 'pass',
      message: 'You need a permission to proceed. Please type your sudo password:'
    }, function(res){
      exec("echo "+res.pass+" | sudo -S whoami",function(error, stdout, stderr){
        if(error){
          throw error;
        }else{
          console.log("Successfully running as "+stdout);
          callback();
        }
      })
    }))
};

/*
  This function will check if the user is a sudoer.
 */
var checkPermission = function(callback){
  run("[ $(sudo -n uptime 2>&1|grep 'load'|wc -l) -gt 0  ]").exec(function(info){
    if(info === "null" || info === null || production){
      console.log("Already running as a Sudoer");
      callback();
      
    }else{
      askForPermission(callback);
    }
  }) 
};

/*
  This function will execute nginx command if given sudo permission.
 */
var handleNginx = function(notice,command,result, isStart){
  exec("pgrep 'nginx' | wc -l", function(error,output,input){
    var isNginxRunning = (parseInt(output) > 0);
    var execCommand = function(){
      checkPermission(function(){
        run("sudo nginx -c " + config.servers.nginx.config + command).exec(function(){
          console.log(result);
        });
      });
    }
    if(isStart){
      if(isNginxRunning){
        console.log(notice);
      }else{
        execCommand();
      }
    }else{
      if(isNginxRunning){
       execCommand();
      }else{
        console.log(notice);
      }
    }
    
  });
}

module.exports = gulp.task('nginx', function(){
  checkPermission(function(){
    
    if(production){
      runSequence(
        [ "nginx:message", "nginx:config", "nginx:mime" ]
      );
    }else{
      runSequence(
        [ "nginx:message", "nginx:config", "nginx:mime" ],
        "nginx:start",
        ["open","test"]
      );
    }
  });
});

module.exports = gulp.task('nginx:mime', function(){
  return gulp.src(config.servers.nginx.mime)
    .pipe(gulp.dest(config.paths.dest.targets.index));
});


// This will translate nginx.temp into nginx.conf with application path and port information
module.exports = gulp.task('nginx:config', function(){
  gulp.src(config.servers.nginx.template)
  .pipe(inject(gulp.src(config.paths.src.index, {read: false}), {
    starttag: '# start - {{APP_PATH_SETUP}}',
    endtag: '# end - {{APP_PATH_SETUP}}',
    transform: function (filepath, file, i, length) {
      return "set $APP_PATH " + app_path + ";";
    }
  }))
  .pipe(inject(gulp.src(config.paths.src.index, {read: false}), {
    starttag: '# start - {{PORT}}',
    endtag: '# end - {{PORT}}',
    transform: function (filepath, file, i, length) {
      return "listen " + port_number + ";";
    }
  }))
  .pipe(rename("nginx.conf"))
  .pipe(gulp.dest(config.servers.nginx.dir));
});

// This will start nginx server if it's not running yet
module.exports = gulp.task("nginx:start", function(){
  var notice = "there is already a running nginx server.",
      command = "",
      result = "nginx started",
      isStart = true;
  handleNginx(notice,command,result,isStart);
});

// This will reload nginx configuration if the server is running already
module.exports = gulp.task("nginx:reload", [ "nginx:config" ], function(){
  var notice = "there is no running nginx server.",
      command = " -s reload",
      result = "nginx config reloaded.",
      isStart = false;
  handleNginx(notice,command,result,isStart);
});

// This will stop nginx server if it's running already
module.exports = gulp.task("nginx:stop", function(){
  var notice = "echo there is no running nginx server. ",
      command = " -s stop",
      result = "echo nginx server stopped.",
      isStart = false;
  handleNginx(notice,command,result,isStart);
});

// This will output a message 
module.exports = gulp.task('nginx:message', function(){
  gutil.log(  chalk.bgBlue.white.bold('[ NGINX server ] is running on PORT:'+chalk.red.bold(port_number)) );
});