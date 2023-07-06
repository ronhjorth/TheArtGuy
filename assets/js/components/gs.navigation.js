/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Navigation Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Navigation Function
    $.GSCore.components.GSNavigation = {
        // Base Configuration
        _baseConfig: {
            navigationOverlayClasses: '',
            navigationInitClasses: '',
            navigationInitBodyClasses: '',
            navigationPosition: 'right',
            activeClass: 'u-main-nav--overlay-opened',
            navigationBreakpoint: 768,
            breakpointsMap: {
                'sm': 576,
                'md': 768,
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
            var _self = this, $w = $(window);
            if (!collection || !collection.length) {
              return $();
            }
            config = config && $.isPlainObject(config) ? config : {};
            $w.on('resize.GSNavigation', function (e) {
                if (_self.resizeTimeoutId) clearTimeout(_self.resizeTimeoutId);
                _self.resizeTimeoutId = setTimeout(function () {
                    _self._pageCollection.each(function (i, el) {
                        var $this = $(el), GSNavigation = $this.data('GSNavigation');
                        if ($w.width() > GSNavigation.config.breakpointsMap[GSNavigation.config.navigationBreakpoint] && GSNavigation.isInitialized()) {
                            GSNavigation.destroy();
                        } else if ($w.width() <= GSNavigation.config.breakpointsMap[GSNavigation.config.navigationBreakpoint] && !GSNavigation.isInitialized()) {
                            GSNavigation.init();
                        }
                    });
                }, 50);
            });
            collection.each(function (i, el) {
                var $this = $(el), itemConfig = $.extend(true, {}, _self._baseConfig, config, $this.data());
                if ($this.data('GSNavigation')) return;
                $this.data('GSNavigation', _self._factoryMethod($this, itemConfig));
                _self._pageCollection = _self._pageCollection.add($this);
            });
            _self._pageCollection.each(function (i, el) {
                var $this = $(el), GSNavigation = $this.data('GSNavigation');
                if ($w.width() > GSNavigation.config.breakpointsMap[GSNavigation.config.navigationBreakpoint]) {
                    GSNavigation.destroy();
                } else if ($w.width() <= GSNavigation.config.breakpointsMap[GSNavigation.config.navigationBreakpoint]) {
                    GSNavigation.init();
                }
            });
            return collection;
        },
        // Returns certain object relative to class name
        _factoryMethod: function (element, config) {
            if (element.filter('[class*="u-main-nav--overlay"]').length) {
                return new GSNavigationOverlay(element, config);
            } else if (element.filter('[class*="u-main-nav--push"]').length) {
                return new GSNavigationPush(element, config);
            }
        }
    };
    // Abstract class for all GSNavigation objects
    function GSNavigationAbstract(element, config) {
        this.element = element;
        this.body = $('body');
        this.config = config;
        this.reinit = function () {
            this.destroy().init();
        };
    }
    // GSNavigation Overlay
    function GSNavigationOverlay(element, config) {
        var _self = this;
        GSNavigationAbstract.call(this, element, config);
        Object.defineProperties(this, {
            overlayClasses: {
                get: function () {
                    return 'u-main-nav__overlay ' + _self.config.navigationOverlayClasses;
                }
            },
            bodyClasses: {
                get: function () {
                    return 'u-main-nav--overlay-' + _self.config.navigationPosition;
                }
            },
            isOpened: {
                get: function () {
                    return _self.body.hasClass(_self.config.activeClass);
                }
            }
        });
    }
    // Initialization of the Instance
    GSNavigationOverlay.prototype.init = function () {
        var _self = this;
        this.overlay = $('<div></div>', {
            class: _self.overlayClasses
        });
        if ($.GSCore.components.GSScrollBar) {
            setTimeout(function () {
                $.GSCore.components.GSScrollBar.init(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);
        }
        this.toggler = $('[data-target="#' + this.element.attr('id') + '"]');
        if (this.toggler && this.toggler.length) this.toggler.css('display', 'block');
        this.body.addClass(this.bodyClasses);
        this.element
            .addClass('u-main-nav--overlay')
            .append(this.overlay);
        setTimeout(function () {
            _self.element.addClass(_self.config.navigationInitClasses);
            _self.body.addClass(_self.config.navigationInitBodyClasses);
            _self.transitionDuration = parseFloat(getComputedStyle(_self.element.get(0)).transitionDuration, 10);
            if (_self.transitionDuration > 0) {
                _self.element.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                    if (_self.isOpened) {
                        _self.config.afterOpen.call(_self.element, _self.overlay);
                    } else if (!_self.isOpened) {
                        _self.config.afterClose.call(_self.element, _self.overlay);
                    }
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
        }, 50);
        this._bindEvents();
        this.isInit = true;
    };
    // Destroys the instance
    GSNavigationOverlay.prototype.destroy = function () {
        var _self = this;
        if (this.overlay) this.overlay.remove();
        if (this.toggler && this.toggler.length) this.toggler.hide();
        if ($.GSCore.components.GSScrollBar) {
            setTimeout(function () {
                $.GSCore.components.GSScrollBar.destroy(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);
        }
        setTimeout(function () {
            if (_self.transitionDuration && _self.transitionDuration > 0) {
                _self.element.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            }
        }, 50);
        this.body.removeClass(this.bodyClasses);
        this.element
            .removeClass('u-main-nav--overlay')
            .removeClass(this.config.navigationInitClasses);
        this.body.removeClass(this.bodyClasses).removeClass(this.config.navigationInitBodyClasses);
        this._unbindEvents();
        this.isInit = false;
    };
    // Binds Necessary Events
    GSNavigationOverlay.prototype._bindEvents = function () {
        var _self = this;
        if (this.toggler && this.toggler.length) {
            this.toggler.on('click.GSNavigation', function (e) {
                if (_self.isOpened) {
                    _self.close();
                } else {
                    _self.open();
                }
                e.preventDefault();
            });
        }
        this.overlay.on('click.GSNavigation', function (e) {
            _self.close();
        });
        $(document).on('keyup.GSNavigation', function (e) {
            if (e.keyCode === 27) {
                _self.close();
            }
        });
    };
    // Unbinds Necessary Events
    GSNavigationOverlay.prototype._unbindEvents = function () {
        if (this.toggler && this.toggler.length) {
            this.toggler.off('click.GSNavigation');
        }
        if (this.overlay && this.overlay.length) {
            this.overlay.off('click.GSNavigation');
        }
        $(document).off('keyup.GSNavigation');
    };
    // Shows the Navigation
    GSNavigationOverlay.prototype.open = function () {
        this.body.addClass(this.config.activeClass);
        if (this.transitionDuration !== undefined && this.transitionDuration === 0) {
            this.config.afterOpen.call(this.element, this.overlay);
        }
    };
    // Hides the Navigation
    GSNavigationOverlay.prototype.close = function () {
        var $this = this,
            hamburgers = $this.toggler && $this.toggler.length ? $this.toggler.find('.is-active') : $();
        if (hamburgers.length) hamburgers.removeClass('is-active');
        $this.body.removeClass($this.config.activeClass);
        $this.element.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            $this.toggler.attr('aria-expanded', false);
            $this.element.removeClass('collapse show');
        });
    };
    // Returns true if the navigation has been initialized
    GSNavigationOverlay.prototype.isInitialized = function () {
        return this.isInit;
    };
    // GSNavigation Push
    function GSNavigationPush(element, config) {
        var _self = this;
        GSNavigationAbstract.call(this, element, config);
        Object.defineProperties(this, {
            overlayClasses: {
                get: function () {
                    return 'u-main-nav__overlay ' + _self.config.navigationOverlayClasses;
                }
            },
            bodyClasses: {
                get: function () {
                    return 'u-main-nav--push-' + _self.config.navigationPosition;
                }
            },
            isOpened: {
                get: function () {
                    return _self.body.hasClass(_self.config.activeClass);
                }
            }
        });
    }
    // Initialization of the Instance
    GSNavigationPush.prototype.init = function () {
        var _self = this;
        this.overlay = $('<div></div>', {
            class: _self.overlayClasses
        });
        if ($.GSCore.components.GSScrollBar) {
            setTimeout(function () {
                $.GSCore.components.GSScrollBar.init(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);
        }
        this.toggler = $('[data-target="#' + this.element.attr('id') + '"]');
        if (this.toggler && this.toggler.length) this.toggler.css('display', 'block');
        this.body.addClass(this.bodyClasses);
        this.element
            .addClass('u-main-nav--push')
            .append(this.overlay);
        setTimeout(function () {
            _self.element.addClass(_self.config.navigationInitClasses);
            _self.body.addClass(_self.config.navigationInitBodyClasses);
            _self.transitionDuration = parseFloat(getComputedStyle(_self.element.get(0)).transitionDuration, 10);
            if (_self.transitionDuration > 0) {
                _self.element.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                    if (_self.isOpened) {
                        _self.config.afterOpen.call(_self.element, _self.overlay);
                    } else if (!_self.isOpened) {
                        _self.config.afterClose.call(_self.element, _self.overlay);
                    }
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
        }, 50);
        this._bindEvents();
        this.isInit = true;
    };
    // Destroys the Instance
    GSNavigationPush.prototype.destroy = function () {
        var _self = this;
        if (this.overlay) this.overlay.remove();
        if (this.toggler && this.toggler.length) this.toggler.hide();
        if ($.GSCore.components.GSScrollBar) {
            setTimeout(function () {
                $.GSCore.components.GSScrollBar.destroy(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);
        }
        setTimeout(function () {
            if (_self.transitionDuration && _self.transitionDuration > 0) {
                _self.element.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            }
        }, 50);
        this.body.removeClass(this.bodyClasses).removeClass(this.config.navigationInitBodyClasses);
        this.element
            .removeClass('u-main-nav--push')
            .removeClass(this.config.navigationInitClasses);
        this._unbindEvents();
        this.isInit = false;
    };
    // Binds Necessary Events
    GSNavigationPush.prototype._bindEvents = function () {
        var _self = this;
        if (this.toggler && this.toggler.length) {
            this.toggler.on('click.GSNavigation', function (e) {
                if (_self.isOpened) {
                    _self.close();
                } else {
                    _self.open();
                }
                e.preventDefault();
            });
        }
        this.overlay.on('click.GSNavigation', function (e) {
            _self.close();
        });
        $(document).on('keyup.GSNavigation', function (e) {
            if (e.keyCode === 27) {
                _self.close();
            }
        });
    };
    // Unbinds Necessary Events
    GSNavigationPush.prototype._unbindEvents = function () {
        if (this.toggler && this.toggler.length) {
            this.toggler.off('click.GSNavigation');
        }
        if (this.overlay && this.overlay.length) {
            this.overlay.off('click.GSNavigation');
        }
        $(document).off('keyup.GSNavigation');
    };
    // Shows the Navigation
    GSNavigationPush.prototype.open = function () {
        this.body.addClass(this.config.activeClass);
        if (this.transitionDuration !== undefined && this.transitionDuration === 0) {
            this.config.afterOpen.call(this.element, this.overlay);
        }
    };
    // Hides the Navigation
    GSNavigationPush.prototype.close = function () {
        var hamburgers = this.toggler && this.toggler.length ? this.toggler.find('.is-active') : $();
        if (hamburgers.length) hamburgers.removeClass('is-active');
        this.body.removeClass(this.config.activeClass);
        if (this.transitionDuration !== undefined && this.transitionDuration === 0) {
            this.config.afterClose.call(this.element, this.overlay);
        }
    };
    // Returns true if the navigation has been initialized
    GSNavigationPush.prototype.isInitialized = function () {
        return this.isInit;
    };
})(jQuery);
