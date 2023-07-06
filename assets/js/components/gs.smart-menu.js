/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Smart Menu Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
	// Smart Menu Function
    $.GSCore.components.GSSmartMenu = {
		// Base Configuration
        _baseConfig: {
            fixMoment: 300,
            togglerSelector: '.u-smart-nav__toggler',
            navbarSelector: '.navbar',
            menuToggleClass: 'u-smart-nav--opened',
            menuVisibleClass: 'u-smart-nav--shown',
            afterOpen: function () {
            },
            afterClose: function () {
            }
        },
		// Page Collection
        _pageCollection: $(),
		// Init Function
        init: function (collection, config) {
            if (!collection || !collection.length) {
            	return $();
			}
            var self = this;
            config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
            if (!this.eventInitalized) {
                $(window).on('scroll.HSSmartMenu', function () {
                    if ($(document).height() > $(window).height()) {
                        var $w = $(this);
                        self._pageCollection.each(function (i, el) {
                            var $this = $(el),
                                SmartMenu = $this.data('HSSmartMenu');
                            if (!SmartMenu) {
                            	return;
							}
                            if ($w.scrollTop() >= SmartMenu.getFixMoment() && SmartMenu.isDefaultState()) {
                                SmartMenu.show();
                            } else if ($w.scrollTop() < SmartMenu.getFixMoment() && !SmartMenu.isDefaultState()) {
                                SmartMenu.hide();
                            }
                        });
                    }
                });
                this.eventInitalized = true;
            }
            collection.each(function (i, el) {
                var $this = $(el);
                if ($this.data('GSSmartMenu')) {
                	return;
				}
                $this.data('GSSmartMenu', new HSSmartMenu($this, $.extend(config, $this.data())));
                self._pageCollection = self._pageCollection.add($this);
            });
            $(window).trigger('scroll.GSSmartMenu');
            if ($(document).height() <= $(window).height()) {
                self._pageCollection.each(function (i, el) {
                    var $this = $(el),
                        SmartMenu = $this.data('GSSmartMenu');
                    if (!SmartMenu) {
                    	return;
					}
                    if (SmartMenu.isDefaultState()) SmartMenu.show();
                });
            }
            $(document).on('keyup.GSSmartMenu', function (e) {
                if (e.keyCode !== 27) {
                	return false;
				}
                self._pageCollection.each(function (i, el) {
                    var $this = $(el),
                        SmartMenu = $this.data('GSSmartMenu');
                    if (SmartMenu.toggler.length && SmartMenu.toggler.find('.is-active').length) {
                        SmartMenu.toggler.find('.is-active').removeClass('is-active');
                    }
                    SmartMenu.hideMenu();
                });
            });
            return collection;
        }
    };
    // GSSmartMenu Constructor
    function GSSmartMenu(element, config) {

        if (!element || !element.length || !config || !$.isPlainObject(config)) {
        	return;
		}
        var self = this;
        this.element = element;
        this.config = config;
        this.defaultState = true;
        this.toggler = this.element.find(this.config.togglerSelector);
        if (this.toggler.length) {
            this.toggler.on('click.GSSmartMenu', function (e) {

                if (!self.element.hasClass(self.config.menuToggleClass)) {
                    self.openMenu();
                } else {
                    self.hideMenu();
                }
                e.preventDefault();
            });
        }
    }
    // Show Navigation
    GSSmartMenu.prototype.openMenu = function () {
        var toggler = this.toggler ? this.toggler.find('.is-active') : $();
        this.element.addClass(this.config.menuToggleClass);
        if (this.toggler && toggler.length && !toggler.hasClass('is-active')) toggler.addClass('is-active');

    };
    // Hide Navigation
    GSSmartMenu.prototype.hideMenu = function () {
        this.element.removeClass(this.config.menuToggleClass);
    };
    // Initialization of GSSmartMenu Instance
    GSSmartMenu.prototype.show = function () {

        this.element.addClass(this.config.menuVisibleClass);

        this.defaultState = false;
        return this;
    };
	// Destroy of GSSmartMenu Instance
    GSSmartMenu.prototype.hide = function () {

        this.element.removeClass(this.config.menuVisibleClass);

        this.defaultState = true;
        return this;
    };
	// Returns true if instance is in default state
    GSSmartMenu.prototype.isDefaultState = function () {
        return this.defaultState;
    };
    // Returns fix moment
    GSSmartMenu.prototype.getFixMoment = function () {
        return this.config.fixMoment;
    };
})(jQuery);
