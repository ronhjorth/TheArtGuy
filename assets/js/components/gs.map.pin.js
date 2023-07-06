/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Map Pin Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Map Pin Function
    $.GSCore.components.GSPinMap = {
        // Base Configuration
        _baseConfig: {
            responsive: true,
            popover: {
                show: false,
                animate: true
            }
        },
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
            this.initPinMap();
            return this.pageCollection;
        },
        // Init Map Pin Function
        initPinMap: function () {
            // Variables
            var $self, config, collection;
            // Variables Values
            $self = this;
            config = $self.config;
            collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this;
                // Variables Values
                $this = $(el);
                $this.easypinShow(config);
                // Actions
                collection = collection.add($this);
            });
        }
    };
})(jQuery);
