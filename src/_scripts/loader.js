// Asynchronous Script Loading done the Proper way cross browser

'use strict';

let

  stateChange = function (pendingScripts, topScript) {
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

  loadScript = function (scripts) {
    let
      appendFrag = document.createDocumentFragment(),
      script,
      src = '',
      pendingScripts = [],
      topScript = document.scripts[0];

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
        script.onreadystatechange = (pendingScripts, topScript) => {
          stateChange(pendingScripts, topScript);
        };
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

export default {stateChange, loadScript};