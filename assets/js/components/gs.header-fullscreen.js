/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Header Fullscreen Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Header Fullscreen Function
    $.GSCore.components.GSHeaderFullscreen = {
        // Base Configuration
        _baseConfig: {
            afterOpen: function () {
            },
            afterClose: function () {
            },
            overlayClass: 'u-header__overlay',
            sectionsContainerSelector: '.u-header__sections-container'
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            var _self = this;
            if (!collection) return $();
            collection = $(collection);
            if (!collection.length) return $();
            config = config && $.isPlainObject(config) ? config : {};
            this._bindGlobalEvents();
            return collection.each(function (i, el) {
                var $this = $(this), itemConfig = $.extend(true, {}, _self._baseConfig, config, $this.data());
                if ($this.data('GSHeaderFullscreen')) return;
                $this.data('GSHeaderFullscreen', new GSHeaderFullscreen(
                    $this,
                    itemConfig,
                    new GSHeaderFullscreenOverlayEffect()
                ));
                _self._pageCollection = _self._pageCollection.add($this);
            });
        },
        // Binds necessary global events
        _bindGlobalEvents: function () {
            var _self = this;
            $(window).on('resize.GSHeaderFullscreen', function () {
                if (_self.resizeTimeOutId) clearTimeout(_self.resizeTimeOutId);
                _self.resizeTimeOutId = setTimeout(function () {
                    _self._pageCollection.each(function (i, el) {
                        var $this = $(el), GSHeaderFullscreen = $this.data('GSHeaderFullscreen');
                        if (!GSHeaderFullscreen) return;
                        GSHeaderFullscreen.update();
                    });
                }, 50);
            });
            $(document).on('keyup.GSHeaderFullscreen', function (e) {
                if (e.keyCode && e.keyCode === 27) {
                    _self._pageCollection.each(function (i, el) {
                        var $this = $(el),
                            GSHeaderFullscreen = $this.data('GSHeaderFullscreen');
                        if (!GSHeaderFullscreen) return;
                        GSHeaderFullscreen.hide();
                    });
                }
            });
        }
    };
    // GSHeader Fullscreen
    function GSHeaderFullscreen(element, config, effect) {
        var _self = this;
        this.element = element;
        this.config = config;
        this.effect = effect;
        this.overlay = $('<div></div>', {
            class: _self.config.overlayClass
        });
        Object.defineProperty(this, 'isShown', {
            get: function () {
                return _self.effect.isShown();
            }
        });
        Object.defineProperty(this, 'sections', {
            get: function () {
                return _self.element.find(_self.config.sectionsContainerSelector);
            }
        });
        this.element.append(this.overlay);
        this.effect.init(this.element, this.overlay, this.config.afterOpen, this.config.afterClose);
        this._bindEvents();
        if ($.GSCore.components.GSScrollBar && this.sections.length) {
            $.GSCore.components.GSScrollBar.init(this.sections);
        }
    }
    // Binds necessary events
    GSHeaderFullscreen.prototype._bindEvents = function () {
        var _self = this;
        this.invoker = $('[data-target="#' + this.element.attr('id') + '"]');
        if (this.invoker.length) {
            this.invoker.off('click.GSHeaderFullscreen').on('click.GSHeaderFullscreen', function (e) {
                _self[_self.isShown ? 'hide' : 'show']();
                e.preventDefault();
            });
        }
        return this;
    };
    // Updates the header
    GSHeaderFullscreen.prototype.update = function () {
        if (!this.effect) return false;
        this.effect.update();
        return this;
    };
    // Shows the header
    GSHeaderFullscreen.prototype.show = function () {
        if (!this.effect) return false;
        this.effect.show();
        return this;
    };
    // Hides the header
    GSHeaderFullscreen.prototype.hide = function () {
        if (!this.effect) return false;
        this.effect.hide();
        return this;
    };
    // GSHeader Fullscreen Overlay Effect
    function GSHeaderFullscreenOverlayEffect() {
        this._isShown = false;
    }
    // Initialization of GSHeader Fullscreen Overlay Effect
    GSHeaderFullscreenOverlayEffect.prototype.init = function (element, overlay, afterOpen, afterClose) {
        var _self = this;
        this.element = element;
        this.overlay = overlay;
        this.afterOpen = afterOpen;
        this.afterClose = afterClose;
        this.overlay.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            if (_self.isShown() && e.originalEvent.propertyName === 'transform') {
                _self.afterOpen.call(_self.element, _self.overlay);
            } else if (!_self.isShown() && e.originalEvent.propertyName === 'transform') {
                _self.afterClose.call(_self.element, _self.overlay);
            }
            e.stopPropagation();
            e.preventDefault();
        });
        this.update();
        this.overlay.addClass(this.element.data('overlay-classes'));
        return this;
    };
    // Destroy the overlay effect
    GSHeaderFullscreenOverlayEffect.prototype.destroy = function () {
        this.overlay.css({
            'width': 'auto',
            'height': 'auto'
        });
        this.element.removeClass('u-header--fullscreen-showed');
        return this;
    };
    // Necessary updates which will be applied when window has been resized
    GSHeaderFullscreenOverlayEffect.prototype.update = function () {
        var $w = $(window),
            $wW = $w.width(),
            $wH = $w.height();
        this.overlay.css({
            width: $wW > $wH ? $wW * 1.5 : $wH * 1.5,
            height: $wW > $wH ? $wW * 1.5 : $wH * 1.5
        });
        return this;
    };
    // Describes appear of the overlay
    GSHeaderFullscreenOverlayEffect.prototype.show = function () {
        this.element.addClass('u-header--fullscreen-showed');
        this._isShown = true;
        return this;
    };
    // Describes disappearance of the overlay
    GSHeaderFullscreenOverlayEffect.prototype.hide = function () {
        this.element.removeClass('u-header--fullscreen-showed');
        this._isShown = false;
        return this;
    };
    // Returns true if header has been opened, otherwise returns false
    GSHeaderFullscreenOverlayEffect.prototype.isShown = function () {
        return this._isShown;
    };
})(jQuery);
