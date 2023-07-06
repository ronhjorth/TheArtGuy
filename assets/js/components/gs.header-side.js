/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: GSHeaderSide Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // GSHeaderSide Function
    $.GSCore.components.GSHeaderSide = {
        // Base Configuration
        _baseConfig: {
            headerBreakpoint: null,
            breakpointsMap: {
                'md': 768,
                'sm': 576,
                'lg': 992,
                'xl': 1200
            },
            afterOpen: function () {
            },
            afterClose: function () {
            }
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            var _self = this;
            if (!collection || !collection.length) {
              return $();
            }
            this.$w = $(window);
            config = config && $.isPlainObject(config) ? config : {};
            this._bindGlobalEvents();
            return collection.each(function (i, el) {
                var $this = $(el), itemConfig = $.extend(true, {}, _self._baseConfig, config, $this.data());
                if ($this.data('GSHeaderSide')) {
                  return;
                }
            });
        },
        // Binds Necessary Global Events
        _bindGlobalEvents: function () {
            var _self = this;
            this.$w.on('resize.GSHeaderSide', function (e) {
                if (_self.resizeTimeoutId) clearTimeout(_self.resizeTimeoutId);
                _self.resizeTimeoutId = setTimeout(function () {
                    _self._pageCollection.each(function (i, el) {
                        var GSHeaderSide = $(el).data('GSHeaderSide');
                        if (!GSHeaderSide.config.headerBreakpoint) return;
                        if (_self.$w.width() < GSHeaderSide.config.breakpointsMap[GSHeaderSide.config.headerBreakpoint] && GSHeaderSide.isInit()) {
                            GSHeaderSide.destroy();
                        } else if (_self.$w.width() >= GSHeaderSide.config.breakpointsMap[GSHeaderSide.config.headerBreakpoint] && !GSHeaderSide.isInit()) {
                            GSHeaderSide.init();
                        }
                    });
                }, 10);
            });

        }
    };
    // Provides an abstract interface for the side header
    function _GSHeaderSideAbstract(element, config) {
        // Contains link to the current element
        this.element = element;
        // Contains configuration object
        this.config = config;
        // Contains link to the window object
        this.$w = $(window);
        // Contains name of methods which should be implemented in derived class
        this._abstractMethods = ['init', 'destroy', 'show', 'hide', 'isInit'];
        // Runs initialization of the object
        this._build = function () {
            if (!this.config.headerBreakpoint) return this.init();
            if (this.config.breakpointsMap[this.config.headerBreakpoint] <= this.$w.width()) {
                return this.init();
            } else {
                return this.destroy();
            }
        };
        // Checks whether derived class implements necessary abstract events
        this._isCorrectDerrivedClass = function () {
            var _self = this;
            this._abstractMethods.forEach(function (method) {
                if (!(method in _self) || !$.isFunction(_self[method])) {
                    throw new Error('GSHeaderSide: Derived class must implement ' + method + ' method.');
                }
            });
            this._build();
        };
        setTimeout(this._isCorrectDerrivedClass.bind(this), 10);
    }
    // GSHeaderSide constructor function
    function GSHeaderSideStaticLeft(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        this.body = $('body');
    }
    // Initialization of the GSHeaderSideStaticLeft instance
    GSHeaderSideStaticLeft.prototype.init = function () {
        this.body.addClass('u-body--header-side-static-left');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        return this;
    };
    // Destroys the GSHeaderSideStaticLeft instance
    GSHeaderSideStaticLeft.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-static-left');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        return this;
    };
    // Checks whether instance has been initialized
    GSHeaderSideStaticLeft.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-static-left');
    };
    // Shows the Header
    GSHeaderSideStaticLeft.prototype.show = function () {
        return this;
    };
    // Hides the Header
    GSHeaderSideStaticLeft.prototype.hide = function () {
        return this;
    };
    // GSHeaderSide constructor function
    function GSHeaderSideStaticRight(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        this.body = $('body');
    }
    // Initialization of the GSHeaderSideStaticRight instance
    GSHeaderSideStaticRight.prototype.init = function () {
        this.body.addClass('u-body--header-side-static-right');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        return this;
    };
    // Destroys the GSHeaderSideStaticRight instance
    GSHeaderSideStaticRight.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-static-right');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        return this;
    };
    // Checks whether instance has been initialized
    GSHeaderSideStaticRight.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-static-right');
    };
    // Shows the Header
    GSHeaderSideStaticRight.prototype.show = function () {
        return this;
    };
    // Hides the Header
    GSHeaderSideStaticRight.prototype.hide = function () {
        return this;
    };
    // GSHeaderSide constructor function
    function GSHeaderSideOverlayLeft(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        Object.defineProperty(this, 'isShown', {
            get: function () {
                return this.body.hasClass('u-body--header-side-opened');
            }
        });
        Object.defineProperty(this, 'overlayClasses', {
            get: function () {
                return this.element.data('header-overlay-classes') ? this.element.data('header-overlay-classes') : '';
            }
        });
        Object.defineProperty(this, 'headerClasses', {
            get: function () {
                return this.element.data('header-classes') ? this.element.data('header-classes') : '';
            }
        });
        this.body = $('body');
        this.invoker = $('[data-target="#' + this.element.attr('id') + '"]');
    }
    // Initialization of the GSHeaderSideOverlayLeft instance
    GSHeaderSideOverlayLeft.prototype.init = function () {
        var _self = this;
        this.body.addClass('u-body--header-side-overlay-left');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        if (this.invoker.length) {
            this.invoker.on('click.GSHeaderSide', function (e) {
                if (_self.isShown) {
                    _self.hide();
                } else {
                    _self.show();
                }
                e.preventDefault();
            }).css('display', 'block');
        }
        if (!this.overlay) {
            this.overlay = $('<div></div>', {
                class: 'u-header__overlay ' + _self.overlayClasses
            });
        }
        this.overlay.on('click.GSHeaderSide', function (e) {
            var hamburgers = _self.invoker.length ? _self.invoker.find('.is-active') : $();
            if (hamburgers.length) hamburgers.removeClass('is-active');
            _self.hide();
        });
        this.element.addClass(this.headerClasses).append(this.overlay);
        return this;
    };
    // Destroys the GSHeaderSideOverlayLeft instance
    GSHeaderSideOverlayLeft.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-overlay-left');
        this.hide();
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        this.element.removeClass(this.headerClasses);
        if (this.invoker.length) {
            this.invoker.off('click.GSHeaderSide').css('display', 'none');
        }
        if (this.overlay) {
            this.overlay.off('click.GSHeaderSide');
            this.overlay.remove();
            this.overlay = null;
        }
        return this;
    };
    // Checks whether instance has been initialized
    GSHeaderSideOverlayLeft.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-overlay-left');
    };
    // Shows the Header
    GSHeaderSideOverlayLeft.prototype.show = function () {
        this.body.addClass('u-body--header-side-opened');
        return this;
    };
    // Hides the Header
    GSHeaderSideOverlayLeft.prototype.hide = function () {
        this.body.removeClass('u-body--header-side-opened');
        return this;
    };
    // GSHeaderSide constructor function
    function GSHeaderSidePushLeft(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        Object.defineProperty(this, 'isShown', {
            get: function () {
                return this.body.hasClass('u-body--header-side-opened');
            }
        });
        Object.defineProperty(this, 'overlayClasses', {
            get: function () {
                return this.element.data('header-overlay-classes') ? this.element.data('header-overlay-classes') : '';
            }
        });
        Object.defineProperty(this, 'headerClasses', {
            get: function () {
                return this.element.data('header-classes') ? this.element.data('header-classes') : '';
            }
        });
        Object.defineProperty(this, 'bodyClasses', {
            get: function () {
                return this.element.data('header-body-classes') ? this.element.data('header-body-classes') : '';
            }
        });
        this.body = $('body');
        this.invoker = $('[data-target="#' + this.element.attr('id') + '"]');
    }
    // Initialization of the GSHeaderSidePushLeft instance
    GSHeaderSidePushLeft.prototype.init = function () {
        var _self = this;
        this.body.addClass('u-body--header-side-push-left');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        if (this.invoker.length) {
            this.invoker.on('click.GSHeaderSide', function (e) {
                if (_self.isShown) {
                    _self.hide();
                } else {
                    _self.show();
                }
                e.preventDefault();
            }).css('display', 'block');
        }
        if (!this.overlay) {
            this.overlay = $('<div></div>', {
                class: 'u-header__overlay ' + _self.overlayClasses
            });
        }
        this.overlay.on('click.GSHeaderSide', function (e) {
            var hamburgers = _self.invoker.length ? _self.invoker.find('.is-active') : $();
            if (hamburgers.length) hamburgers.removeClass('is-active');
            _self.hide();
        });
        this.element.addClass(this.headerClasses).append(this.overlay);
        this.body.addClass(this.bodyClasses);
        return this;
    };
    // Destroys the GSHeaderSidePushLeft instance
    GSHeaderSidePushLeft.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-push-left');
        this.hide();
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        this.element.removeClass(this.headerClasses);
        this.body.removeClass(this.bodyClasses);
        if (this.invoker.length) {
            this.invoker.off('click.GSHeaderSide').css('display', 'none');
        }
        if (this.overlay) {
            this.overlay.off('click.GSHeaderSide');
            this.overlay.remove();
            this.overlay = null;
        }
        return this;
    };
    // Checks whether instance has been initialized
    GSHeaderSidePushLeft.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-push-left');
    };
    // Shows the Header
    GSHeaderSidePushLeft.prototype.show = function () {
        this.body.addClass('u-body--header-side-opened');
        return this;
    };
    // Hides the Header
    GSHeaderSidePushLeft.prototype.hide = function () {
        this.body.removeClass('u-body--header-side-opened');
        return this;
    };
    // GSHeaderSide constructor function
    function GSHeaderSideOverlayRight(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        Object.defineProperty(this, 'isShown', {
            get: function () {
                return this.body.hasClass('u-body--header-side-opened');
            }
        });
        Object.defineProperty(this, 'overlayClasses', {
            get: function () {
                return this.element.data('header-overlay-classes') ? this.element.data('header-overlay-classes') : '';
            }
        });
        Object.defineProperty(this, 'headerClasses', {
            get: function () {
                return this.element.data('header-classes') ? this.element.data('header-classes') : '';
            }
        });
        this.body = $('body');
        this.invoker = $('[data-target="#' + this.element.attr('id') + '"]');
    }
    // Initialization of the GSHeaderSideOverlayRight instance
    GSHeaderSideOverlayRight.prototype.init = function () {
        var _self = this;
        this.body.addClass('u-body--header-side-overlay-right');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        if (this.invoker.length) {
            this.invoker.on('click.GSHeaderSide', function (e) {
                if (_self.isShown) {
                    _self.hide();
                } else {
                    _self.show();
                }
                e.preventDefault();
            }).css('display', 'block');
        }
        if (!this.overlay) {
            this.overlay = $('<div></div>', {
                class: 'u-header__overlay ' + _self.overlayClasses
            });
        }
        this.overlay.on('click.GSHeaderSide', function (e) {
            var hamburgers = _self.invoker.length ? _self.invoker.find('.is-active') : $();
            if (hamburgers.length) hamburgers.removeClass('is-active');
            _self.hide();
        });
        this.element.addClass(this.headerClasses).append(this.overlay);
        return this;
    };
    // Destroys the GSHeaderSideOverlayRight instance
    GSHeaderSideOverlayRight.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-overlay-right');
        this.hide();
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        this.element.removeClass(this.headerClasses);
        if (this.invoker.length) {
            this.invoker.off('click.GSHeaderSide').css('display', 'none');
        }
        if (this.overlay) {
            this.overlay.off('click.GSHeaderSide');
            this.overlay.remove();
            this.overlay = null;
        }
        return this;
    };
    // Checks whether instance has been initialized
    GSHeaderSideOverlayRight.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-overlay-right');
    };
    // Shows the Header
    GSHeaderSideOverlayRight.prototype.show = function () {
        this.body.addClass('u-body--header-side-opened');
        return this;
    };
    // Hides the Header
    GSHeaderSideOverlayRight.prototype.hide = function () {
        this.body.removeClass('u-body--header-side-opened');
        return this;
    };
    // GSHeaderSide constructor function
    function GSHeaderSidePushRight(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        Object.defineProperty(this, 'isShown', {
            get: function () {
                return this.body.hasClass('u-body--header-side-opened');
            }
        });
        Object.defineProperty(this, 'overlayClasses', {
            get: function () {
                return this.element.data('header-overlay-classes') ? this.element.data('header-overlay-classes') : '';
            }
        });
        Object.defineProperty(this, 'headerClasses', {
            get: function () {
                return this.element.data('header-classes') ? this.element.data('header-classes') : '';
            }
        });
        Object.defineProperty(this, 'bodyClasses', {
            get: function () {
                return this.element.data('header-body-classes') ? this.element.data('header-body-classes') : '';
            }
        });
        this.body = $('body');
        this.invoker = $('[data-target="#' + this.element.attr('id') + '"]');
    }
    // Initialization of the GSHeaderSidePushRight instance
    GSHeaderSidePushRight.prototype.init = function () {
        var _self = this;
        this.body.addClass('u-body--header-side-push-right');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        if (this.invoker.length) {
            this.invoker.on('click.GSHeaderSide', function (e) {
                if (_self.isShown) {
                    _self.hide();
                } else {
                    _self.show();
                }
                e.preventDefault();
            }).css('display', 'block');
        }
        if (!this.overlay) {
            this.overlay = $('<div></div>', {
                class: 'u-header__overlay ' + _self.overlayClasses
            });
        }
        this.overlay.on('click.GSHeaderSide', function (e) {
            var hamburgers = _self.invoker.length ? _self.invoker.find('.is-active') : $();
            if (hamburgers.length) hamburgers.removeClass('is-active');
            _self.hide();
        });
        this.element.addClass(this.headerClasses).append(this.overlay);
        this.body.addClass(this.bodyClasses);
        return this;
    };
    // Destroys the GSHeaderSidePushRight instance
    GSHeaderSidePushRight.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-push-right');
        this.hide();
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        this.element.removeClass(this.headerClasses);
        this.body.removeClass(this.bodyClasses);
        if (this.invoker.length) {
            this.invoker.off('click.GSHeaderSide').css('display', 'none');
        }
        if (this.overlay) {
            this.overlay.off('click.GSHeaderSide');
            this.overlay.remove();
            this.overlay = null;
        }
        return this;
    };
    // Checks whether instance has been initialized
    GSHeaderSidePushRight.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-push-right');
    };
    // Shows the Header
    GSHeaderSidePushRight.prototype.show = function () {
        this.body.addClass('u-body--header-side-opened');
        return this;
    };
    // Hides the Header
    GSHeaderSidePushRight.prototype.hide = function () {
        this.body.removeClass('u-body--header-side-opened');
        return this;
    };
})(jQuery);
