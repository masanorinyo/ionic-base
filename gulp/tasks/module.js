'use strict';

var gulp = require('gulp'),
    glob = require("glob"),
    prompt = require('gulp-prompt'),
    rename = require("gulp-rename"),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    replace = require("gulp-replace"),
    runSequence = require('run-sequence'),
    insert = require('gulp-insert'),
    module_type,
    module_name,
    module_dest,
    file_name;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelToDash(string){
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function validate_name(name){
  if(name){
    return true;
  }else{
    return "Name has to have at least one character";
  }
}

function insert_scss( insert_dest ){
  var insert_scss = "\n@import '" + insert_dest + "/"+ file_name + "';";
  gulp.src(config.paths.src.stylesGlob)
    .pipe(insert.append(insert_scss))
    .pipe(gulp.dest(config.paths.src.app))
    .on('end', function(){ 
      console.log("\n ===[ Inserted the following SCSS code ]=== ");
      console.log(insert_scss + " => " + config.paths.src.stylesGlob);
    });    
}

function insert_js( regex_text, insert_js ){
  gulp.src(config.paths.src.scriptsGlob)
    .pipe(replace(regex_text, insert_js))
    .pipe(gulp.dest(config.paths.src.app))
    .on('end', function(){
      console.log("\n ===[ Inserted the following JS code ]=== ");
      console.log(insert_js.split(regex_text)[1] + " => " + config.paths.src.scriptsGlob + "\n");
    });
}

function insert_file_path(){
  
  var script,  
      js_path, 
      regex_text,
      insert_dest = module_dest.replace("src/app/","");

  switch(module_type){
    case "module":
      regex_text = '{{INSERT-MODULE}}';
      insert_scss( insert_dest );
      break;
    
    case "service":
      regex_text = '{{INSERT-SERVICE}}';
      break;
    
    case "directive":
      regex_text = '{{INSERT-DIRECTIVE}}';
      insert_scss( insert_dest );
      break;
    
    case "filter":
      regex_text = '{{INSERT-FILTER}}';
      break;
  }
  
  // determining whether the js script as a module
  js_path = insert_dest.split("/");
  if(js_path.length > 0){
    script = regex_text + "\n  require('./"+ insert_dest + "').name,";
  }else{
    script = regex_text + "\n require('./"+ file_name + "').name,";
  }

  insert_js( regex_text, script );

  
}

function create_module(callback){
  var insert_dest = module_dest.replace("src/app/","");
  glob(module_dest,function(err,file){
    if(file.length === 0){
      var files = [];
      gulp.src(MODULE_TEMP   + "/" + module_type + "/**")
        .pipe(rename(function(path){
            if(path.basename !== "index" || path.basename !== "assets"){

              path.basename = path.basename.replace("module_name", file_name);

              files.push(module_dest + "/" +path.basename + path.extname);
            }
          })
        )
        .pipe(replace("{{APP_NAME}}", APP_NAME))
        .pipe(replace('{{MODULE_NAME}}', module_name))
        .pipe(replace('{{UPPER_MODULE}}', capitalizeFirstLetter(module_name)))
        .pipe(replace('{{MODULE_DIRECTIVE}}', camelToDash(module_name)))
        .pipe(replace('{{FILE_NAME}}', file_name))
        .pipe(replace('{{FILE_PATH}}', insert_dest))
        .pipe(gulp.dest(module_dest))
        .on('end', function(){ 
          console.log("\n ==[ Created the following files ]== \n");
          for( var i=0;i<files.length;i++){
            console.log(files[i]);  
          };
        });

      callback();
      
    }else{
      console.log("\n" + module_name + " module already exists." + "\n");
    }
  });
}

function define_module_dest( module_path ){
  // in order to create a path with double "//"
  var lastChar = module_path.charAt(module_path.length-1);
  if(lastChar==="/"){
    return module_path + file_name;  
  }else{
    return module_path + "/" + file_name;
  }
}

// this will scaffold a module 
module.exports = gulp.task("module", function(){
  
  return gulp.src(MODULE_TEMP)
    .pipe(prompt.prompt([{
        type: 'list',
        name: 'module_type',
        message: 'Which would you like to make?',
        choices: [ "module", "directive","filter","service","feature"]
    }], function(res){
      
      module_type = res.module_type
      switch(module_type){
        case "module":
          runSequence("module:module");
          break;
        case "directive":
          runSequence("module:directive");
          break;
        case "filter":
          runSequence("module:filter");
          break;
        case "service":
          runSequence("module:service");
          break;
        case "feature":
          runSequence("module:feature");
          break;
      } 
    }));
});

module.exports = gulp.task('module:module', function(){
  return gulp.src(MODULE_TEMP)
    .pipe(prompt.prompt([{
      type: 'input',
      name: 'module_name',
      message: 'What is the name of the module you want to create?',
      validate: validate_name
    },{
      type: 'input',
      name: 'module_dest',
      message: 'where would you like to store?',
      default: SRC_FOLDER+"/app"
    }], function(res){
      
      module_name = res.module_name;
      file_name = module_name.charAt(0).toLowerCase() + module_name.slice(1);
      module_dest = define_module_dest(res.module_dest);
      create_module(insert_file_path);
      

    }));
})

module.exports = gulp.task('module:directive', function(){
  return gulp.src(MODULE_TEMP)
    .pipe(prompt.prompt([{
      type: 'input',
      name: 'module_name',
      message: 'What is the name of the directive you want to create?',
      validate: validate_name
    },{
      type: 'input',
      name: 'module_dest',
      message: 'where would you like to store?',
      default: SRC_FOLDER+"/app/common/scripts/directives"
    }], function(res){
      
      module_name = res.module_name;
      file_name = module_name.charAt(0).toLowerCase() + module_name.slice(1);
      module_dest = define_module_dest(res.module_dest);
      create_module(insert_file_path);
    }));
})
module.exports = gulp.task('module:service', function(){
  return gulp.src(MODULE_TEMP)
    .pipe(prompt.prompt([{
      type: 'input',
      name: 'module_name',
      message: 'What is the name of the service you want to create?',
      validate: validate_name
    },{
      type: 'input',
      name: 'module_dest',
      message: 'where would you like to store?',
      default: SRC_FOLDER+"/app/common/scripts/services"
    }], function(res){
      
      module_name = res.module_name;
      file_name = module_name.charAt(0).toLowerCase() + module_name.slice(1);
      module_dest = define_module_dest(res.module_dest);
      create_module(insert_file_path);

    }));
})
module.exports = gulp.task('module:filter', function(){
  return gulp.src(MODULE_TEMP)
    .pipe(prompt.prompt([{
      type: 'input',
      name: 'module_name',
      message: 'What is the name of the filter you want to create?',
      validate: validate_name
    },{
      type: 'input',
      name: 'module_dest',
      message: 'where would you like to store?',
      default: SRC_FOLDER+"/app/common/scripts/filters"
    }], function(res){
      
      module_name = res.module_name;
      file_name = module_name.charAt(0).toLowerCase() + module_name.slice(1);
      module_dest = define_module_dest(res.module_dest);
      create_module(insert_file_path);
    }));
})

module.exports = gulp.task('module:feature', function(){
  return gulp.src(MODULE_TEMP)
    .pipe(prompt.prompt([{
      type: 'list',
      name: 'module_name',
      message: 'What is the name of the feature you want to create?',
      choices: ["Auth"]
    },{
      type: 'input',
      name: 'module_dest',
      message: 'where would you like to store?',
      default: SRC_FOLDER+"/app"
    }], function(res){
      console.log("\n it's not ready yet. Coming soon \n");
      // module_name = res.module_name;
      // file_name = module_name.charAt(0).toLowerCase() + module_name.slice(1);
      // module_dest = define_module_dest(res.module_dest);
      // create_module();
      // insert_file_path();

    }));
})