/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Compressed Form Helper
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    $.GSCore.helpers.GSCompressedForm = {
		// Init Function
        init: function (collection) {
            if (!collection || !collection.length) return;
            this.collection = collection;
            this.collection.addClass('u-compressed-form--hidden');
            this.bindEvents();
        },
		// Bind Events Function
        bindEvents: function () {
            var self = this;
            this.collection.on('click', function (e) {
                var $this = $(this);
                if (!$this.hasClass('u-prevented')) {
                    e.preventDefault();
                    $this.removeClass('u-compressed-form--hidden').addClass('u-prevented');
                    $this.find('input').focus();
                }
            });
            $(document).on('click.uSearchform', function (e) {
                if ($(e.target).closest('.u-compressed-form').length) return;
                self.collection.addClass('u-compressed-form--hidden').removeClass('u-prevented');
            });
        }
    };
})(jQuery);
