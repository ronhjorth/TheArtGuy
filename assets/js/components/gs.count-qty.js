/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Count Quantity Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Count Quantity Function
    $.GSCore.components.GSCountQty = {
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
            this.initCountQty();
            return this.pageCollection;
        },
        initCountQty: function () {
            // Variables
            var $self = this,
                collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    $plus = $this.find('.js-plus'),
                    $minus = $this.find('.js-minus'),
                    $result = $this.find('.js-result'),
                    resultVal = parseInt($result.val(), 0);
                $plus.on('click', function (e) {
                    e.preventDefault();
                    resultVal += 1;
                    $result.val(resultVal);
                });
                $minus.on('click', function (e) {
                    e.preventDefault();
                    if (resultVal >= 1) {
                        resultVal -= 1;
                        $result.val(resultVal);
                    } else {
                        return false;
                    }
                });
                // Actions
                collection = collection.add($this);
            });
        }
    };
})(jQuery);
