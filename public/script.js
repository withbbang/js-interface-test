'use strict';

(function isMobile() {
  const { userAgent } = navigator;

  if (/android/i.test(userAgent)) {
    console.log('Android');
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    console.log('IOS');
  } else {
    console.log('Redirect');
  }
})();
