/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Svg Map Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Svg Map Function
    $.GSCore.components.GSSvgMap = {
        // Base Configuration
        _baseConfig: {
            map: 'world_mill_en',
            zoomOnScroll: false
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initSvgMap();
            return this.pageCollection;
        },
        // Init SvgMap Function
        initSvgMap: function () {
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
                $this.vectorMap(config);
                // Actions
                collection = collection.add($this);
            });
        }
    };
})(jQuery);
