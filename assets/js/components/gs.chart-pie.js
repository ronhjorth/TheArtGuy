/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Chart Pies Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Chart Pies Function
    $.GSCore.components.GSChartPie = {
        // Base Configuration
        _baseConfig: {
            bounds: -100,
            debounce: 10,
            rtl: false,
            wrpClass: 'circles-wrp',
            textClass: 'circles-text',
            valueStrokeClass: 'circles-valueStroke',
            maxValueStrokeClass: 'circles-maxValueStroke',
            styleWrapper: true,
            styleText: true
        },
        // Page Collection
        pageCollection: $(),
        appearCollectionIds: [],
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initCircles();
            return this.pageCollection;
        },
        initCircles: function () {
            var lastItem = this.pageCollection.last(),
                lastId = 0,
                self = this;
            if (lastItem.length) {
                lastId = +lastItem.attr('id').substring(lastItem.attr('id').lastIndexOf('-') + 1);
            }
            this.collection.each(function (i, el) {
                var $this = $(el),
                    id = 'hs-pie-' + (lastId + (i + 1)),
                    value = 0;
                $this.attr('id', id);
                if (!$this.data('circles-scroll-animate')) {
                    value = $this.data('circles-value') || 0;
                } else {
                    $this.data('reminded-value', $this.data('circles-value') || 0);
                    self.appearCollectionIds.push('#' + id);
                }
                var circle = Circles.create({
                    id: id,
                    radius: $this.data('circles-radius') || 80,
                    value: value,
                    maxValue: $this.data('circles-max-value') || 100,
                    width: $this.data('circles-stroke-width') || 10,
                    text: function (value) {
                        if ($this.data('circles-type') === 'iconic') {
                            return $this.data('circles-icon');
                        } else {
                            return value + ($this.data('circles-additional-text') || '');
                        }
                    },
                    colors: [$this.data('circles-bg-color') || '#111111', $this.data('circles-fg-color') || '#eeeeee'],
                    duration: $this.data('circles-duration') || 1000,
                    wrpClass: self.config['wrpClass'],
                    textClass: self.config['textClass'],
                    valueStrokeClass: self.config['valueStrokeClass'],
                    maxValueStrokeClass: self.config['maxValueStrokeClass'],
                    styleWrapper: self.config['styleWrapper'],
                    styleText: self.config['styleText']
                });
                $this.data('circle', circle);
                $this.find('.' + self.config['textClass']).css({
                    'font-size': $this.data('circles-font-size'),
                    'font-weight': $this.data('circles-font-weight'),
                    'color': $this.data('circles-color')
                });
                if (self.config['rtl']) {
                    $this.find('svg').css('transform', 'matrix(-1, 0, 0, 1, 0, 0)');
                }
                self.pageCollection = self.pageCollection.add($this);
            });
            if (self.appearCollectionIds.length) self._initAppear();
        },
        _initAppear: function () {
            var self = this;
            appear({
                bounds: self.config['bounds'],
                debounce: self.config['debounce'],
                elements: function () {
                    return document.querySelectorAll(self.appearCollectionIds.join(','));
                },
                appear: function (element) {
                    element = $(element);
                    element.data('circle').update(element.data('reminded-value'));
                }
            });
        },
        get: function (index) {
            if (index && $.isNumeric(index)) return this.pageCollection.eq(index);
            return this.pageCollection;
        },
        getById: function (id) {
            if (id && this.pageCollection.filter('#' + id).length) return this.pageCollection.filter('#' + id);
            return null;
        },
        getCircleAPI: function (index) {
            if (index && $.isNumeric(index) && this.pageCollection.eq(index).length) return this.pageCollection.eq(index).data('circle');
            return null;
        },
        getCircleAPIById: function (id) {
            if (id && this.pageCollection.filter('#' + id).length) return this.pageCollection.filter('#' + id).data('circle');
            return null;
        }
    };
})(jQuery);
