/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Select Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Select Function
    $.GSCore.components.GSSelect = {
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
            this.initSelect();
            return this.pageCollection;
        },
        // Select Function
        initSelect: function () {
            // Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    searchMaxSelections = $this.data('max-selections'),
                    setControlClasses = $this.data('control-classes'),
                    setOpenIcon = $this.data('open-icon'),
                    setCloseIcon = $this.data('close-icon'),
                    setRtl = Boolean($this.data('rtl'));
                $this.chosen({
                    inherit_select_classes: true,
                    max_selected_options: searchMaxSelections ? searchMaxSelections : Infinity,
                    disable_search: true,
                    rtl: setRtl ? setRtl : false
                });
                if (setControlClasses) {
                    $this.next().find('.chosen-single div').addClass(setControlClasses);
                }
                if (setOpenIcon) {
                    $this.next().find('.chosen-single div b').append('<i class="' + setOpenIcon + '"></i>');

                    if (setCloseIcon) {
                        $this.next().find('.chosen-single div b').append('<i class="' + setCloseIcon + '"></i>');
                    }
                }
                // Actions
                collection = collection.add($this);
            });
        }
    };
})(jQuery);
