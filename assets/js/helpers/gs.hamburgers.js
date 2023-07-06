/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Hamburgers Plugin Helper
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    $.GSCore.helpers.GSHamburgers = {
        // Init Function
        init: function (selector) {
            if (!selector || !$(selector).length) return;
            var hamburgers = $(selector), timeoutid; hamburgers.each(function (i, el) {
                var $this = $(this);
                if ($this.closest('button').length) {
                    $this.closest('button').get(0).addEventListener('click', function (e) {
                        var $self = $(this), $hamburger = $self.find(selector);
                        if (timeoutid) clearTimeout(timeoutid);
                        timeoutid = setTimeout(function () {
                            $hamburger.toggleClass('is-active');
                        }, 10);
                        e.preventDefault();
                    }, false);
                } else {
                    $this.get(0).addEventListener('click', function (e) {
                        var $self = $(this);
                        if (timeoutid) clearTimeout(timeoutid);
                        timeoutid = setTimeout(function () {
                            $self.toggleClass('is-active');
                        }, 10);
                        e.preventDefault();
                    }, false);
                }
            });
        }
    };
})(jQuery);
