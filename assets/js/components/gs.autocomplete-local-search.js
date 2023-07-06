/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Autocomplete Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Autocomplete Widget
    $.widget('custom.localcatcomplete', $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu('option', 'items', '> :not(.ui-autocomplete-category)');
        },
        _renderItem: function (ul, item) {
            if (item.url) {
                return $('<li><a href="' + window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1] + '/' + item.url + '">' + item.label + '<span class="g-opacity-0_3 g-ml-5">· ' + item.category + '</span></a></li>')
                    .appendTo(ul);
            } else {
                return $('<li>' + item.label + '</li>')
                    .appendTo(ul);
            }
        }
    });
    // Autocomplete Function
    $.GSCore.components.GSLocalSearchAutocomplete = {
        // Base Configuration
        _baseConfig: {
            minLength: 2
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
            this.initAutocomplete();
            return this.pageCollection;
        },
        initAutocomplete: function () {
            // Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                var $this = $(el),
                    dataUrl = $this.data('url');
                $.getJSON(dataUrl, function (data) {
                    $this.localcatcomplete({
                        delay: 0,
                        source: data,
                        select: function (event, ui) {
                            window.location = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1] + '/' + ui.item.url;
                        }
                    });
                });
                // Actions
                collection = collection.add($this);
            });
        }
    };
})(jQuery);
