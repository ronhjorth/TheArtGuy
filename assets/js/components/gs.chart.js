/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Charts Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
	// Charts Function
    $.GSCore.components.GSChart = {
        // Spark Line Charts
        sparkline: {
            // Base plugin's configuration
            _baseConfig: {
                fillColor: '#111111',
                lineColor: '#111111',
                barColor: '#111111'
            },
            // Collection of all initialized items of the page
            _pageCollection: $(),
            // Initializes new collection of items
            init: function (collection) {
                var self = this;
                if (!collection || !collection.length) return $();
                return collection.each(function (i, el) {
                    var $this = $(el),
                        config = $.extend(true, {}, self._baseConfig, $this.data());
                    $this.sparkline($this.data('data'), config);
                    self._pageCollection = self._pageCollection.add($this);
                });
            },
            get: function (index) {
                if (index) {
                    return this._pageCollection.eq(index);
                }
                return this._pageCollection;
            }
        },
        peity: {
            _baseConfig: {
                fill: ''
            },
            _pageCollection: $(),
            init: function (collection, config) {
                var self = this;
                if (!collection || !collection.length) return $();
                config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
                return collection.each(function (i, el) {
                    var $this = $(el),
                        currentConfig = $.extend(true, {}, config, $this.data());
                    $this.peity($this.data('peity-type'), currentConfig);
                    self._pageCollection = self._pageCollection.add($this);
                });
            },
            get: function (index) {
                if (index) {
                    return this._pageCollection.eq(index);
                }
                return this._pageCollection;
            }
        }
    };
})(jQuery);
