/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: GSCore
  Version: 2.5
========================================================*/

/*============================================
    START TABLE OF CONTENT
==============================================
    1.  GSCore Structure
        1.1 Init Function
        1.2 Components Function
        1.3 Helpers Function
        1.4 Settings Function
    2.  GSCore Init
==============================================
    END TABLE OF CONTENT
============================================*/

;(function ($) {
    'use strict';
    //  1. GSCore Structure
    $.GSCore = {
        // 1.1 Init Function
        init: function () {
            $(document).ready(function (e) {
                // Bootstrap Tooltips
                $('[data-toggle="tooltip"]').tooltip();
                // Set Background Image Dynamically
                if ($('[data-bg-img-src]').length) $.GSCore.helpers.bgImage($('[data-bg-img-src]'));
                // JQuery Extends
                $.GSCore.helpers.extendjQuery();
                // Detect Internet Explorer
                $.GSCore.helpers.detectIE();
                // Bootstrap Navigation Options
                $.GSCore.helpers.bootstrapNavOptions.init();
            });
            $(window).on("load", function () {
                // Preloader
                $("#loading").fadeOut(500);
            })
        },
        // 1.2 Components Function
        components: {},
        // 1.3 Helpers Function
        helpers: {
            Math: {
                getRandomValueFromRange: function (startPoint, endPoint, fixed) {
                    var fixedInner = fixed ? fixed : false;
                    Math.random();
                    return fixedInner ? (Math.random() * (endPoint - startPoint) + startPoint) : (Math.floor(Math.random() * (endPoint - startPoint + 1)) + startPoint);
                }
            },
            // Dynamically Background Image
            bgImage: function (collection) {
                if (!collection || !collection.length) return;
                return collection.each(function (i, el) {
                    var $el = $(el),
                        bgImageSrc = $el.data('bg-img-src');
                    if (bgImageSrc) $el.css('background-image', 'url(' + bgImageSrc + ')');
                });
            },
            // Extends basic jQuery functionality
            extendjQuery: function () {
                $.fn.extend({
                    // Runs specified function after loading of all images
                    imagesLoaded: function () {
                        var $imgs = this.find('img[src!=""]');
                        if (!$imgs.length) {
                            return $.Deferred().resolve().promise();
                        }
                        var dfds = [];
                        $imgs.each(function () {
                            var dfd = $.Deferred();
                            dfds.push(dfd);
                            var img = new Image();
                            img.onload = function () {
                                dfd.resolve();
                            };
                            img.onerror = function () {
                                dfd.resolve();
                            };
                            img.src = this.src;
                        });
                        return $.when.apply($, dfds);
                    }
                });
            },
            // Detect Internet Explorer
            detectIE: function () {
                var ua = window.navigator.userAgent;
                var trident = ua.indexOf('Trident/');
                if (trident > 0) {
                    // IE 11 => Return version number
                    var rv = ua.indexOf('rv:');
                    var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                    document.querySelector('body').className += ' IE';
                }
                var edge = ua.indexOf('Edge/');
                if (edge > 0) {
                    // IE 12 or Edge => Return version number
                    var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                    document.querySelector('body').className += ' IE';
                }
                // Other browser
                return false;
            },
            // Bootstrap navigation options
            bootstrapNavOptions: {
                init: function () {
                    this.mobileHideOnScroll();
                },
                mobileHideOnScroll: function () {
                    var $collection = $('.navbar');
                    if (!$collection.length) return;
                    var $w = $(window),
                        breakpointsMap = {
                            'sm': 576,
                            'md': 768,
                            'lg': 992,
                            'xl': 1200
                        };
                    $('body').on('click.HSMobileHideOnScroll', '.navbar-toggler', function (e) {
                        var $navbar = $(this).closest('.navbar');
                        if ($navbar.length) {
                            $navbar.data('mobile-menu-scroll-position', $w.scrollTop());
                        }
                        e.preventDefault();
                    });
                    $w.on('scroll.HSMobileHideOnScroll', function (e) {
                        $collection.each(function (i, el) {
                            var $this = $(el), $toggler, $nav, offset, $hamburgers, breakpoint;
                            if ($this.hasClass('navbar-expand-xl')) breakpoint = breakpointsMap['xl'];
                            else if ($this.hasClass('navbar-expand-lg')) breakpoint = breakpointsMap['lg'];
                            else if ($this.hasClass('navbar-expand-md')) breakpoint = breakpointsMap['md'];
                            else if ($this.hasClass('navbar-expand-xs')) breakpoint = breakpointsMap['xs'];
                            if ($w.width() > breakpoint) return;
                            $toggler = $this.find('.navbar-toggler');
                            $nav = $this.find('.navbar-collapse');
                            if (!$nav.data('mobile-scroll-hide')) return;
                            if ($nav.length) {
                                offset = $this.data('mobile-menu-scroll-position');
                                if (Math.abs($w.scrollTop() - offset) > 40 && $nav.hasClass('show')) {
                                    $toggler.trigger('click');
                                    $hamburgers = $toggler.find('.is-active');
                                    if ($hamburgers.length) {
                                        $hamburgers.removeClass('is-active');
                                    }
                                }
                            }
                        });
                    });
                }
            }
        },
        // 1.4 Settings Function
        settings: {
            rtl: false
        }
    };
    // 2. GSCore Init
    $.GSCore.init();
})(jQuery);
