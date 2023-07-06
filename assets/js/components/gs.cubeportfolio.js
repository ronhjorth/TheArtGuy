/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Filter Component
  Version: 2.5
========================================================*/

;(function ($) {
    'use strict';
    // Filter Function
    $.GSCore.components.GSCubeportfolio = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initCubeportfolio();
            return this.pageCollection;
        },
        initCubeportfolio: function () {
            // Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    setControls = $this.data('controls'),
                    setLayout = $this.data('layout'),
                    setXGap = $this.data('x-gap'),
                    setYGap = $this.data('y-gap'),
                    setLoadMoreAction = $this.data('action'),
                    setLoadMoreItems = $this.data('items'),
                    setAnimation = $this.data('animation'),
                    setCaptionAnimation = $this.data('caption-animation'),
                    setDefaultMediaQueries = [{
                        width: 1500,
                        cols: 3
                    }, {
                        width: 1100,
                        cols: 3
                    }, {
                        width: 800,
                        cols: 3
                    }, {
                        width: 480,
                        cols: 2,
                        options: {
                            caption: '',
                            gapHorizontal: 10,
                            gapVertical: 10
                        }
                    }],
                    setMeidaQueries = JSON.parse(el.getAttribute('data-media-queries'));
                $this.cubeportfolio({
                    filters: setControls,
                    layoutMode: setLayout,
                    defaultFilter: '*',
                    sortToPreventGaps: true,
                    gapHorizontal: setXGap,
                    gapVertical: setYGap,
                    animationType: setAnimation,
                    gridAdjustment: 'responsive',
                    mediaQueries: setMeidaQueries ? setMeidaQueries : setDefaultMediaQueries,
                    caption: setCaptionAnimation ? setCaptionAnimation : 'overlayBottomAlong',
                    displayType: 'sequentially',
                    displayTypeSpeed: 100,
                    // Lightbox
                    lightboxDelegate: '.cbp-lightbox',
                    lightboxGallery: true,
                    lightboxTitleSrc: 'data-title',
                    lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
                    // Single Page Inline
                    singlePageInlineDelegate: '.cbp-singlePageInline',
                    singlePageInlinePosition: 'below',
                    singlePageInlineInFocus: true,
                    plugins: {
                        loadMore: {
                            element: '#js-cbp-loadMore',
                            action: setLoadMoreAction,
                            loadItems: setLoadMoreItems
                        }
                    },
                    singlePageInlineCallback: function (url, element) {
                        var t = this;
                        $.ajax({
                            url: url,
                            type: 'GET',
                            dataType: 'html',
                            timeout: 30000
                        })
                            .done(function (result) {
                                t.updateSinglePageInline(result);
                            })
                            .fail(function () {
                                t.updateSinglePageInline('AJAX Error! Please refresh the page!');
                            });
                    },

                    // Single Page Popup
                    singlePageDelegate: '.cbp-singlePage',
                    singlePageDeeplinking: true,
                    singlePageStickyNavigation: true,
                    singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
                    singlePageCallback: function (url, element) {
                        var t = this;
                        $.ajax({
                            url: url,
                            type: 'GET',
                            dataType: 'html',
                            timeout: 10000
                        })
                            .done(function (result) {
                                t.updateSinglePage(result);
                            })
                            .fail(function () {
                                t.updateSinglePage('AJAX Error! Please refresh the page!');
                            });
                    }
                });
                // Actions
                collection = collection.add($this);
            });
        }
    };
})(jQuery);
