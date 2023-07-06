/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: GSScrollNav Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // GSScrollNav Function
    $.GSCore.components.GSScrollNav = {
        // Base Configuration
        _baseConfig: {
            duration: 400,
            easing: 'linear',
            over: $(),
            activeItemClass: 'active',
            afterShow: function () {
            },
            beforeShow: function () {
            }
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            var self = this;
            if (!collection || !collection.length) return $();
            collection.each(function (i, el) {
                var $this = $(el),
                    itemConfig = config && $.isPlainObject(config) ?
                        $.extend(true, {}, self._baseConfig, config, $this.data()) :
                        $.extend(true, {}, self._baseConfig, $this.data());
                if (!$this.data('GSScrollNav')) {
                    $this.data('GSScrollNav', new GSScrollNav($this, itemConfig));
                    self._pageCollection = self._pageCollection.add($this);
                }
            });
            $(window).on('scroll.GSScrollNav', function () {
                self._pageCollection.each(function (i, el) {
                    $(el).data('GSScrollNav').highlight();
                });
            }).trigger('scroll.GSScrollNav');
            return collection;
        }
    };
    // GSScrollNav Function
    function GSScrollNav(element, config) {

        this.element = element;

        this.config = config;

        this._items = $();

        this._makeItems();

        this._bindEvents();
    }
    // Return collection of sections
    GSScrollNav.prototype._makeItems = function () {
        var self = this;
        this.element.find('a[href^="#"]').each(function (i, el) {
            var $this = $(el);
            if (!$this.data('GSScrollNavSection')) {
                $this.data('GSScrollNavSection', new GSScrollNavSection($this, self.config));
                self._items = self._items.add($this);
            }
        });
    };
    // Binds necessary events
    GSScrollNav.prototype._bindEvents = function () {
        var self = this;
        this.element.on('click.GSScrollNav', 'a[href^="#"]', function (e) {
            var link = this;
            self._lockHightlight = true;
            if (self.current) self.current.unhighlight();
            link.blur();
            self.current = $(link).data('GSScrollNavSection');
            self.current.highlight();
            $(this).data('GSScrollNavSection').show(function () {
                self._lockHightlight = false;
            });
            e.preventDefault();
        });
    };
    // Activates necessary menu item
    GSScrollNav.prototype.highlight = function () {
        var self = this, items, currentItem, current, scrollTop;
        if (!this._items.length || this._lockHightlight) return;
        scrollTop = $(window).scrollTop();
        if (scrollTop + $(window).height() === $(document).height()) {
            this.current = this._items.last().data('GSScrollNavSection');
            this.unhighlight();
            this.current.highlight();
            this.current.changeHash();
            return;
        }
        this._items.each(function (i, el) {
            var Section = $(el).data('GSScrollNavSection'),
                $section = Section.section;
            if (scrollTop > Section.offset) {
                current = Section;
            }
        });
        if (current && this.current !== current) {
            this.unhighlight();
            current.highlight();
            if (this.current) current.changeHash();
            this.current = current;
        }
    };
    // Deactivates all menu items
    GSScrollNav.prototype.unhighlight = function () {

        this._items.each(function (i, el) {
            $(el).data('HSScrollNavSection').unhighlight();
        });

    };
    // GSScrollNav Section
    function GSScrollNavSection(element, config) {
        var self = this;

        this.element = element;

        this.config = config;

        Object.defineProperty(this, 'section', {
            value: $(self.element.attr('href'))
        });

        Object.defineProperty(this, 'offset', {
            get: function () {
                var header = $('.u-header'),
                    headerStyles = getComputedStyle(header.get(0)),
                    headerPosition = headerStyles.position,
                    offset = self.section.offset().top;
                if (header.length && headerPosition === 'fixed' && parseInt(headerStyles.top, 0) === 0) {
                    offset = offset - header.outerHeight() - parseInt(headerStyles.marginTop, 0);
                }
                if (self.config.over.length) {
                    offset = offset - self.config.over.outerHeight();
                }
                return offset;
            }
        });
    }
    // Moves to the section
    GSScrollNavSection.prototype.show = function (callback) {
        var self = this;
        if (!this.section.length) {
          return;
        }
        self.config.beforeShow.call(self.section);
        this.changeHash();
        $('html, body').stop().animate({
            scrollTop: self.offset + 3
        }, {
            duration: self.config.duration,
            easing: self.config.easing,
            complete: function () {
                $('html, body').stop().animate({
                    scrollTop: self.offset + 3
                }, {
                    duration: self.config.duration,
                    easing: self.config.easing,
                    complete: function () {
                        self.config.afterShow.call(self.section);
                        if ($.isFunction(callback)) callback();
                    }
                });
            }
        });
    };
    // Changes location's hash
    GSScrollNavSection.prototype.changeHash = function () {
        this.section.attr('id', '');
        window.location.hash = this.element.attr('href');
        this.section.attr('id', this.element.attr('href').slice(1));
    };
    // Activates the menu item
    GSScrollNavSection.prototype.highlight = function () {
        var parent = this.element.parent('li');
        if (parent.length) parent.addClass(this.config.activeItemClass);
    };
    // Deactivates the menu item
    GSScrollNavSection.prototype.unhighlight = function () {
        var parent = this.element.parent('li');
        if (parent.length) parent.removeClass(this.config.activeItemClass);
    };
})(jQuery);
