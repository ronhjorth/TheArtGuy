/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Element Init
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
    // Initialization of tabs
    $.GSCore.components.GSTabs.init('[role="tablist"]');
});

$(window).on('load', function () {
    // Initialization of Header
    $.GSCore.components.GSHeader.init($('#js-header'));
    $.GSCore.helpers.GSHamburgers.init('.hamburger');
    // Initialization of GSMegaMenu Component
    $('.js-mega-menu').GSMegaMenu({
        event: 'hover',
        pageContainer: $('.container'),
        breakpoint: 991
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


