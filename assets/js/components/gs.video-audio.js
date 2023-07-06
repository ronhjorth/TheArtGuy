/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Audio & Video Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Audio & Video Function
    $.GSCore.components.GSVideoAudio = {
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
            this.config = config && $.isPlainObject(config) ? $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initVideoAudio();
            return this.pageCollection;
        },
        // Init Audion & Video Function
        initVideoAudio: function () {
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                var $videoAudio = el;
                // Add object to collection
                collection = collection.add($videoAudio);
            });
        }
    };
})(jQuery);
