/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Modal Event Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Modal Event Function
    $.GSCore.components.GSModalEvent = {
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
            this.initModalEvent();
            return this.pageCollection;
        },
        // Init Modal Event Function
        initModalEvent: function () {
            // Variables
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el), eventType = $this.data('event-type');
                if (eventType === 'scrollOnce') {
                    $self.scrollOnce(el);
                } else if (eventType === 'callAfterTime') {
                    $self.callAfterTime(el);
                } else if (eventType === 'scrollSequential') {
                    $self.scrollSequential(el);
                } else if (eventType === 'exitIntent') {
                    $self.exitIntent(el);
                }
                // Actions
                collection = collection.add($this);
            });
        },
        scrollOnce: function (el) {
            var counter = 0;
            $(window).on('scroll', function () {
                var $this = $(el),
                    event = $this.data('event'),
                    thisOffsetTop = $this.offset().top;
                if (counter === 0) {
                    if ($(window).scrollTop() >= thisOffsetTop) {
                        counter += 1;
                    }
                }
            });
        },
        scrollSequential: function (el) {
            var counter = 0;
            $(window).on('scroll', function () {
                var $this = $(el),
                    eventFirst = $this.data('event-first'),
                    eventSecond = $this.data('event-second'),
                    thisOffsetTop = $this.offset().top;
                if (counter === 0) {
                    if ($(window).scrollTop() >= thisOffsetTop) {
                        counter += 1;
                    }
                } else if (counter === 1) {
                    if ($(window).scrollTop() < thisOffsetTop) {
                        counter -= 1;
                    }
                }
            });
        },
        callAfterTime: function (el) {
            var $this = $(el),
                event = $this.data('event'),
                time = $this.data('time');
            setTimeout(function () {

            }, time);
        },
        exitIntent: function (el) {
            var $this = $(el), event = $this.data('event');
            $('html').mouseleave(function () {
                $('html').unbind('mouseleave');
            });
        }
    };
})(jQuery);
