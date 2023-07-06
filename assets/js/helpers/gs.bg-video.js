/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Background Video Helper
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    $.GSCore.helpers.GSBgVideo = {
        // Init Function
        init: function (el) {
            var $selector = $(el);
            $selector.gsBgVideo();
        }
    };
})(jQuery);
