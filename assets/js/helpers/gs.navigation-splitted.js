/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Splatted Navigation Helper
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    $.GSCore.helpers.GSNavigationSplitted = {
		// Base Configuration
        _baseConfig: {
            breakpoint: 992,
            mobileTarget: null,
            logoSelector: '.navbar-brand',
            logoItemSelector: '.nav-logo-item'
        },
		// Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            var self;
            if (!collection || !collection.length) return $();
            self = this;
            $(window).on('resize.GSSplitteNavigation', function () {
                if (self.resizeTimeOutId) clearTimeout(self.resizeTimeOutId);
                self.resizeTimeOutId = setTimeout(function () {
                    self._pageCollection.each(function (i, el) {
                        $(el).data('GSSplittedNavigation').check();
                    });
                }, 10);
            });
            collection.each(function (i, el) {
                var $item = $(el);
                config = config && $.isPlainObject(config) ?
                    $.extend(true, {}, self._baseConfig, config, $item.data()) :
                    $.extend(true, {}, self._baseConfig, $item.data());
                if ($item.data('GSSplittedNavigation')) return;
                $item.data('GSSplittedNavigation', new GSSplittedNavigation($item, config));
                self._pageCollection = self._pageCollection.add($item);
            });
            self._pageCollection.each(function (i, el) {
                $(el).data('GSSplittedNavigation').run();
            });
            return collection;
        }
    };
	// Creates a Navigation Object
    function GSSplittedNavigation(element, config) {
        this.element = element;
        this.config = config;
        this.logo = this.element.find(this.config.logoSelector);
        this.logoItem = this.element.find(this.config.logoItemSelector);
        this.target = this.element.find(this.config.mobileTarget).length ? this.element.find(this.config.mobileTarget) : this.element;
    }
    GSSplittedNavigation.prototype.run = function () {
        this[$(window).width() < this.config.breakpoint ? 'toMobileState' : 'toDefaultState']();
        return this;
    };
    GSSplittedNavigation.prototype.check = function () {
        var $w = $(window);
        if ($w.width() < this.config.breakpoint && this.defaultState) {
            this.toMobileState();
        } else if ($w.width() >= this.config.breakpoint && !this.defaultState) {
            this.toDefaultState();
        }
        return this;
    };
    GSSplittedNavigation.prototype.toDefaultState = function () {
        if (!this.logoItem.length || !this.logo.length) return this;
        this.logoItem.show().append(this.logo);
        this.defaultState = true;
        return this;
    };
    GSSplittedNavigation.prototype.toMobileState = function () {
        if (!this.logoItem.length || !this.logo.length) return this;
        this.target.before(this.logo);
        this.logoItem.hide();
        this.defaultState = false;
        return this;
    };
})(jQuery);
