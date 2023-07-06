/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Demo Icons
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    $('.js-icons-demo-item__value').each(function () {
        var IconsValue = $(this).siblings('.u-icon-v1').children().attr('class');
        $(this).val(IconsValue);
    });
    $('.js-icons-demo-item__value-2').each(function () {
        var IconsValue = $(this).siblings('.u-icon-v1').children().text();
        $(this).val(IconsValue);
    });
})(jQuery);
