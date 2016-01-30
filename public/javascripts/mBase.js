/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	/**
	 *
	 * Created by jarvis on 11/2/15.
	 */

	;(function () {
	  var mBase = {
	    styleEle: document.createElement('style')
	  };

	  mBase.init = function () {
	    mBase.appendStyleEle();
	    mBase.setStyle();
	    mBase.bind();
	  };

	  mBase.appendStyleEle = function () {
	    document.documentElement.firstElementChild.appendChild(mBase.styleEle);
	  };

	  mBase.setStyle = function () {
	    var htmlEle = document.documentElement;
	    var clientWidth = htmlEle.clientWidth;
	    var ua = navigator.userAgent;
	    var styleSheet = '}';

	    if (!ua.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && clientWidth > 1024) {
	      clientWidth = 640;
	      styleSheet = ';max-width:' + clientWidth + 'px;margin-right:auto!important;margin-left:auto!important;}';
	    }

	    mBase.rem = clientWidth / 10;

	    if (/ZTE U930_TD/.test(ua)) {
	      mBase.rem *= 1.13;
	    }

	    if (/M351 /.test(ua)) {
	      mBase.rem /= 1.05;
	    }

	    window.rem = mBase.rem;
	    mBase.styleEle.innerHTML = "html{font-size:" + mBase.rem + "px!important;}body{font-size:" + 12 * (clientWidth / 320) + "px" + styleSheet;
	  };

	  mBase.bind = function () {
	    window.addEventListener('resize', function () {
	      mBase.setStyle();
	    }, false);

	    window.addEventListener('pageshow', function (e) {
	      if (e.persisted) {
	        mBase.setStyle();
	      }
	    }, false);
	  };

	  mBase.init();

	  if (typeof module != 'undefined' && typeof module.export != 'undefined') {
	    module.export = mBase;
	  } else {
	    window.mBase = mBase;
	  }
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module)))

/***/ },

/***/ 7:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }

/******/ });