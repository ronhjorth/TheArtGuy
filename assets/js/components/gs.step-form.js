/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Step Form Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Step Form Function
    $.GSCore.components.GSStepForm = {
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
            this.initStepForm();
            return this.pageCollection;
        },
        // Init Step Form Function
        initStepForm: function () {
            // Variables
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    progressID = $this.data('progress-id'),
                    $progressItems = $(progressID).find('> *'),
                    stepsID = $this.data('steps-id'),
                    $stepsItems = $(stepsID).find('> *'),
                    $stepsActiveItem = $(stepsID).find('> .active');
                $stepsItems.not('.active').hide();
                $progressItems.eq($stepsActiveItem.index()).addClass('active');
                $('[data-next-step]').on('click', function (e) {
                    if ((!$(el).valid())) {
                        return false;
                    }
                    e.preventDefault();
                    var $this = $(this), nextID = $this.data('next-step');
                    $progressItems.removeClass('active');
                    $progressItems.eq($(nextID).index() - 1).addClass('g-checked');
                    $progressItems.eq($(nextID).index()).addClass('active');
                    $stepsItems.hide().removeClass('active');
                    $(nextID).fadeIn(400).addClass('active');
                });
                // Actions
                collection = collection.add($this);
            });
        }
    };
})(jQuery);
