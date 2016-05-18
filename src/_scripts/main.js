// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

// import $ from 'jquery';
import Link from '../_modules/link/link';

// first load all dependent libs
let loadScripts = ( () => {
  let
    scripts = [
      // 'https://code.jquery.com/jquery-2.2.3.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js'
    ],
    appendFrag = document.createDocumentFragment(),
    script,
    src = '',
    pendingScripts = [],
    topScript = document.scripts[0],
    stateChange = () => {
      let pendingScript;
      while (pendingScripts[0]) {
        // if script has loaded downloading
        if (pendingScripts[0].readyState === 'loaded') {
          pendingScript = pendingScripts[0];
          // set its state change event to null so stateChange doesn't keep triggering all the while
          pendingScript.onreadystatechange = null;
          // insert this script before the topScript
          topScript.parentNode.insertBefore(pendingScript, topScript);
        }
      }
    },
    loadScript = () => {
      while (src = scripts.shift()) {
        script = document.createElement('script');
        if ('async' in topScript) {
          // for modern browsers
          script.async = false;
          appendFrag.appendChild(script);
        }
        else if (topScript.readyState) {
          // IE<10
          pendingScripts.push(script);
          script.onreadystatechange = stateChange;
        }
        else {
          script.defer = true;
          appendFrag.appendChild(script);
        }
        script.src = src;
        script.crossOrigin = 'anonymous';
      }
      document.body.appendChild(appendFrag);
      return new Promise( (resolve, reject) => {
        resolve();
      });
    };
  loadScript()
  .then(() => {
    if (!!window.jQuery) {
      let $ = window.jQuery;
      $(() => {
        new Link(); // Activate Link modules logic
        console.log('Welcome to Yeogurt!');
      });
    }
  });
})();





