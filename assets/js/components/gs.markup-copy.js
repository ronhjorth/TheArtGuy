/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Markup Copy Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Markup Copy Function
    $.GSCore.components.GSMarkupCopy = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
              return;
            }
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initMarkupCopy();
            return this.pageCollection;
        },
        // Init Markup Copy Function
        initMarkupCopy: function () {
            // Variables
            var $self = this, collection = $self.pageCollection, shortcodeArr = {};
            $('[data-content-target]').each(function () {
                var $this = $(this), contentTarget = $this.data('content-target');
                shortcodeArr[contentTarget] = $(contentTarget).html().replace(/&quot;/g, /&quot;/g).replace(/type=\"text\/plain\"/g, '');
            });
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var windW = $(window).width(),
                    // Tabs
                    $this = $(el),
                    defaultText = $this.get(0).lastChild.nodeValue;
                $this.on('click', function (e) {
                    e.preventDefault();
                });
                new ClipboardJS(el, {
                    text: function (button) {
                        // Variables
                        var target = $(button).data('content-target');
                        // Actions
                        return shortcodeArr[target];
                    }
                }).on('success', function () {
                    // Variables
                    var successText = $this.data('success-text');
                    $this.get(0).lastChild.nodeValue = ' ' + successText + ' ';
                    setTimeout(function () {
                        $this.get(0).lastChild.nodeValue = defaultText;
                    }, 800);
                });
                // Actions
                collection = collection.add(el);
            });
        }
    };
})(jQuery);
