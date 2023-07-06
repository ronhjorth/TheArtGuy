/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Functions Init
  Version: 2.5
========================================================*/

$(document).on('ready', function () {
    $('#accordion-13 a').on('click', function (e) {
        e.stopPropagation();
    });
    // Initialization of popups
    $.GSCore.components.GSPopup.init('.js-fancybox');
    // Initialization of popups with media
    $.GSCore.components.GSPopup.init('.js-fancybox-media', {
        helpers: {
            media: {},
            overlay: {
                css: {
                    'background': 'rgba(255, 255, 255, .8)'
                }
            }
        }
    });
    // Initialization of gallery with thumbs
    $.GSCore.components.GSPopup.init('.js-fancybox-thumbs', {
        thumbs: {
            showOnStart: true
        }
    });
    // Initialization of carousel
    $.GSCore.components.GSCarousel.init('.js-carousel');
    // Initialization of Go To
    $.GSCore.components.GSGoTo.init('.js-go-to');
    // Initialization of countdowns
    var countdowns = $.GSCore.components.GSCountdown.init('.js-countdown', {
        yearsElSelector: '.js-cd-years',
        monthElSelector: '.js-cd-month',
        daysElSelector: '.js-cd-days',
        hoursElSelector: '.js-cd-hours',
        minutesElSelector: '.js-cd-minutes',
        secondsElSelector: '.js-cd-seconds'
    });
    // Initialization of countdowns within chart pies
    var countdowns_pies = $.GSCore.components.GSCountdown.init('.js-countdown-pies', {
        yearsElSelector: '.js-cd-years',
        monthElSelector: '.js-cd-month',
        daysElSelector: '.js-cd-days',
        hoursElSelector: '.js-cd-hours',
        minutesElSelector: '.js-cd-minutes',
        secondsElSelector: '.js-cd-seconds',
        circles: true
    });
    // Initialization of counters
    var counters = $.GSCore.components.GSCounter.init('[class*="js-counter"]');
    // Initialization of chart pies with rtl option
    var rtlItems = $.GSCore.components.GSChartPie.init('.js-pie-rtl', {
        rtl: true
    });
    // Initialization of chart pies
    var items = $.GSCore.components.GSChartPie.init('.js-pie');
    // Initialization of chart pies
    $.GSCore.components.GSChartPie.init('.js-pie');
    // Initialization of autocomplet
    $.GSCore.components.GSAutocomplete.init('#autocomplete2');
    // Initialization of forms
    $.GSCore.components.GSFileAttachment.init('.js-file-attachment');
    $.GSCore.helpers.GSFocusState.init();
    // Initialization of forms
    $.GSCore.components.GSCountQty.init('.js-quantity');
    // Initialization of forms
    $.GSCore.helpers.GSRating.init();
    // Initialization of forms
    $.GSCore.components.GSSlider.init('#regularSlider, #regularSlider2, #regularSlider3, #rangeSlider, #rangeSlider2, #rangeSlider3, #stepSlider, #stepSlider2, #stepSlider3');
    // Initialization of forms
    $.GSCore.components.GSDatepicker.init('#datepickerDefault, #datepickerInline, #datepickerInlineFrom, #datepickerFrom');
    // Initialization of parallax
    $('.dzsparallaxer').dzsparallaxer();
    // Initialization of video on background
    $.GSCore.helpers.GSBgVideo.init('.js-bg-video');
    // Initialization of scroll animation
    $.GSCore.components.GSOnScrollAnimation.init('[data-animation]');
    // Initialization of cubeportfolio
    $.GSCore.components.GSCubeportfolio.init('.cbp');
    // Initialization of rating
    $.GSCore.components.GSRating.init($('.js-rating'), {
        spacing: 4
    });
    // Initialization of horizontal progress bars
    var horizontalProgressBars = $.GSCore.components.GSProgressBar.init('.js-hr-progress-bar', {
        direction: 'horizontal',
        indicatorSelector: '.js-hr-progress-bar-indicator'
    });
    // Initialization of vertical progress bars
    var verticalProgressBars = $.GSCore.components.GSProgressBar.init('.js-vr-progress-bar', {
        direction: 'vertical',
        indicatorSelector: '.js-vr-progress-bar-indicator'
    });
    // Initialization of peity charts
    $.GSCore.components.GSChart.peity.init($('.js-peity-chart'));
    // Initialization of header's height equal offset
    $.GSCore.helpers.GSHeightCalc.init();
    // Initialization of tabs
    $.GSCore.components.GSTabs.init('[role="tablist"]');
    // Initialization of GSDropdown Search component
    $.GSCore.components.GSDropdown.init($('[data-dropdown-target]'), {
        afterOpen: function () {
            $(this).find('input[type="search"]').focus();
        }
    });
    // Initialization of GSDropdown component
    $.GSCore.components.GSDropdown.init($('[data-dropdown-target]'));
    // Initialization of GSScrollBar component
    $.GSCore.components.GSScrollBar.init($('.js-scrollbar'));
    // Initialization of GSNavigationSplitted helper
    $.GSCore.helpers.GSNavigationSplitted.init($('.navbar-collapse'));
    // Initialization of custom select
    $.GSCore.components.GSSelect.init('.js-custom-select');
    // Initialization of Text Animation Typing
    $('.u-text-animation.u-text-animation--typing').typed({
        strings: [
            'a nice template',
            'a perfect template',
            'a clean template'
        ],
        typeSpeed: 60,
        loop: true,
        backDelay: 1500
    });
});

