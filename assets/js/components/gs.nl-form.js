/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: NL Form Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // NL Form Function
    $.GSCore.components.GSNLForm = {
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
            this.initNLForm();
            return this.pageCollection;
        },
        // Init NL Form Function
        initNLForm: function () {
            // Variables
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                var $this = $(el)[0].id;
                // Variables
                var nlform = new NLForm(document.getElementById($this));
                // Actions
                collection = collection.add($this);
            });
        }
    };
})(jQuery);
