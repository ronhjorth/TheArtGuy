/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Revolution Slider Script
  Version: 2.5
========================================================*/
;(function (jQuery) {
    'use strict';
    var revapi349, revapi347, revapi348, revapi314, revapi312, revapi28, revapi26, revapi24, tpj = jQuery, revslider_showDoubleJqueryError;
    // Product Showcase Slider
    tpj(document).on('ready', function () {
        if (tpj("#rev_slider_349_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_349_1");
        } else {
            revapi349 = tpj("#rev_slider_349_1").show().revolution({
                sliderType: "standard",
                jsFileLocation: 'assets/vendor/revolution-slider/revolution/js/',
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                navigation: {
                    keyboardNavigation: "off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    mouseScrollReverse: "default",
                    onHoverStop: "off",
                    arrows: {
                        style: "new-bullet-bar",
                        enable: true,
                        hide_onmobile: true,
                        hide_under: 778,
                        hide_onleave: false,
                        tmp: '<div class="tp-title-wrap"> <div class="tp-arr-imgholder"></div> <div class="tp-arr-img-over"></div> </div>',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 30,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 30,
                            v_offset: 0
                        }
                    }
                },
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1240, 1024, 778, 480],
                gridheight: [900, 768, 960, 720],
                lazyType: "none",
                parallax: {
                    type: "scroll",
                    origo: "slidercenter",
                    speed: 1000,
                    speedbg: 0,
                    speedls: 1000,
                    levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 30],
                },
                shadow: 0,
                spinner: "spinner5",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false
                }
            });
        }

    });
    // Smooth Parallax Scroll Slider
    tpj(document).on('ready', function () {
        if (tpj("#rev_slider_347_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_347_1");
        } else {
            revapi347 = tpj("#rev_slider_347_1").show().revolution({
                sliderType: "hero",
                jsFileLocation: 'assets/vendor/revolution-slider/revolution/js/',
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                responsiveLevels: [1240, 1240, 778, 480],
                visibilityLevels: [1240, 1240, 778, 480],
                gridwidth: [1240, 1240, 778, 480],
                gridheight: [868, 868, 960, 720],
                lazyType: "none",
                parallax: {
                    type: "scroll",
                    origo: "slidercenter",
                    speed: 1000,
                    speedbg: 0,
                    speedls: 2000,
                    levels: [8, 16, 24, 32, -8, -16, -24, -32, 36, 2, 4, 6, 50, -30, -20, 55],
                },
                shadow: 0,
                spinner: "spinner1",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "",
                disableProgressBar: "on",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    disableFocusListener: false,
                }
            });
        }
    });
    // Overexposure Transition Slider
    tpj(document).on('ready', function () {
        if (tpj("#rev_slider_348_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_348_1");
        } else {
            revapi348 = tpj("#rev_slider_348_1").show().revolution({
                sliderType: "standard",
                jsFileLocation: 'assets/vendor/revolution-slider/revolution/js/',
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 12000,
                particles: {
                    startSlide: "first", endSlide: "last", zIndex: "1",
                    particles: {
                        number: {value: 100}, color: {value: "#ffffff"},
                        shape: {
                            type: "circle", stroke: {width: 0, color: "#ffffff", opacity: 1},
                            image: {src: ""}
                        },
                        opacity: {
                            value: 0.75,
                            random: true,
                            min: 0.25,
                            anim: {enable: false, speed: 3, opacity_min: 0, sync: false}
                        },
                        size: {
                            value: 2,
                            random: true,
                            min: 0.5,
                            anim: {enable: false, speed: 40, size_min: 1, sync: false}
                        },
                        line_linked: {enable: false, distance: 150, color: "#ffffff", opacity: 0.4, width: 1},
                        move: {
                            enable: true,
                            speed: 1,
                            direction: "top",
                            random: true,
                            min_speed: 3,
                            straight: false,
                            out_mode: "out"
                        }
                    },
                    interactivity: {
                        events: {onhover: {enable: false, mode: "repulse"}, onclick: {enable: false, mode: "repulse"}},
                        modes: {
                            grab: {distance: 400, line_linked: {opacity: 0.5}},
                            bubble: {distance: 400, size: 40, opacity: 0.4},
                            repulse: {distance: 200}
                        }
                    }
                },
                navigation: {
                    keyboardNavigation: "off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    mouseScrollReverse: "default",
                    onHoverStop: "off",
                    arrows: {
                        style: "uranus",
                        enable: true,
                        hide_onmobile: false,
                        hide_onleave: false,
                        tmp: '',
                        left: {
                            h_align: "right",
                            v_align: "bottom",
                            h_offset: 60,
                            v_offset: 10
                        },
                        right: {
                            h_align: "right",
                            v_align: "bottom",
                            h_offset: 10,
                            v_offset: 10
                        }
                    }
                },
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1240, 1024, 778, 480],
                gridheight: [868, 768, 960, 720],
                lazyType: "smart",
                parallax: {
                    type: "scroll",
                    origo: "slidercenter",
                    speed: 400,
                    speedbg: 1500,
                    speedls: 1000,
                    levels: [5, 10, 15, 20, 25, 30, 35, 40, 60, 46, -10, -15, -20, -25, -30, 55],
                },
                shadow: 0,
                spinner: "off",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false,
                }
            });
        }
    });
    // Mountain Parallax Slider
    tpj(document).on('ready', function () {
        if (tpj("#rev_slider_314_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_314_1");
        } else {
            revapi314 = tpj("#rev_slider_314_1").show().revolution({
                sliderType: "hero",
                jsFileLocation: 'assets/vendor/revolution-slider/revolution/js/',
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1240, 1024, 778, 480],
                gridheight: [868, 768, 960, 720],
                lazyType: "none",
                parallax: {
                    type: "scroll",
                    origo: "slidercenter",
                    speed: 400,
                    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 48, 49, 50, 51, 55],
                },
                shadow: 0,
                spinner: "spinner3",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "60px",
                disableProgressBar: "on",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    disableFocusListener: false,
                }
            });
        }
    });
    // Double Exposure Effects Slider
    tpj(document).on('ready', function () {
        if (tpj("#rev_slider_312_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_312_1");
        } else {
            revapi312 = tpj("#rev_slider_312_1").show().revolution({
                sliderType: "standard",
                jsFileLocation: 'assets/vendor/revolution-slider/revolution/js/',
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                navigation: {
                    keyboardNavigation: "off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    mouseScrollReverse: "default",
                    onHoverStop: "off",
                    bullets: {
                        enable: true,
                        hide_onmobile: false,
                        style: "hermes",
                        hide_onleave: false,
                        direction: "horizontal",
                        h_align: "center",
                        v_align: "bottom",
                        h_offset: 0,
                        v_offset: 30,
                        space: 5,
                        tmp: ''
                    }
                },
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1240, 1024, 778, 480],
                gridheight: [868, 768, 960, 720],
                lazyType: "none",
                parallax: {
                    type: "scroll",
                    origo: "slidercenter",
                    speed: 400,
                    levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
                },
                shadow: 0,
                spinner: "spinner3",
                stopLoop: "on",
                stopAfterLoops: 0,
                stopAtSlide: 1,
                shuffle: "off",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "60px",
                disableProgressBar: "on",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false,
                }
            });
        }
    });
    // Parallax Zoom Slices Slider
    tpj(document).on('ready', function () {
        if (tpj("#rev_slider_28_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_28_1");
        } else {
            revapi28 = tpj("#rev_slider_28_1").show().revolution({
                sliderType: "standard",
                jsFileLocation: 'assets/vendor/revolution-slider/revolution/js/',
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 5500,
                navigation: {
                    keyboardNavigation: "off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    mouseScrollReverse: "default",
                    onHoverStop: "off",
                    arrows: {
                        style: "uranus",
                        enable: true,
                        hide_onmobile: false,
                        hide_onleave: false,
                        tmp: '',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 20,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 20,
                            v_offset: 0
                        }
                    },
                    bullets: {
                        enable: true,
                        hide_onmobile: false,
                        style: "hermes",
                        hide_onleave: false,
                        direction: "horizontal",
                        h_align: "center",
                        v_align: "bottom",
                        h_offset: 0,
                        v_offset: 20,
                        space: 5,
                        tmp: ''
                    }
                },
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1240, 1024, 778, 480],
                gridheight: [868, 768, 960, 720],
                lazyType: "none",
                shadow: 0,
                spinner: "off",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "60px",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false
                }
            });
        }
    });
    // Minimal Mask Showcase Slider
    tpj(document).on('ready', function () {
        if (tpj("#rev_slider_26_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_26_1");
        } else {
            revapi26 = tpj("#rev_slider_26_1").show().revolution({
                sliderType: "standard",
                jsFileLocation: 'assets/vendor/revolution-slider/revolution/js/',
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                navigation: {
                    keyboardNavigation: "off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    mouseScrollReverse: "default",
                    onHoverStop: "off",
                    touch: {
                        touchenabled: "on",
                        touchOnDesktop: "off",
                        swipe_threshold: 75,
                        swipe_min_touches: 1,
                        swipe_direction: "horizontal",
                        drag_block_vertical: false
                    },
                    arrows: {
                        style: "uranus",
                        enable: true,
                        hide_onmobile: true,
                        hide_under: 778,
                        hide_onleave: false,
                        tmp: '',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 15,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 15,
                            v_offset: 0
                        }
                    },
                    bullets: {
                        enable: true,
                        hide_onmobile: false,
                        style: "bullet-bar",
                        hide_onleave: false,
                        direction: "horizontal",
                        h_align: "center",
                        v_align: "bottom",
                        h_offset: 0,
                        v_offset: 30,
                        space: 5,
                        tmp: ''
                    }
                },
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1240, 1024, 778, 480],
                gridheight: [868, 768, 960, 720],
                lazyType: "none",
                parallax: {
                    type: "scroll",
                    origo: "slidercenter",
                    speed: 2000,
                    levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
                },
                shadow: 0,
                spinner: "off",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "60px",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false,
                }
            });
        }
    });
    // Website Intro Slider
    tpj(document).on('ready', function () {
        if (tpj("#rev_slider_24_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_24_1");
        } else {
            revapi24 = tpj("#rev_slider_24_1").show().revolution({
                sliderType: "standard",
                jsFileLocation: 'assets/vendor/revolution-slider/revolution/js/',
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                navigation: {
                    keyboardNavigation: "off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    mouseScrollReverse: "default",
                    onHoverStop: "off",
                    bullets: {
                        enable: true,
                        hide_onmobile: false,
                        style: "bullet-bar",
                        hide_onleave: false,
                        direction: "horizontal",
                        h_align: "center",
                        v_align: "bottom",
                        h_offset: 0,
                        v_offset: 50,
                        space: 5,
                        tmp: ''
                    }
                },
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1240, 1024, 778, 480],
                gridheight: [868, 768, 960, 720],
                lazyType: "none",
                shadow: 0,
                spinner: "off",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "60px",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false,
                }
            });
        }
    });
})(jQuery);


