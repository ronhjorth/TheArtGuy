/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Background video Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Background video Function
    $.GSCore.components.GSBgVideo = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initBgVideo();
            return this.pageCollection;
        },
        initBgVideo: function () {
            // Variables
            var $this = this,
                collection = $this.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $bgVideo = $(el);
                $bgVideo.gsBgVideo();
                // Add object to collection
                collection = collection.add($bgVideo);
            });
        }
    };
})(jQuery);
