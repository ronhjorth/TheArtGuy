/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Rating Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
	// Rating Function
    $.GSCore.components.GSRating = {
		// Base Configuration
        _baseConfig: {
            rtl: false,
            containerClass: 'g-rating',
            backwardClass: 'g-rating-backward',
            forwardClass: 'g-rating-forward',
            spacing: 0
        },
		// Page Collection
        _pageCollection: $(),
		// Init Function
        init: function (collection, config) {
            if (!collection || !collection.length) return;
            config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
            var self = this;
            return collection.each(function (i, el) {
                var $this = $(el);
                config = $.extend(true, {}, config, $this.data());
                if (!$this.data('rating-instance')) {
                    $this.data('rating-instance', new Rating($this, $this.data('rating'), config));
                    self._pageCollection = self._pageCollection.add($this);
                }
            });
        }
    };
    // Rating constructor function
    function Rating(element, value, config) {
        this.value = value;
        this.element = element;
        this.config = config;
        this.init();
    }
    // Initializes single rating item
    Rating.prototype.init = function () {
        var self = this;
        this.container = $('<div></div>', {
            class: self.config.containerClass,
            style: 'display: inline-block; position: relative; z-index: 1; white-space: nowrap;'
        });
        this.forward = $('<div></div>', {
            class: self.config.forwardClass,
            style: $('html[dir="rtl"]').length ? 'position: absolute; right: 0; top: 0; height: 100%; overflow: hidden;' : 'position: absolute; left: 0; top: 0; height: 100%; overflow: hidden;'
        });
        this.backward = $('<div></div>', {
            class: self.config.backwardClass,
            style: 'position: relative; z-index: 1;'
        });
        for (var i = 0; i < 5; i++) {
            var starEmpty = $('<i></i>', {
                    class: self.element.data('backward-icons-classes') ? self.element.data('backward-icons-classes') : 'fa fa-star-o'
                }),
                starFilled = $('<i></i>', {
                    class: self.element.data('forward-icons-classes') ? self.element.data('forward-icons-classes') : 'fa fa-star'
                });
            this.forward.append(starFilled);
            this.backward.append(starEmpty);
        }
        this.container.append(this.forward);
        this.container.append(this.backward);
        this.element.append(this.container);
        this.forward.css('width', this.value / 5 * 100 + '%');
        this.makeSpacing();
    };
    Rating.prototype.makeSpacing = function () {
        var self = this;
        this.forward.children().add(this.backward.children()).css({
            'margin-left': self.config.spacing,
            'margin-right': self.config.spacing
        });
        this.container.css({
            'margin-left': self.config.spacing * -1,
            'margin-right': self.config.spacing * -1
        });
    };
})(jQuery);
