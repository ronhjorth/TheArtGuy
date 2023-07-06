/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Height Calculating Helper
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    $.GSCore.helpers.GSHeightCalc = {
        // Init Function
        init: function () {
            var collection = $('[data-calc-target]');
            if (!collection.length) return;
            collection.each(function () {
                var $this = $(this), $target = $this.data('calc-target');
                $this.css({
                    'height': 'calc(100vh - ' + $($target).outerHeight() + 'px)'
                });
            });
        }
    };
})(jQuery);
