/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Modal Window Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Modal Window Function
    $.GSCore.components.GSModalWindow = {
        // Base Configuration
        _baseConfig: {
            bounds: 100,
            debounce: 50,
            overlayOpacity: 0.48,
            overlayColor: '#000000',
            speed: 400,
            type: 'onscroll',
            effect: 'fadein',
            onOpen: function () {
            },
            onClose: function () {
            },
            onComplete: function () {
            }
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            var collection = $(selector);
            if (!collection.length) return;
            config = config && $.isPlainObject(config) ? $.extend({}, this._baseConfig, config) : this._baseConfig;
            config.selector = selector;
            this._pageCollection = this._pageCollection.add(collection.not(this._pageCollection));
            if (config.autonomous) {
                return this.initAutonomousModalWindows(collection, config);
            }
            return this.initBaseModalWindows(collection, config);
        },
        // Initialization of Base Modal Window of the page
        initBaseModalWindows: function (collection, config) {
            return collection.on('click', function (e) {
                if (!('Custombox' in window)) return;
                var $this = $(this),
                    target = $this.data('modal-target'),
                    effect = $this.data('modal-effect') || config['effect'];
                if (!target || !$(target).length) return;
                new Custombox.modal(
                    {
                        content: {
                            target: target,
                            effect: effect,
                            onOpen: function () {
                                config['onOpen'].call($(target));
                                Custombox.modal.closeAll();
                            },
                            onClose: function () {
                                config['onClose'].call($(target));
                            },
                            onComplete: function () {
                                config['onComplete'].call($(target));
                            }
                        },
                        overlay: {
                            color: $this.data('overlay-color') || config['overlayColor'],
                            opacity: $this.data('overlay-opacity') || config['overlayOpacity'],
                            speedIn: $this.data('speed') || config['speed'],
                            speedOut: $this.data('speed') || config['speed']
                        }
                    }
                ).open();
                e.preventDefault();
            });
        },
        // Initialization of Autonomous Modal Window of the page
        initAutonomousModalWindows: function (collection, config) {
            var self = this;
            return collection.each(function (i, el) {
                var $this = $(el), type = $this.data('modal-type');
                switch (type) {
                    case 'hashlink' :
                        self.initHashLinkPopup($this, config);
                        break;
                    case 'onscroll' :
                        self.initOnScrollPopup($this, config);
                        break;
                    case 'beforeunload' :
                        self.initBeforeUnloadPopup($this, config);
                        break;
                    case 'ontarget' :
                        self.initOnTargetPopup($this, config);
                        break;
                    case 'aftersometime' :
                        self.initAfterSomeTimePopup($this, config);
                        break;
                }
            });
        },
        // Initialization of Hash Link Popup
        initHashLinkPopup: function (popup, config) {
            var self = this, hashItem = $(window.location.hash), target = $('#' + popup.attr('id'));
            if (hashItem.length && hashItem.attr('id') === popup.attr('id')) {
                new Custombox.modal(
                    {
                        content: {
                            target: '#' + popup.attr('id'),
                            effect: popup.data('effect') || config['effect'],
                            onOpen: function () {
                                config['onOpen'].call($(target));
                            },
                            onClose: function () {
                                config['onClose'].call($(target));
                            },
                            onComplete: function () {
                                config['onComplete'].call($(target));
                            }
                        },
                        overlay: {
                            color: popup.data('overlay-color') || config['overlayColor'],
                            opacity: popup.data('overlay-opacity') || config['overlayOpacity'],
                            speedIn: popup.data('speed') || config['speed'],
                            speedOut: popup.data('speed') || config['speed']
                        }
                    }
                ).open();
            }
        },
        // Initialization of OnScroll Popup
        initOnScrollPopup: function (popup, config) {
            var self = this,
                $window = $(window),
                breakpoint = popup.data('breakpoint') ? popup.data('breakpoint') : 0,
                target = $('#' + popup.attr('id'));
            $window.on('scroll.popup', function () {
                var scrolled = $window.scrollTop() + $window.height();
                if (scrolled >= breakpoint) {
                    new Custombox.modal(
                        {
                            content: {
                                target: '#' + popup.attr('id'),
                                effect: popup.data('effect') || config['effect'],
                                onOpen: function () {
                                    config['onOpen'].call($(target));
                                },
                                onClose: function () {
                                    config['onClose'].call($(target));
                                },
                                onComplete: function () {
                                    config['onComplete'].call($(target));
                                }
                            },
                            overlay: {
                                color: popup.data('overlay-color') || config['overlayColor'],
                                opacity: popup.data('overlay-opacity') || config['overlayOpacity'],
                                speedIn: popup.data('speed') || config['speed'],
                                speedOut: popup.data('speed') || config['speed']
                            }
                        }
                    ).open();
                    $window.off('scroll.popup');
                }
            });
            $window.trigger('scroll.popup');
        },
        // Initialization of Before Unload Popup
        initBeforeUnloadPopup: function (popup, config) {
            var self = this,
                count = 0,
                target = $('#' + popup.attr('id')),
                timeoutId;
            window.addEventListener('mousemove', function (e) {
                if (timeoutId) clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    if (e.clientY < 10 && !count) {
                        count++;
                        new Custombox.modal(
                            {
                                content: {
                                    target: '#' + popup.attr('id'),
                                    effect: popup.data('effect') || config['effect'],
                                    onOpen: function () {
                                        config['onOpen'].call($(target));
                                    },
                                    onClose: function () {
                                        config['onClose'].call($(target));
                                    },
                                    onComplete: function () {
                                        config['onComplete'].call($(target));
                                    }
                                },
                                overlay: {
                                    color: popup.data('overlay-color') || config['overlayColor'],
                                    opacity: popup.data('overlay-opacity') || config['overlayOpacity'],
                                    speedIn: popup.data('speed') || config['speed'],
                                    speedOut: popup.data('speed') || config['speed']
                                }
                            }
                        ).open();
                    }
                }, 10);
            });
        },
        // Initialization of OnTarget Popup
        initOnTargetPopup: function (popup, config) {
            var self = this, target = popup.data('target');
            if (!target || !$(target).length) return;
            appear({
                bounds: config['bounds'],
                debounce: config['debounce'],
                elements: function () {
                    return document.querySelectorAll(target);
                },
                appear: function (element) {

                    new Custombox.modal(
                        {
                            content: {
                                target: '#' + popup.attr('id'),
                                effect: popup.data('effect') || config['effect'],
                                onOpen: function () {
                                    config['onOpen'].call($(target));
                                },
                                onClose: function () {
                                    config['onClose'].call($(target));
                                },
                                onComplete: function () {
                                    config['onComplete'].call($(target));
                                }
                            },
                            overlay: {
                                color: popup.data('overlay-color') || config['overlayColor'],
                                opacity: popup.data('overlay-opacity') || config['overlayOpacity'],
                                speedIn: popup.data('speed') || config['speed'],
                                speedOut: popup.data('speed') || config['speed']
                            }
                        }
                    ).open();
                }
            });
        },
        // Initialization of After Some Time Popup
        initAfterSomeTimePopup: function (popup, config) {
            var self = this, target = $('#' + popup.attr('id'));
            setTimeout(function () {
                new Custombox.modal(
                    {
                        content: {
                            target: '#' + popup.attr('id'),
                            effect: popup.data('effect') || config['effect'],
                            onOpen: function () {
                                config['onOpen'].call($(target));
                            },
                            onClose: function () {
                                config['onClose'].call($(target));
                            },
                            onComplete: function () {
                                config['onComplete'].call($(target));
                            }
                        },
                        overlay: {
                            color: popup.data('overlay-color') || config['overlayColor'],
                            opacity: popup.data('overlay-opacity') || config['overlayOpacity'],
                            speedIn: popup.data('speed') || config['speed'],
                            speedOut: popup.data('speed') || config['speed']
                        }
                    }
                ).open();
            }, popup.data('delay') ? popup.data('delay') : 10);
        }
    };
})(jQuery);
