/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Rating Helper
  Version: 2.5
========================================================*/
;(function ($) {
    'use strict';
    $.GSCore.helpers.GSRating = {
        // Init Function
        init: function () {
            var collection = $('.js-rating-1');
            if (!collection.length) return;
            collection.each(function () {
                var $this = $(this),
                    $target = $this.find('> *'),
                    hoverClasses = $this.data('hover-classes');
                $target.on('mouseenter', function () {
                    $(this).addClass(hoverClasses);
                    $(this).prevAll().addClass(hoverClasses);
                    $(this).nextAll().not('.click').removeClass(hoverClasses);
                });
                $target.on('mouseleave', function () {
                    $target.not('.click').removeClass(hoverClasses);
                });
                $target.on('click', function () {
                    $(this).addClass('click ' + hoverClasses);
                    $(this).prevAll().addClass('click ' + hoverClasses);
                    $(this).nextAll().removeClass('click ' + hoverClasses);
                });
            });
        }
    };
})(jQuery);
