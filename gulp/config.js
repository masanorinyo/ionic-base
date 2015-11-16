global.APP_NAME = "ionic-base";
global.APP_PATH = __dirname+"/..";
global.REPORT_PATH = APP_PATH + "/report";
global.SRC_FOLDER = 'src';
global.BUILD_FOLDER = 'www';
global.TMP_FOLDER = '.tmp';
global.TEMP_FROM_SRC_FOLDER = '../../' + TMP_FOLDER;
global.MODULE_TEMP = APP_PATH + "/gulp/scaffold_template";


global.config = {
  paths: {
    src: {
      app : SRC_FOLDER + "/app",
      assets: SRC_FOLDER + '/app/**/assets',
      svgs: SRC_FOLDER + '/app/**/assets/svg/*',
      fonts: SRC_FOLDER + '/app/**/assets/fonts/**/*',
      images: [ 
        SRC_FOLDER + '/app/**/assets/images/*',
        SRC_FOLDER + '/app/*.png'
      ],
      scriptsGlob: './' + SRC_FOLDER + '/app/index.js',
      scripts: SRC_FOLDER + '/app/**/*.js',
      stylesGlob: SRC_FOLDER + '/app/index.scss',
      styles:SRC_FOLDER + '/app/**/*.scss', 
      index: SRC_FOLDER + '/index.jade',
      templates: SRC_FOLDER + '/app/**/*.jade',
      e2e: "e2e/**/*.js",
      i18n: SRC_FOLDER + "/app/i18n/*.json",
      bower_directory: SRC_FOLDER + "/bower_components",
      constants: APP_PATH + "/" + SRC_FOLDER + "/app/constants.json",
      vendors: [
        SRC_FOLDER + "/vendors/dropbox-js-datastore-sdk-1.2.0/lib/dropbox-datastores-1.2.0.js",
        SRC_FOLDER + "/vendors/ngCordova/dist/ng-cordova.js"
      ],
      misc: SRC_FOLDER+"/{,favicons/*,*.txt,*.png,.htaccess,robots.txt}",
      data: SRC_FOLDER + "/data/**/*.json"
    },
    dest: {
      development: {
        styles: TMP_FOLDER + "/app",
        scripts: TMP_FOLDER + "/app",
        images: TMP_FOLDER + "/app",
        assets: TMP_FOLDER + "/app",
        fonts: TMP_FOLDER + "/app",
        bowerFonts: TMP_FOLDER + "/app/common/assets/fonts",
        index: TMP_FOLDER,
        indexFile: TMP_FOLDER+"/index.html",
        bower: TMP_FOLDER,
        html: TMP_FOLDER,
        i18n: TMP_FOLDER + "/app",
        vendors : TMP_FOLDER + "/vendors"
      },
      targets: {
        app: BUILD_FOLDER + "/app",
        styles: BUILD_FOLDER + "/app",
        scripts: BUILD_FOLDER + "/app",
        images: BUILD_FOLDER + '/app',
        assets: BUILD_FOLDER + '/app',
        fonts: BUILD_FOLDER + '/app',
        bowerFonts: BUILD_FOLDER + "/app/common/assets/fonts",
        index: BUILD_FOLDER,
        bower: BUILD_FOLDER,
        htmls: BUILD_FOLDER + "/app/**/*.html",
        template: SRC_FOLDER,
        i18n: BUILD_FOLDER + "/app/i18n",
        revinfo : BUILD_FOLDER + "/app",
        vendors : BUILD_FOLDER + "/vendors"
      }
    }
  },
  files: {
    cachebust : {
      manifest:  BUILD_FOLDER + "/app/manifest.json",
      targets : {
        libs : BUILD_FOLDER + "/libs*.js",
        index : BUILD_FOLDER + "/index.html",
        scripts : BUILD_FOLDER + "/app/*.js",
        assets : BUILD_FOLDER + "/app/**/assets/**/*",
        vendors : BUILD_FOLDER + "/*.js",
        styles: BUILD_FOLDER + "/app/*.css",
        favicons: BUILD_FOLDER + "/favicons/*"
      }
    },
    names: {
      development: {
        index: "index",
        styles: 'bundle',
        scripts: 'bundle',
        libs: "libs",
        vendors: "vendors"

      },
      targets: {
        index: "index",
        styles: 'bundle.min',
        scripts: 'bundle.min',
        libs: "libs.min",
        vendors: "vendors.min"
      }
    }
  },
  servers : {
    // server configuration for development
    browserSyncConfig : {
      initFiles: [ SRC_FOLDER, TMP_FOLDER ],
      watchFiles: [
        TMP_FOLDER + '/app/*.css',
        TMP_FOLDER + '/assets/**/*'
      ]
    },
    // server configuration for built
    nginx: {
      app_path: "html",
      mime: APP_PATH + "/config/nginx/mime.types",
      dir: APP_PATH + "/" + BUILD_FOLDER + "/",
      config: APP_PATH + "/" + BUILD_FOLDER + "/nginx.conf",
      logs: APP_PATH + "/" + BUILD_FOLDER+"/",
      template: APP_PATH+"/config/nginx/nginx.conf.temp"
    },
    host : {
      ip : "http://localhost"
    },
    ports: {
      prodServer: 80,
      devServer: 8100,
      testServer: 8101
    }
  },
  others : {
    analysis: {
      path : APP_PATH + "/report/index.html"
    },
    coverage: {
      path : APP_PATH + "/coverage/report-html/index.html"
    },
    jshint: {
      defaultConf : {
        "undef": true,
        "node": true,
        "sub" : true,
        "indent":2,
        "predef": [ "module", "angular", "Modernizr","_","$","describe","beforeEach","it","expect", "window", "StatusBar", "cordova", "inject", "xdescribe","xit","spyOn","afterEach"]
      },
      customizedConf: {
        dev: {
          "unused": false,
        },
        prd: {
          "unused": true,
        }
      }
    },
    protractor: {
      seleniumAddress : "\n seleniumServerJar: '../../node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar',",
      config: {
        temp :{
          dev: APP_PATH + "/config/protractor/protractor.config.dev.js",
          prd: APP_PATH + "/config/protractor/protractor.config.prd.js",
        },
        name : "protractor.config",
        dest : TMP_FOLDER + "/protractor"
      },
      files :  APP_PATH + "/e2e/**/*.js"
    },
    karma : {
      all : APP_PATH+'/config/karma/karma.conf.all.js',
      single : APP_PATH+'/config/karma/karma.conf.single.js'
    }
  }
};
