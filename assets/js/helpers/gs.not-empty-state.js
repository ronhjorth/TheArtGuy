/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Not Empty State Helper
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    $.GSCore.helpers.GSNotEmptyState = {
        // Init Function
        init: function () {
            var collection = $('input:not([type="checkbox"], [type="radio"]), textarea');
            if (!collection.length) return;
            collection.on('keyup', function () {
                var $this = $(this), thisVal = $this.val();
                if (thisVal !== 0) {
                    $this.addClass('g-state-not-empty');
                } else {
                    $this.removeClass('g-state-not-empty');
                }
            });
        }
    };
})(jQuery);
