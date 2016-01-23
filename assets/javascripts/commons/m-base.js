/**
 *
 * Created by jarvis on 11/2/15.
 */

;(function() {
  var mBase = {
    styleEle: document.createElement('style')
  };

  mBase.init = function() {
    mBase.appendStyleEle();
    mBase.setStyle();
    mBase.bind();
  };

  mBase.appendStyleEle = function() {
    document.documentElement.firstElementChild.appendChild(mBase.styleEle);
  };

  mBase.setStyle = function(){
    var htmlEle = document.documentElement;
    var clientWidth = htmlEle.clientWidth;
    var ua = navigator.userAgent;
    var styleSheet = '}';

    if(!ua.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)
      && clientWidth > 1024) {
      clientWidth = 640;
      styleSheet = ';max-width:' + clientWidth + 'px;margin-right:auto!important;margin-left:auto!important;}'
    }

    mBase.rem = clientWidth / 10;

    if(/ZTE U930_TD/.test(ua)) {
      mBase.rem *= 1.13;
    }

    if(/M351 /.test(ua)) {
      mBase.rem /= 1.05;
    }

    window.rem = mBase.rem;
    mBase.styleEle.innerHTML = "html{font-size:"
    + mBase.rem
    + "px!important;}body{font-size:"
    + 12 * (clientWidth / 320)
    + "px"
    + styleSheet;
  };

  mBase.bind = function() {
    window.addEventListener('resize', function() {
      mBase.setStyle();
    }, false);

    window.addEventListener('pageshow', function(e) {
      if(e.persisted) {
        mBase.setStyle();
      }
    }, false)
  };

  mBase.init();

  if(typeof module != 'undefined' && typeof module.export != 'undefined') {
    module.export = mBase;
  }
  else{
    window.mBase = mBase;
  }
})();