// Initialization of Slider Revolution
var tpj = jQuery, revapi1174, revslider_showDoubleJqueryError;
tpj(document).on('ready', function () {
    if (tpj('#rev_slider_1174_1').revolution === undefined) {
        revslider_showDoubleJqueryError('#rev_slider_1174_1');
    } else {
        revapi1174 = tpj('#rev_slider_1174_1').show().revolution({
            sliderType: 'hero',
            jsFileLocation: 'assets/vendor/revolution-slider/revolution/js/',
            sliderLayout: 'fullscreen',
            dottedOverlay: 'none',
            delay: 9000,
            navigation: {},
            responsiveLevels: [1240, 1024, 778, 480],
            visibilityLevels: [1240, 1024, 778, 480],
            gridwidth: [1240, 1024, 778, 480],
            gridheight: [868, 768, 960, 720],
            lazyType: 'none',
            parallax: {
                type: 'scroll',
                origo: 'slidercenter',
                speed: 400,
                levels: [10, 15, 20, 25, 30, 35, 40, -10, -15, -20, -25, -30, -35, -40, -45, 55]
            },
            shadow: 0,
            spinner: 'off',
            autoHeight: 'off',
            fullScreenAutoWidth: 'off',
            fullScreenAlignForce: 'off',
            fullScreenOffsetContainer:'',
            fullScreenOffset: '60px',
            disableProgressBar: 'on',
            hideThumbsOnMobile: 'off',
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: 'off',
                disableFocusListener: false
            }
        });
    }

});

$(window).on('load', function () {
    // Initialization of Preloader
    $('#loader').fadeOut(500);
    // Initialization of Header
    $.GSCore.components.GSHeader.init($('#js-header'));
    $.GSCore.helpers.GSHamburgers.init('.hamburger');
    // Initialization of GSMegaMenu Component
    $('.js-mega-menu').GSMegaMenu({
        event: 'hover',
        pageContainer: $('.container'),
        breakpoint: 991
    });
    // Initialization of Masonry
    $('.masonry-grid').imagesLoaded().then(function () {
        $('.masonry-grid').masonry({
            columnWidth: '.masonry-grid-sizer',
            itemSelector: '.masonry-grid-item',
            percentPosition: true
        });
    });
});

$(window).on('resize', function () {
    setTimeout(function () {
        $.GSCore.components.GSTabs.init('[role="tablist"]');
    }, 200);
});

// Initialization of Google Maps
function initMap() {
    $.GSCore.components.GSGMap.init('.js-g-map');
}
