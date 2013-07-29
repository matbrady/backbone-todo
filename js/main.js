(function() {
  'use strict';

  /**
   * RequireJS Configuration
   *
   * Contains configuration controls for both development 
   * and production 
   */

  // Sets Global NoCache 
  window.REQUIRE_NOCACHE = window.REQUIRE_NOCACHE || true;

  // Name libraries / plugins
  var config = {

    /** 
     * DEVELOPMENT 
     *
     * The below lines should be commented before pushing to production
     * - enforceDefine : causes error when modules are loaded that don't
     *     use a define method. ie non AMD compliant libraries 
     * - waitSeconds : Timeout for loading scripts
     */ 
    enforceDefine: true,

    waitSeconds: 200,
    
    /** 
     * PRODUCTION 
     */ 
    urlArgs: !!REQUIRE_NOCACHE ? "bust="+(new Date()).getTime() : '',

    paths: {
      "poly": "polyfills",
      "jquery": "lib/jquery",
      "underscore": "lib/underscore",
      "backbone": "lib/backbone",
      "localstorage": "lib/backbone.localStorage"
      // "raphael": "lib/raphael",
      // "require": "lib/require",
      // "usMap": "lib/usMap"
    }

  };

  // Predefine Require setup, or configure existing library:
  if (typeof require == 'undefined') {
    require = config;
  } 
  else if (typeof requirejs == 'function') {
    requirejs.config(config);
  }

  /* End RequireJS Configuration */



  /**
   * Application Setup and Bootstrap
   *
   * @require
   *   detection : non-jquery id/class detection
   */
  define(['poly/detection'], function( detection ) {

    function setup() {
        var mods = [];
        
        if (!window.JSON) {      // << test for native JSON support.
            mods.push('poly/json3');  // << fill in with shim if missing.
        }
        
        require(mods, bootstrap);
    };

    function bootstrap() {
        var mods = [];

        if ( detection.has('#todo') ) {
          // mods.push('demo/todos');
        }

        if ( detection.has('#todoapp')) {
          mods.push('app/todo');
        }

        require(mods);
    }

    setup();


  });
  
}());