// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

// import $ from 'jquery';
import Link from '../_modules/link/link';
import * as loader from './loader';
import Preloadcart from '../_modules/preloadcart/preloadCart';

// first load all dependent libs
let loadScripts = ( () => {


  loader.loadScript(['https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js'])
  .then(() => {
    return loader.loadScript(['https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js'
    ]);
  })
  .then(() => {
    // console.log('ínside then');
    document.addEventListener('readystatechange', (evt) => {
      // console.log(document.readyState);
      if (document.readyState === 'complete') {
        let
          $ = window.jQuery;
        $( function start () {
          // console.log(this);
          // new Link(); // Activate Link modules logic
          Preloadcart($, Backbone, _);
        });
      }
    });
  });
})();





