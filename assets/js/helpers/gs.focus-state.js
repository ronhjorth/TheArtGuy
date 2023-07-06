/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Focus State Helper
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    $.GSCore.helpers.GSFocusState = {
        // Init Function
        init: function () {
            var collection = $('.input-group input:not([type="checkbox"], [type="radio"]), .input-group textarea, .input-group select');
            if (!collection.length) return;
            collection.on('focusin', function () {
                var $this = $(this), $thisParent = $this.closest('.input-group'); $thisParent.addClass('g-state-focus');
            });
            collection.on('focusout', function () {
                var $this = $(this), $thisParent = $this.closest('.input-group');
                $thisParent.removeClass('g-state-focus');
            });
        }
    };
})(jQuery);
