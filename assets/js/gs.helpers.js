/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Theme JavaScript Helpers
  Version: 2.5
========================================================*/
;(function ($) {
    'use strict';
    // 01. Video Background Helper
    $.GSCore.helpers.GSBgVideo = {
        // Init Function
        init: function (el) {
            var $selector = $(el);
            $selector.gsBgVideo();
        }
    };
    // 02. Compressed Form Helper
    $.GSCore.helpers.GSCompressedForm = {
        // Init Function
        init: function (collection) {
            if (!collection || !collection.length) return;
            this.collection = collection;
            this.collection.addClass('u-compressed-form--hidden');
            this.bindEvents();
        },
        // Bind Events Function
        bindEvents: function () {
            var self = this;
            this.collection.on('click', function (e) {
                var $this = $(this);
                if (!$this.hasClass('u-prevented')) {
                    e.preventDefault();
                    $this.removeClass('u-compressed-form--hidden').addClass('u-prevented');
                    $this.find('input').focus();
                }
            });
            $(document).on('click.uSearchform', function (e) {
                if ($(e.target).closest('.u-compressed-form').length) return;
                self.collection.addClass('u-compressed-form--hidden').removeClass('u-prevented');
            });
        }
    };
    // 03. File Attachment Helper
    $.GSCore.helpers.GSFileAttachments = {
        // Init Function
        init: function () {
            var collection = $('.u-file-attach--v1 input[type="file"]:enabled, .u-file-attach--v2 input[type="file"]:enabled, .u-file-attach-v1 input[type="file"]:enabled, .u-file-attach-v2 input[type="file"]:enabled');
            if (!collection.length) return;
            collection.each(function () {
                var $this = $(this), $thisParent = $this.closest('.u-file-attach--v1, .u-file-attach--v2, .u-file-attach-v1, .u-file-attach-v2'), textInputLength = $thisParent.find('input[type="text"]:enabled');
                $this.on('change', function () {
                    var thisVal = $this.val();
                    if (!textInputLength.length) {
                        $thisParent.find('.js-value').text(thisVal.replace(/.+[\\\/]/, ''));
                    } else {
                        $thisParent.find('input[type="text"]:enabled').val(thisVal);
                    }
                });
            });
        }
    };
    // 04. Focus State Helper
    $.GSCore.helpers.GSFocusState = {
        // Init Function
        init: function () {
            var collection = $('.input-group input:not([type="checkbox"], [type="radio"]), .input-group textarea, .input-group select');
            if (!collection.length) return;
            collection.on('focusin', function () {
                var $this = $(this), $thisParent = $this.closest('.input-group'); $thisParent.addClass('g-state-focus');
            });
            collection.on('focusout', function () {
                var $this = $(this), $thisParent = $this.closest('.input-group');
                $thisParent.removeClass('g-state-focus');
            });
        }
    };
    // 05. Hamburgers Helper
    $.GSCore.helpers.GSHamburgers = {
        // Init Function
        init: function (selector) {
            if (!selector || !$(selector).length) return;
            var hamburgers = $(selector), timeoutid; hamburgers.each(function (i, el) {
                var $this = $(this);
                if ($this.closest('button').length) {
                    $this.closest('button').get(0).addEventListener('click', function (e) {
                        var $self = $(this), $hamburger = $self.find(selector);
                        if (timeoutid) clearTimeout(timeoutid);
                        timeoutid = setTimeout(function () {
                            $hamburger.toggleClass('is-active');
                        }, 10);
                        e.preventDefault();
                    }, false);
                } else {
                    $this.get(0).addEventListener('click', function (e) {
                        var $self = $(this);
                        if (timeoutid) clearTimeout(timeoutid);
                        timeoutid = setTimeout(function () {
                            $self.toggleClass('is-active');
                        }, 10);
                        e.preventDefault();
                    }, false);
                }
            });
        }
    };
    // 06. Height Calculator Helper
    $.GSCore.helpers.GSHeightCalc = {
        // Init Function
        init: function () {
            var collection = $('[data-calc-target]');
            if (!collection.length) return;
            collection.each(function () {
                var $this = $(this), $target = $this.data('calc-target');
                $this.css({
                    'height': 'calc(100vh - ' + $($target).outerHeight() + 'px)'
                });
            });
        }
    };
    // 07. Hover Blocks Helper
    $.GSCore.helpers.GSHoverBlocks = {
        // General Function
        papercut: function () {
            var collection = $('.g-block-hover__additional--pappercut-front, .g-block-hover__additional--pappercut-back');
            if (!collection.length) return;
            collection.each(function () {
                var $this = $(this), clipArea = $this.closest('.g-block-hover').outerHeight() / 2 + 60;
                $this.css('background-image', 'url(' + $this.children('img').hide().attr('src') + ')');
                if ($this.hasClass('g-block-hover__additional--pappercut-front')) {
                    $this.css('clip', 'rect(0px, auto, ' + clipArea + 'px, 0px)');
                } else {
                    $this.css('clip', 'rect(' + clipArea + 'px, auto, auto, 0px)');
                }
            });
        }
    };
    // 08. Modal Markup Helper
    $.GSCore.helpers.GSModalMarkup = {
        // Init Function
        init: function (el) {
            var collection = $(el);
            if (!collection.length) return;
            var target,
                HTMLArr = {},
                stylesArr = {},
                scriptsArr = {};
            collection.each(function () {
                var $this = $(this), contentTarget = $this.data('content-target');
            });
            $(el).on('click', function () {
                target = $(this).data('content-target');
            });
            // Modal View Function
            $.GSCore.components.GSModalWindow.init(el, {
                onOpen: function () {
                    if (stylesArr[target] !== '' || scriptsArr[target] !== '') {
                        $('.custombox-content .modal-demo')
                            .append('<div id="modalMarkupContent" style="height: 100%;"><ul class="nav text-center justify-content-center u-nav-v5-2 u-nav-primary g-mb-10" role="tablist"></ul><div id="modalMarkupInner" class="tab-content" style="height: calc(100% - 47px);"></div></div>');
                        $('.custombox-content .nav')
                            .append('<li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#markupHTML" role="tab">HTML</a></li>');
                        $('.custombox-content .tab-content')
                            .append('<div id="markupHTML" class="markup-inner tab-pane g-brd-around g-brd-gray-light-v1 fade show active" role="tabpanel" style="max-height: 100%;"><pre><code class="language-markup"><div></div></code></pre></div>')
                            .find('#markupHTML code > div')
                            .text(HTMLArr[target]);
                        if (stylesArr[target] !== '') {
                            $('.custombox-content .nav')
                                .append('<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#markupStyles" role="tab">Styles</a></li>');
                            $('.custombox-content .tab-content')
                                .append('<div id="markupStyles" class="markup-inner tab-pane g-brd-around g-brd-gray-light-v1 fade" role="tabpanel" style="max-height: 100%;"><pre><code class="language-markup"><div></div></code></pre></div>')
                                .find('#markupStyles code > div')
                                .text(stylesArr[target]);
                        }
                        if (scriptsArr[target] !== '') {
                            $('.custombox-content .nav')
                                .append('<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#markupScripts" role="tab">Scripts</a></li>');
                            $('.custombox-content .tab-content')
                                .append('<div id="markupScripts" class="markup-inner tab-pane g-brd-around g-brd-gray-light-v1 fade" role="tabpanel" style="max-height: 100%;"><pre><code class="language-markup"><div></div></code></pre></div>')
                                .find('#markupScripts code > div')
                                .text(scriptsArr[target]);
                        }
                        // Tabs Function
                        $.GSCore.components.GSTabs.init('[role="tablist"]');
                    } else {
                        $('.custombox-content .modal-demo')
                            .append('<div id="modalMarkupContent" style="height: 100%;"><div id="modalMarkupInner" class="markup-inner g-brd-around g-brd-gray-light-v1" style="max-height: 100%;"><pre><code class="language-markup"><div></div></code></pre></div></div>')
                            .find('#modalMarkupInner code > div')
                            .text(HTMLArr[target]);
                    }
                    // ScrollBar Function
                    $.GSCore.components.GSScrollBar.init($('.custombox-content .markup-inner'));
                    Prism.highlightAll();
                },
                onClose: function () {
                    $('#modalMarkupContent').remove();
                }
            });
        }
    };
    // 10. Splitted Navigation Helper
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
    // 11. Not Empty State Helper
    $.GSCore.helpers.GSNotEmptyState = {
        // Init Function
        init: function () {
            var collection = $('input:not([type="checkbox"], [type="radio"]), textarea');
            if (!collection.length) return;
            collection.on('keyup', function () {
                var $this = $(this), thisVal = $this.val();
                if (thisVal !== 0) {
                    $this.addClass('g-state-not-empty');
                } else {
                    $this.removeClass('g-state-not-empty');
                }
            });
        }
    };
    // 12. Rating Helper
    $.GSCore.helpers.GSRating = {
        // Init Function
        init: function () {
            var collection = $('.js-rating-1');
            if (!collection.length) return;
            collection.each(function () {
                var $this = $(this),
                    $target = $this.find('> *'),
                    hoverClasses = $this.data('hover-classes');
                $target.on('mouseenter', function () {
                    $(this).addClass(hoverClasses);
                    $(this).prevAll().addClass(hoverClasses);
                    $(this).nextAll().not('.click').removeClass(hoverClasses);
                });
                $target.on('mouseleave', function () {
                    $target.not('.click').removeClass(hoverClasses);
                });
                $target.on('click', function () {
                    $(this).addClass('click ' + hoverClasses);
                    $(this).prevAll().addClass('click ' + hoverClasses);
                    $(this).nextAll().removeClass('click ' + hoverClasses);
                });
            });
        }
    };
    // 13. Selecter Helper
    $(document).on('click', '.js-selecter', function () {
        this.select();
    });
})(jQuery);

