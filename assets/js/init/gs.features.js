/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Features Init
  Version: 2.5
========================================================*/

$(document).on('ready', function () {
    // Initialization of go to
    $.GSCore.components.GSGoTo.init('.js-go-to');
    // Initialization of carousel
    $.GSCore.components.GSCarousel.init('.js-carousel');
    // Initialization of GSDropdown component
    $.GSCore.components.GSDropdown.init($('[data-dropdown-target]'), {
        afterOpen: function () {
            $(this).find('input[type="search"]').focus();
        }
    });
    // Initialization of GSScrollBar component
    $.GSCore.components.GSScrollBar.init($('.js-scrollbar'));
    // Initialization of popups
    $.GSCore.components.GSPopup.init('.js-fancybox');
});
$(window).on('load', function () {
    // Initialization of header
    $.GSCore.components.GSHeader.init($('#js-header'));
    $.GSCore.helpers.GSHamburgers.init('.hamburger');
});
