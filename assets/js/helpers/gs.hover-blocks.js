/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Charts Helper
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    $.GSCore.helpers.GSHoverBlocks = {
		// General Function
        papercut: function () {
            var collection = $('.g-block-hover__additional--pappercut-front, .g-block-hover__additional--pappercut-back');
            if (!collection.length) return;
            collection.each(function () {
                var $this = $(this), clipArea = $this.closest('.g-block-hover').outerHeight() / 2 + 60;
                $this.css('background-image', 'url(' + $this.children('img').hide().attr('src') + ')');
                if ($this.hasClass('g-block-hover__additional--pappercut-front')) {
                    $this.css('clip', 'rect(0px, auto, ' + clipArea + 'px, 0px)');
                } else {
                    $this.css('clip', 'rect(' + clipArea + 'px, auto, auto, 0px)');
                }
            });
        }
    };
})(jQuery);
