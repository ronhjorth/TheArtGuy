/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Onscroll Animation Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Onscroll Animation Function
    $.GSCore.components.GSOnScrollAnimation = {
        // Base Configuration
        _baseConfig: {
            bounds: -100,
            debounce: 50,
            inViewportClass: 'u-in-viewport',
            animation: 'fadeInUp',
            animationOut: false,
            animationDelay: 0,
            animationDuration: 1000,
            afterShow: function () {
            },
            onShown: function () {
            },
            onHidded: function () {
            }
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            if (!selector || !$(selector).length) {
              return;
            }
            var self = this;
            this.config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
            appear({
                bounds: self.config['bounds'],
                reappear: false,
                debounce: self.config['debounce'],
                elements: function () {
                    return document.querySelectorAll(selector);
                },
                init: function () {
                    $(selector).each(function (i, el) {
                        var $this = $(el);
                        if (!$this.data('GSAnimationElement')) {
                            $this.data('GSAnimationElement', new GSAnimationElement($this, self.config));

                            self._pageCollection = self._pageCollection.add($this);
                        }
                    });
                },
                appear: function (el) {
                    var $el = $(el);
                    if (!$el.hasClass(self.config.inViewportClass)) {
                        $el.data('GSAnimationElement').show();
                    }
                }
            });
            return this._pageCollection;
        }
    };
    // GSAnimationElement Constructor Function
    function GSAnimationElement(element, config) {
        if (!element || !element.length) return;
        var self = this;
        this.element = element;
        this.config = config && $.isPlainObject(config) ? $.extend(true, {}, config, element.data()) : element.data();
        if (!isFinite(this.config.animationDelay)) this.config.animationDelay = 0;
        if (!isFinite(this.config.animationDuration)) this.config.animationDuration = 1000;
        element.css({
            'animation-duration': self.config.animationDuration + 'ms'
        });
    }
    // Shows Element
    GSAnimationElement.prototype.show = function () {
        var self = this;
        if (this.config.animationDelay) {
            this.timeOutId = setTimeout(function () {
                self.element
                    .removeClass(self.config.animationOut)
                    .addClass(self.config.animation + ' ' + self.config.inViewportClass);
                self.config.afterShow.call(self.element);
                self.callbackTimeoutId = setTimeout(function () {
                    self.config.onShown.call(self.element);
                }, self.config.animationDuration);

            }, this.config.animationDelay);
        } else {
            this.element
                .removeClass(this.config.animationOut)
                .addClass(this.config.animation + ' ' + this.config.inViewportClass);
            this.config.afterShow.call(this.element);
            this.callbackTimeoutId = setTimeout(function () {
                self.config.onShown.call(self.element);
            }, this.config.animationDuration);
        }
    };
    // Hides Element
    GSAnimationElement.prototype.hide = function () {
        var self = this;
        if (!this.element.hasClass(this.config.inViewportClass)) return;
        if (this.config.animationOut) {
            this.element
                .removeClass(this.config.animation)
                .addClass(this.config.animationOut);
            this.callbackTimeoutId = setTimeout(function () {
                self.element.removeClass(self.config.inViewportClass);
                self.config.onHidded.call(self.element);
            }, this.config.animationDuration);
        } else {
            this.element.removeClass(this.config.inViewportClass + ' ' + this.config.animation);
            this.config.onHidded.call(this.element);
        }
    };
})(jQuery);
