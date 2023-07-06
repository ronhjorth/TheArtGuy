/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Masked Input Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Masked Input Function
    $.GSCore.components.GSMaskedInput = {
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
            this.initMaskedInput();
            return this.pageCollection;
        },
        // Init Masked Input Function
        initMaskedInput: function () {
            // Variables
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el), mask = $this.data('mask'), placeholder = $this.attr('placeholder');
                $this.mask(mask, {
                    placeholder: placeholder ? placeholder : false
                });
                // Actions
                collection = collection.add($this);
            });
        }
    };
})(jQuery);
