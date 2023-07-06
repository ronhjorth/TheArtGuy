/*========================================================
  Theme Name: Gravity
  Description: Gravity - Multi-Purpose HTML Template
  Author: G-Projects
  Author URI: https://www.templatemonster.com/authors/gworld
  Script: Theme JavaScript Components
  Version: 2.5
========================================================*/
;(function ($) {
    'use strict';
    // 01. Google Map Component
    $.GSCore.components.GSGMap = {
        // Base Configuration
        _baseConfig: {
            zoom: 14,
            scrollwheel: false
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initGMap();
            return this.pageCollection;
        },
        initGMap: function () {
            // Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    ID = $this.attr('id'),
                    gMapType = $this.data('type'),
                    gMapLat = $this.data('lat'),
                    gMapLng = $this.data('lng'),
                    gMapZoom = $this.data('zoom'),
                    gMapTitle = $this.data('title'),
                    gMapStyles = JSON.parse(el.getAttribute('data-styles')),
                    gMapStylesArray = [],
                    polygon,
                    gMapPolygon = Boolean($this.data('polygon')),
                    gMapPolygonCords = JSON.parse(el.getAttribute('data-polygon-cords')),
                    gMapPolygonStyles = JSON.parse(el.getAttribute('data-polygon-styles')),
                    polylines,
                    gMapPolylines = Boolean($this.data('polylines')),
                    gMapPolylinesCords = JSON.parse(el.getAttribute('data-polylines-cords')),
                    gMapPolylinesStyles = JSON.parse(el.getAttribute('data-polylines-styles')),
                    gMapRoutes = Boolean($this.data('routes')),
                    gMapRoutesCords = JSON.parse(el.getAttribute('data-routes-cords')),
                    gMapRoutesStyles = JSON.parse(el.getAttribute('data-routes-styles')),
                    gMapGeolocation = Boolean($this.data('geolocation')),
                    gMapGeocoding = Boolean($this.data('geocoding')),
                    gMapCordsTarget = $this.data('cords-target'),
                    gMapPin = Boolean($this.data('pin')),
                    gMapPinIcon = $this.data('pin-icon'),
                    gMapMultipleMarkers = Boolean($this.data('multiple-markers')),
                    gMapMarkersLocations = JSON.parse(el.getAttribute('data-markers-locations')),
                    $gMap;

                // Map Type
                if (gMapType === 'satellite') {
                    $gMap = new google.maps.Map(document.getElementById(ID), {
                        zoom: gMapZoom ? gMapZoom : config['zoom'],
                        scrollwheel: config['scrollwheel']
                    });
                    $gMap.setCenter({
                        lat: gMapLat,
                        lng: gMapLng
                    });
                    $gMap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
                } else if (gMapType === 'terrain') {
                    $gMap = new google.maps.Map(document.getElementById(ID), {
                        zoom: gMapZoom ? gMapZoom : config['zoom'],
                        scrollwheel: config['scrollwheel']
                    });
                    $gMap.setCenter({
                        lat: gMapLat,
                        lng: gMapLng
                    });
                    $gMap.setMapTypeId(google.maps.MapTypeId.TERRAIN);
                } else if (gMapType === 'street-view') {
                    $gMap = new google.maps.StreetViewPanorama(document.getElementById(ID), {
                        zoom: gMapZoom ? gMapZoom : config['zoom'],
                        scrollwheel: config['scrollwheel']
                    });
                    $gMap.setPosition({
                        lat: gMapLat,
                        lng: gMapLng
                    });
                } else if (gMapType === 'static') {
                    $(document).ready(function () {
                        $gMap = GMaps.staticMapURL({
                            size: [2048, 2048],
                            lat: gMapLat,
                            lng: gMapLng,
                            zoom: gMapZoom ? gMapZoom : config['zoom']
                        });
                        $('#' + ID).css('background-image', 'url(' + $gMap + ')');
                    });
                } else if (gMapType === 'custom') {
                    var arrL = gMapStyles.length;
                    for (var i = 0; i < arrL; i++) {
                        var featureType = gMapStyles[i][0],
                            elementType = gMapStyles[i][1],
                            stylers = gMapStyles[i][2],
                            obj = $.extend({}, gMapStylesArray[i]);
                        if (featureType !== '') {
                            obj.featureType = featureType;
                        }
                        if (elementType !== '') {
                            obj.elementType = elementType;
                        }
                        obj.stylers = stylers;
                        gMapStylesArray.push(obj);
                    }
                    $gMap = new GMaps({
                        div: '#' + ID,
                        lat: gMapLat,
                        lng: gMapLng,
                        zoom: gMapZoom ? gMapZoom : config['zoom'],
                        scrollwheel: config['scrollwheel'],
                        styles: gMapStylesArray
                    });
                    // Pin
                    if (gMapPin) {
                        $gMap.addMarker({
                            lat: gMapLat,
                            lng: gMapLng,
                            title: gMapTitle,
                            icon: gMapPinIcon
                        });
                    }
                } else {
                    $gMap = new GMaps({
                        div: '#' + ID,
                        lat: gMapLat,
                        lng: gMapLng,
                        zoom: gMapZoom ? gMapZoom : config['zoom'],
                        scrollwheel: config['scrollwheel']
                    });
                    // Pin
                    if (gMapPin) {
                        $gMap.addMarker({
                            lat: gMapLat,
                            lng: gMapLng,
                            title: gMapTitle,
                            icon: gMapPinIcon
                        });
                    }
                }
                // Pin
                if (gMapPin && gMapType === 'satellite' || gMapType === 'terrain' || gMapType === 'street-view') {
                    // Variables
                    var $pin = new google.maps.Marker({
                        position: {
                            lat: gMapLat,
                            lng: gMapLng
                        },
                        map: $gMap
                    });
                    if (gMapPinIcon) {
                        var $pinIcon = new google.maps.MarkerImage(gMapPinIcon);
                        $pin.setIcon($pinIcon);
                    }
                    if (gMapTitle) {
                        $pin.setOptions({
                            title: gMapTitle
                        });
                    }
                }
                // Auto Center markers on window resize
                if (!gMapGeolocation) {
                    google.maps.event.addDomListener(window, 'resize', function () {
                        setTimeout(function () {
                            $gMap.setCenter({
                                lat: gMapLat,
                                lng: gMapLng
                            });
                        }, 100);
                    });
                }
                // Polygon
                if (gMapPolygon) {
                    $(document).ready(function () {
                        polygon = $gMap.drawPolygon({
                            paths: gMapPolygonCords,
                            strokeColor: gMapPolygonStyles.strokeColor,
                            strokeOpacity: gMapPolygonStyles.strokeOpacity,
                            strokeWeight: gMapPolygonStyles.strokeWeight,
                            fillColor: gMapPolygonStyles.fillColor,
                            fillOpacity: gMapPolygonStyles.fillOpacity
                        });
                    });
                }
                // Polylines
                if (gMapPolylines) {
                    $(document).ready(function () {
                        $gMap.drawPolyline({
                            path: gMapPolylinesCords,
                            strokeColor: gMapPolylinesStyles.strokeColor,
                            strokeOpacity: gMapPolylinesStyles.strokeOpacity,
                            strokeWeight: gMapPolylinesStyles.strokeWeight
                        });
                    });
                }
                // Routes
                if (gMapRoutes) {
                    $(document).ready(function () {
                        $gMap.drawRoute({
                            origin: gMapRoutesCords[0],
                            destination: gMapRoutesCords[1],
                            travelMode: gMapRoutesStyles.travelMode,
                            strokeColor: gMapRoutesStyles.strokeColor,
                            strokeOpacity: gMapRoutesStyles.strokeOpacity,
                            strokeWeight: gMapRoutesStyles.strokeWeight
                        });
                    });
                }
                // Geolocation
                if (gMapGeolocation) {
                    GMaps.geolocate({
                        success: function (position) {
                            $gMap.setCenter({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            });
                            $gMap.addMarker({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                                title: gMapTitle,
                                icon: gMapPinIcon
                            });
                            google.maps.event.addDomListener(window, 'resize', function () {
                                setTimeout(function () {
                                    $gMap.setCenter({
                                        lat: position.coords.latitude,
                                        lng: position.coords.longitude
                                    });
                                }, 100);
                            });
                        },
                        error: function (error) {
                            alert('Geolocation failed: ' + error.message);
                        },
                        not_supported: function () {
                            alert('Your browser does not support geolocation');
                        }
                    });
                }
                // Geocoding
                if (gMapGeocoding) {
                    $(document).ready(function () {
                        var targetCordsParent = $(gMapCordsTarget).closest('form');
                        $(targetCordsParent).submit(function (e) {
                            e.preventDefault();
                            GMaps.geocode({
                                address: $(gMapCordsTarget).val().trim(),
                                callback: function (results, status) {
                                    if (status === 'OK') {
                                        var latlng = results[0].geometry.location;

                                        $gMap.setCenter(latlng.lat(), latlng.lng());
                                        $gMap.addMarker({
                                            lat: latlng.lat(),
                                            lng: latlng.lng()
                                        });
                                        gMapLat = latlng.lat();
                                        gMapLng = latlng.lng();
                                    }
                                }
                            });
                        });
                    });
                }
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 02. Text Slide Show Component
    $.GSCore.components.GSTextSlideshow = {
        // Base Configuration
        _baseConfig: {
            autoplay: false,
            autoplayDelay: 3000,
            slideSelector: '.u-text-slideshow__slide',
            activeSlideClass: 'u-text-slideshow__slide--current',
            slideTargetSelector: '.u-text-slideshow__slide-target'
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            if (!collection || !collection.length) return this._pageCollection;
            var self = this;
            config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
            collection.each(function (i, el) {
                var $this = $(this);
                if (!$this.data('GSTextSlideshow')) {
                    $this.data('GSTextSlideshow', new GSTextSlideshow($this, $.extend(true, {}, config, {
                        effect: $this.data('effect') ? $this.data('effect') : 'fx1'
                    })));
                    self._pageCollection = self._pageCollection.add($this);
                }
            });
            return this._pageCollection;
        }
    };

    function GSTextSlideshow(element, config) {
        this.config = config && $.isPlainObject(config) ? config : {};
        this.element = element;
        this.config = $.extend(true, {}, this.config, this.element.data());
        var jCurrentSlide = this.element.find('.' + this.config.activeSlideClass);
        this.currentIndex = this.config.currentIndex = jCurrentSlide.length ? jCurrentSlide.index() : 0;
        this.slides = [];
        if (this.element.attr('id')) this._initNavigation();
        this._initSlides();
        if (this.config.autoplay) {
            this._autoplayStart();
        }
    }

    GSTextSlideshow.prototype._initSlides = function () {
        var self = this,
            jSlides = this.element.find(this.config.slideSelector);
        if (jSlides.length) {
            jSlides.each(function (i, el) {

                self.addSlide($(el), self.config);
            });
        }
    };
    GSTextSlideshow.prototype._updateCarouselBounds = function () {
        var self = this;
        this.element.stop().animate({
            'width': self.slides[self.currentIndex].getElement().outerWidth() + 1
        }, {
            duration: 300,
            easing: 'linear'
        });
    };
    GSTextSlideshow.prototype._autoplayStart = function () {
        var self = this;
        this.autoplayTimeoutId = setTimeout(function autoplay() {
            self.next();
            self.autoplayTimeoutId = setTimeout(autoplay, self.config.autoplayDelay);
        }, this.config.autoplayDelay);
    };
    GSTextSlideshow.prototype._autoplayStop = function () {
        clearTimeout(this.autoplayTimeoutId);
    };
    GSTextSlideshow.prototype._initNavigation = function () {
        var self = this,
            navElements = $('[data-target="#' + this.element.attr('id') + '"]');
        navElements.on('click', function (e) {
            var $this = $(this);
            if ($this.data('action').toUpperCase() === 'PREV') {
                if (self.config.autoplay) {
                    self._autoplayStop();
                    self._autoplayStart();
                }
                self.prev();
            } else if ($this.data('action').toUpperCase() === 'NEXT') {
                if (self.config.autoplay) {
                    self._autoplayStop();
                    self._autoplayStart();
                }
                self.next();
            }
            e.preventDefault();
        });
        navElements.each(function (i, el) {
            var $this = $(el);
            if ($this.data('action')) {
                self['_initAction' + $this.data('action').toUpperCase($this)];
            }
        });
    };
    GSTextSlideshow.prototype.addSlide = function (element, config) {
        if (!element || !element.length) return;
        this.slides.push(new HSTextSlide(element, config));
    };
    GSTextSlideshow.prototype.next = function () {
        if (this.slides.length <= 1) return;
        this.slides[this.currentIndex].hide();
        this.currentIndex++;
        if (this.currentIndex > this.slides.length - 1) this.currentIndex = 0;
        this._updateCarouselBounds();
        this.slides[this.currentIndex].show();
    };
    GSTextSlideshow.prototype.prev = function () {
        if (this.slides.length <= 1) return;
        this.slides[this.currentIndex].hide();
        this.currentIndex--;
        if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;
        this._updateCarouselBounds();
        this.slides[this.currentIndex].show();
    };

    function GSTextSlide(element, config) {
        this.element = element;
        this.config = config;
        this.target = element.find(config.slideTargetSelector).get(0);
        if (!this.target) return;
        this.textfx = new TextFx(this.target);
        if (this.config.currentIndex !== this.element.index()) {
            $(this.target).find('[class*="letter"]').css(this.textfx.effects[config.effect].out);
        }
    }

    GSTextSlide.prototype.show = function () {
        if (!this.target) return;
        this.element.addClass(this.config.activeSlideClass);
        this.textfx.show(this.config.effect);
    };
    GSTextSlide.prototype.hide = function () {
        if (!this.target) return;
        this.element.removeClass(this.config.activeSlideClass);
        this.textfx.hide(this.config.effect);
    };
    GSTextSlide.prototype.getElement = function () {
        return this.element;
    };
    // 03. Ajax Autocomplete Component
    $.GSCore.components.GSAjaxAutocomplete = {
        // Base Configuration
        _baseConfig: {
            animation: 'fade',
            animationSpeed: 400
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initAjaxAutocomplete();
            return this.pageCollection;
        },
        initAjaxAutocomplete: function () {
            // Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;

            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    $target = $this.data('target'),
                    animation = $this.data('animation'),
                    animationSpeed = $this.data('animation-speed');
                $this.on('keyup', function () {
                    if (animation === 'fade') {
                        if ($this.val()) {
                            $('#' + $target).fadeIn(animationSpeed);
                        } else {
                            $('#' + $target).fadeOut(animationSpeed);
                        }
                    } else {
                        if ($this.val()) {
                            $('#' + $target).slideDown(animationSpeed);
                        } else {
                            $('#' + $target).slideUp(animationSpeed);
                        }
                    }
                });
                $this.on('focusout', function () {
                    if (animation === 'fade') {
                        $('#' + $target).fadeOut(animationSpeed);
                    } else {
                        $('#' + $target).slideUp(animationSpeed);
                    }
                });
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 04. Autocomplete Component
    $.widget('custom.catcomplete', $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu('option', 'items', '> :not(.ui-autocomplete-category)');
        },
        _renderMenu: function (ul, items) {
            var that = this,
                currentCategory = '';
            $.each(items, function (index, item) {
                var li;
                if (!item.category) {
                    li = that._renderItemData(ul, item);
                    return;
                }
                if (item.category !== currentCategory) {
                    ul.append('<li class="ui-autocomplete-category">' + item.category + '</li>');
                    currentCategory = item.category;
                }
                li = that._renderItemData(ul, item);
                if (item.category) {
                    li.html(item.label);
                    li.attr('aria-label', item.category + ' : ' + item.label);
                }
            });
        }
    });
    $.GSCore.components.GSAutocomplete = {
        // Base Configuration
        _baseConfig: {
            minLength: 2
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initAutocomplete();
            return this.pageCollection;
        },
        initAutocomplete: function () {
            // Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                var $this = $(el),
                    dataUrl = $this.data('url');
                $.getJSON(dataUrl, function (data) {
                    $this.catcomplete({
                        delay: 0,
                        source: data,
                        dataType: 'json',
                        minLength: config['minLength'],
                        select: function (event, ui) {
                            var currentItem = $(this);

                            setTimeout(function () {
                                var currentVal = currentItem.val();
                                $(currentItem).val($(currentVal).get(0).textContent);
                            }, 1);
                        },
                        focus: function (event, ui) {
                            var currentItem = $(this);

                            setTimeout(function () {
                                var currentVal = currentItem.val();
                                $(currentItem).val($(currentVal).get(0).textContent);
                            });
                        }
                    });
                });
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 05. Autocomplete Local Search Component
    $.widget('custom.localcatcomplete', $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu('option', 'items', '> :not(.ui-autocomplete-category)');
        },
        _renderItem: function (ul, item) {
            if (item.url) {
                return $('<li><a href="' + window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1] + '/' + item.url + '">' + item.label + '<span class="g-opacity-0_3 g-ml-5">· ' + item.category + '</span></a></li>')
                    .appendTo(ul);
            } else {
                return $('<li>' + item.label + '</li>')
                    .appendTo(ul);
            }
        }
    });
    $.GSCore.components.GSLocalSearchAutocomplete = {
        // Base Configuration
        _baseConfig: {
            minLength: 2
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initAutocomplete();
            return this.pageCollection;
        },
        initAutocomplete: function () {
            // Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                var $this = $(el),
                    dataUrl = $this.data('url');
                $.getJSON(dataUrl, function (data) {
                    $this.localcatcomplete({
                        delay: 0,
                        source: data,
                        select: function (event, ui) {
                            window.location = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1] + '/' + ui.item.url;
                        }
                    });
                });
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 06. Background video Component
    $.GSCore.components.GSBgVideo = {
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
            this.initBgVideo();
            return this.pageCollection;
        },
        initBgVideo: function () {
            // Variables
            var $this = this,
                collection = $this.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $bgVideo = $(el);
                $bgVideo.gsBgVideo();
                // Add object to collection
                collection = collection.add($bgVideo);
            });
        }
    };
    // 07. Carousel Component
    $.GSCore.components.GSCarousel = {
        // Base Configuration
        _baseConfig: {
            autoplay: false,
            infinite: true
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initCarousel();
            return this.pageCollection;
        },
        initCarousel: function () {
            // Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    id = $this.attr('id'),
                    // Markup elements
                    target = $this.data('nav-for'),
                    isThumb = $this.data('is-thumbs'),
                    arrowsClasses = $this.data('arrows-classes'),
                    arrowLeftClasses = $this.data('arrow-left-classes'),
                    arrowRightClasses = $this.data('arrow-right-classes'),
                    pagiClasses = $this.data('pagi-classes'),
                    pagiHelper = $this.data('pagi-helper'),
                    $pagiIcons = $this.data('pagi-icons'),
                    $prevMarkup = '<div class="js-prev ' + arrowsClasses + ' ' + arrowLeftClasses + '"></div>',
                    $nextMarkup = '<div class="js-next ' + arrowsClasses + ' ' + arrowRightClasses + '"></div>',
                    // Setters
                    setSlidesToShow = $this.data('slides-show'),
                    setSlidesToScroll = $this.data('slides-scroll'),
                    setAutoplay = $this.data('autoplay'),
                    setAnimation = $this.data('animation'),
                    setEasing = $this.data('easing'),
                    setFade = $this.data('fade'),
                    setSpeed = $this.data('speed'),
                    setSlidesRows = $this.data('rows'),
                    setCenterMode = $this.data('center-mode'),
                    setCenterPadding = $this.data('center-padding'),
                    setPauseOnHover = $this.data('pause-hover'),
                    setVariableWidth = $this.data('variable-width'),
                    setInitialSlide = $this.data('initial-slide'),
                    setVertical = $this.data('vertical'),
                    setRtl = $this.data('rtl'),
                    setInEffect = $this.data('in-effect'),
                    setOutEffect = $this.data('out-effect'),
                    setInfinite = $this.data('infinite'),
                    setDataTitlePosition = $this.data('title-pos-inside'),
                    setFocusOnSelect = $this.data('focus-on-select'),
                    setLazyLoad = $this.data('lazy-load'),
                    isAdaptiveHeight = $this.data('adaptive-height'),
                    numberedPaging = $this.data('numbered-pagination'),
                    setResponsive = JSON.parse(el.getAttribute('data-responsive'));
                if ($this.find('[data-slide-type]').length) {
                    $self.videoSupport($this);
                }
                $this.on('init', function (event, slick) {
                    $(slick.$slides).css('height', 'auto');
                    if (isThumb && setSlidesToShow >= $(slick.$slides).length) {
                        $this.addClass('slick-transform-off');
                    }
                });
                if (setInEffect && setOutEffect) {
                    $this.on('init', function (event, slick) {
                        $(slick.$slides).addClass('single-slide');
                    });
                }
                if (pagiHelper) {
                    $this.on('init', function (event, slick) {
                        var $pagination = $this.find('.js-pagination');
                        if (!$pagination.length) return;
                        $pagination.append('<span class="u-dots-helper"></span>');
                    });
                }
                if (isThumb) {
                    $('#' + id).on('click', '.slick-slide', function (e) {
                        e.stopPropagation();
                        // Variables
                        var i = $(this).data('slick-index');
                        if ($('#' + id).slick('slickCurrentSlide') !== i) {
                            $('#' + id).slick('slickGoTo', i);
                        }
                    });
                }
                $this.on('init', function (event, slider) {
                    var $pagination = $this.find('.js-pagination');
                    if (!$pagination.length) return;
                    $($pagination[0].children[0]).addClass('slick-current');
                });
                $this.on('init', function (event, slick) {
                    var slide = $(slick.$slides)[0],
                        animatedElements = $(slide).find('[data-scs-animation-in]');
                    $(animatedElements).each(function () {
                        var animationIn = $(this).data('scs-animation-in');
                        $(this).addClass('animated ' + animationIn).css('opacity', 1);
                    });
                });
                if (numberedPaging) {
                    $this.on('init', function (event, slick) {
                        $(numberedPaging).text('1' + '/' + slick.slideCount);
                    });
                }
                $this.slick({
                    autoplay: setAutoplay ? true : false,
                    autoplaySpeed: setSpeed ? setSpeed : 3000,
                    cssEase: setAnimation ? setAnimation : 'ease',
                    easing: setEasing ? setEasing : 'linear',
                    fade: setFade ? true : false,
                    infinite: setInfinite ? true : false,
                    initialSlide: setInitialSlide ? setInitialSlide - 1 : 0,
                    slidesToShow: setSlidesToShow ? setSlidesToShow : 1,
                    slidesToScroll: setSlidesToScroll ? setSlidesToScroll : 1,
                    centerMode: setCenterMode ? true : false,
                    variableWidth: setVariableWidth ? true : false,
                    pauseOnHover: setPauseOnHover ? true : false,
                    rows: setSlidesRows ? setSlidesRows : 1,
                    vertical: setVertical ? true : false,
                    verticalSwiping: setVertical ? true : false,
                    rtl: setRtl ? true : false,
                    centerPadding: setCenterPadding ? setCenterPadding : 0,
                    focusOnSelect: setFocusOnSelect ? true : false,
                    lazyLoad: setLazyLoad ? setLazyLoad : false,
                    asNavFor: target ? target : false,
                    prevArrow: arrowsClasses ? $prevMarkup : false,
                    nextArrow: arrowsClasses ? $nextMarkup : false,
                    dots: pagiClasses ? true : false,
                    dotsClass: 'js-pagination ' + pagiClasses,
                    adaptiveHeight: !!isAdaptiveHeight,
                    customPaging: function (slider, i) {
                        var title = $(slider.$slides[i]).data('title');
                        if (title && $pagiIcons) {
                            return '<span>' + title + '</span>' + $pagiIcons;
                        } else if ($pagiIcons) {
                            return '<span></span>' + $pagiIcons;
                        } else if (title && setDataTitlePosition) {
                            return '<span>' + title + '</span>';
                        } else if (title && !setDataTitlePosition) {
                            return '<span></span>' + '<strong class="u-dot-title">' + title + '</strong>';
                        } else {
                            return '<span></span>';
                        }
                    },
                    responsive: setResponsive
                });
                $this.on('beforeChange', function (event, slider, currentSlide, nextSlide) {
                    var nxtSlide = $(slider.$slides)[nextSlide],
                        slide = $(slider.$slides)[currentSlide],
                        $pagination = $this.find('.js-pagination'),
                        animatedElements = $(nxtSlide).find('[data-scs-animation-in]'),
                        otherElements = $(slide).find('[data-scs-animation-in]');
                    $(otherElements).each(function () {
                        var animationIn = $(this).data('scs-animation-in');
                        $(this).removeClass('animated ' + animationIn);
                    });
                    $(animatedElements).each(function () {
                        $(this).css('opacity', 0);
                    });
                    if (!$pagination.length) return;
                    if (currentSlide > nextSlide) {
                        $($pagination[0].children).removeClass('slick-active-right');
                        $($pagination[0].children[nextSlide]).addClass('slick-active-right');
                    } else {
                        $($pagination[0].children).removeClass('slick-active-right');
                    }
                    $($pagination[0].children).removeClass('slick-current');

                    setTimeout(function () {
                        $($pagination[0].children[nextSlide]).addClass('slick-current');
                    }, '.25');
                });
                if (numberedPaging) {
                    $this.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                        var i = (nextSlide ? nextSlide : 0) + 1;
                        $(numberedPaging).text(i + '/' + slick.slideCount);
                    });
                }
                $this.on('afterChange', function (event, slick, currentSlide, nextSlide) {
                    var slide = $(slick.$slides)[currentSlide],
                        animatedElements = $(slide).find('[data-scs-animation-in]');
                    $(animatedElements).each(function () {
                        var animationIn = $(this).data('scs-animation-in'),
                            animationDelay = $(this).data('scs-animation-delay'),
                            animationDuration = $(this).data('scs-animation-duration');
                        console.log(animationDuration);
                        $(this).css({
                            'animation-delay': animationDelay + 'ms',
                            'animation-duration': animationDuration + 'ms'
                        });
                        $(this).addClass('animated ' + animationIn).css('opacity', 1);
                    });
                });
                if (setInEffect && setOutEffect) {
                    $this.on('afterChange', function (event, slick, currentSlide, nextSlide) {
                        $(slick.$slides).removeClass('animated set-position ' + setInEffect + ' ' + setOutEffect);
                    });
                    $this.on('beforeChange', function (event, slick, currentSlide) {
                        $(slick.$slides[currentSlide]).addClass('animated ' + setOutEffect);
                    });
                    $this.on('setPosition', function (event, slick) {
                        $(slick.$slides[slick.currentSlide]).addClass('animated set-position ' + setInEffect);
                    });
                }
                // Actions
                collection = collection.add($this);
            });
        },
        // Implementation of video support
        videoSupport: function (carousel) {
            if (!carousel.length) return;

            carousel.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                var slideType = $(slick.$slides[currentSlide]).data('slide-type'),
                    player = $(slick.$slides[currentSlide]).find('iframe').get(0),
                    command;

                if (slideType === 'vimeo') {
                    command = {
                        'method': 'pause',
                        'value': 'true'
                    };
                } else if (slideType === 'youtube') {
                    command = {
                        'event': 'command',
                        'func': 'pauseVideo'
                    };
                } else {
                    return false;
                }
                if (player !== undefined) {
                    player.contentWindow.postMessage(JSON.stringify(command), '*');
                }
            });
        },
        // Implementation of text animation
        initTextAnimation: function (carousel, textAnimationSelector) {
            if (!window.TextFx || !window.anime || !carousel.length) return;
            var $text = carousel.find(textAnimationSelector);
            if (!$text.length) return;
            $text.each(function (i, el) {
                var $this = $(el);
                if (!$this.data('TextFx')) {
                    $this.data('TextFx', new TextFx($this.get(0)));
                }
            });
            carousel.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                var targets = slick.$slider
                    .find('.slick-track')
                    .children();
                var currentTarget = targets.eq(currentSlide),
                    nextTarget = targets.eq(nextSlide);
                currentTarget = currentTarget.find(textAnimationSelector);
                nextTarget = nextTarget.find(textAnimationSelector);
                if (currentTarget.length) {
                    currentTarget.data('TextFx').hide(currentTarget.data('effect') ? currentTarget.data('effect') : 'fx1');
                }
                if (nextTarget.length) {
                    nextTarget.data('TextFx').show(nextTarget.data('effect') ? nextTarget.data('effect') : 'fx1');
                }
            });
        }
    };
    // 08. Charts Component
    $.GSCore.components.GSChart = {
        // Spark Line Charts
        sparkline: {
            // Base plugin's configuration
            _baseConfig: {
                fillColor: '#111111',
                lineColor: '#111111',
                barColor: '#111111'
            },
            // Collection of all initialized items of the page
            _pageCollection: $(),
            // Initializes new collection of items
            init: function (collection) {
                var self = this;
                if (!collection || !collection.length) return $();
                return collection.each(function (i, el) {
                    var $this = $(el),
                        config = $.extend(true, {}, self._baseConfig, $this.data());
                    $this.sparkline($this.data('data'), config);
                    self._pageCollection = self._pageCollection.add($this);
                });
            },
            get: function (index) {
                if (index) {
                    return this._pageCollection.eq(index);
                }
                return this._pageCollection;
            }
        },
        peity: {
            _baseConfig: {
                fill: ''
            },
            _pageCollection: $(),
            init: function (collection, config) {
                var self = this;
                if (!collection || !collection.length) return $();
                config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
                return collection.each(function (i, el) {
                    var $this = $(el),
                        currentConfig = $.extend(true, {}, config, $this.data());
                    $this.peity($this.data('peity-type'), currentConfig);
                    self._pageCollection = self._pageCollection.add($this);
                });
            },
            get: function (index) {
                if (index) {
                    return this._pageCollection.eq(index);
                }
                return this._pageCollection;
            }
        }
    };
    // 09. Chart Pies Component
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
    // 10. Count Quantity Component
    $.GSCore.components.GSCountQty = {
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
            this.initCountQty();
            return this.pageCollection;
        },
        initCountQty: function () {
            // Variables
            var $self = this,
                collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    $plus = $this.find('.js-plus'),
                    $minus = $this.find('.js-minus'),
                    $result = $this.find('.js-result'),
                    resultVal = parseInt($result.val(), 0);
                $plus.on('click', function (e) {
                    e.preventDefault();
                    resultVal += 1;
                    $result.val(resultVal);
                });
                $minus.on('click', function (e) {
                    e.preventDefault();
                    if (resultVal >= 1) {
                        resultVal -= 1;
                        $result.val(resultVal);
                    } else {
                        return false;
                    }
                });
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 11. Countdown Component
    $.GSCore.components.GSCountdown = {
        // Base Configuration
        _baseConfig: {
            yearsElSelector: '.years',
            monthElSelector: '.month',
            daysElSelector: '.days',
            hoursElSelector: '.hours',
            minutesElSelector: '.minutes',
            secondsElSelector: '.seconds',
            // circles
            circles: false,
            wrpClass: 'wrpClass',
            textClass: 'textClass',
            valueStrokeClass: 'valueStrokeClass',
            maxValueStrokeClass: 'maxValueStrokeClass',
            styleWrapper: 'styleWrapper',
            styleText: 'styleText'
        },
        // Page Collection
        pageCollection: $(),
        _circlesIds: [0],
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initCountdowns();
            return this.pageCollection;
        },
        // Initialization of each Countdown of the page
        initCountdowns: function () {
            var self = this;
            this.collection.each(function (i, el) {
                var $this = $(el),
                    options = {
                        endDate: $this.data('end-date') ? new Date($this.data('end-date')) : new Date(),
                        startDate: $this.data('start-date') ? new Date($this.data('start-date')) : new Date(),
                        yearsEl: $this.find(self.config['yearsElSelector']),
                        yearsFormat: $this.data('years-format'),
                        monthEl: $this.find(self.config['monthElSelector']),
                        monthFormat: $this.data('month-format'),
                        daysEl: $this.find(self.config['daysElSelector']),
                        daysFormat: $this.data('days-format'),
                        hoursEl: $this.find(self.config['hoursElSelector']),
                        hoursFormat: $this.data('hours-format'),
                        minutesEl: $this.find(self.config['minutesElSelector']),
                        minutesFormat: $this.data('minutes-format'),
                        secondsEl: $this.find(self.config['secondsElSelector']),
                        secondsFormat: $this.data('seconds-format')
                    };
                if (self.config['circles'] && $this.data('start-date')) self._initPiesImplementation($this, options);
                else self._initBaseImplementation($this, options);
                self.pageCollection = self.pageCollection.add($this);
            });
        },
        _initBaseImplementation: function (container, options) {
            container.countdown(options.endDate, function (e) {
                if (options.yearsEl.length) {
                    options.yearsEl.text(e.strftime(options.yearsFormat));
                }
                if (options.monthEl.length) {
                    options.monthEl.text(e.strftime(options.monthFormat));
                }
                if (options.daysEl.length) {
                    options.daysEl.text(e.strftime(options.daysFormat));
                }
                if (options.hoursEl.length) {
                    options.hoursEl.text(e.strftime(options.hoursFormat));
                }
                if (options.minutesEl.length) {
                    options.minutesEl.text(e.strftime(options.minutesFormat));
                }
                if (options.secondsEl.length) {
                    options.secondsEl.text(e.strftime(options.secondsFormat));
                }
            });
        },
        _initPiesImplementation: function (container, options) {
            var self = this,
                id,
                oneDay = 24 * 60 * 60 * 1000;
            // Prepare elements
            if (options.yearsEl.length) {
                self._preparePieItem(options.yearsEl, {
                    maxValue: (options.endDate.getFullYear() - options.startDate.getFullYear()),
                    radius: container.data('circles-radius'),
                    width: container.data('circles-stroke-width'),
                    'fg-color': container.data('circles-fg-color'),
                    'bg-color': container.data('circles-bg-color'),
                    'additional-text': container.data('circles-additional-text'),
                    'font-size': container.data('circles-font-size')
                });
            }
            if (options.monthEl.length) {
                self._preparePieItem(options.monthEl, {
                    maxValue: Math.round(Math.abs((options.endDate.getTime() - options.startDate.getTime()) / (oneDay))) / 12,
                    radius: container.data('circles-radius'),
                    width: container.data('circles-stroke-width'),
                    'fg-color': container.data('circles-fg-color'),
                    'bg-color': container.data('circles-bg-color'),
                    'additional-text': container.data('circles-additional-text'),
                    'font-size': container.data('circles-font-size')
                });
            }
            if (options.daysEl.length) {
                self._preparePieItem(options.daysEl, {
                    maxValue: self._getDaysMaxValByFormat(options.daysFormat, options.startDate, options.endDate),
                    radius: container.data('circles-radius'),
                    width: container.data('circles-stroke-width'),
                    'fg-color': container.data('circles-fg-color'),
                    'bg-color': container.data('circles-bg-color'),
                    'additional-text': container.data('circles-additional-text'),
                    'font-size': container.data('circles-font-size')
                });
            }
            if (options.hoursEl.length) {
                self._preparePieItem(options.hoursEl, {
                    maxValue: 60,
                    radius: container.data('circles-radius'),
                    width: container.data('circles-stroke-width'),
                    'fg-color': container.data('circles-fg-color'),
                    'bg-color': container.data('circles-bg-color'),
                    'additional-text': container.data('circles-additional-text'),
                    'font-size': container.data('circles-font-size')
                });
            }
            if (options.minutesEl.length) {
                self._preparePieItem(options.minutesEl, {
                    maxValue: 60,
                    radius: container.data('circles-radius'),
                    width: container.data('circles-stroke-width'),
                    'fg-color': container.data('circles-fg-color'),
                    'bg-color': container.data('circles-bg-color'),
                    'additional-text': container.data('circles-additional-text'),
                    'font-size': container.data('circles-font-size')
                });
            }
            if (options.secondsEl.length) {
                self._preparePieItem(options.secondsEl, {
                    maxValue: 60,
                    radius: container.data('circles-radius'),
                    width: container.data('circles-stroke-width'),
                    'fg-color': container.data('circles-fg-color'),
                    'bg-color': container.data('circles-bg-color'),
                    'additional-text': container.data('circles-additional-text'),
                    'font-size': container.data('circles-font-size')
                });
            }
            // Init countdown
            container.countdown(options.endDate, function (e) {
                // Years
                if (options.yearsEl.length) {
                    options.yearsEl.data('circle').update(e.strftime(options.yearsFormat));
                }
                // Months
                if (options.monthEl.length) {
                    options.monthEl.data('circle').update(e.strftime(options.monthFormat));
                }
                // Days
                if (options.daysEl.length) {
                    options.daysEl.data('circle').update(e.strftime(options.daysFormat));
                }
                // Hours
                if (options.hoursEl.length) {
                    options.hoursEl.data('circle').update(e.strftime(options.hoursFormat));
                }
                // Minutes
                if (options.minutesEl.length) {
                    options.minutesEl.data('circle').update(e.strftime(options.minutesFormat));
                }
                // Seconds
                if (options.secondsEl.length) {
                    options.secondsEl.data('circle').update(e.strftime(options.secondsFormat));
                }
            });
        },
        _preparePieItem: function (el, options) {
            var self = this, id = self._circlesIds[self._circlesIds.length - 1] + 1;
            self._circlesIds.push(id);
            el.attr('id', 'hs-countdown-element-' + id);
            el.data('circle', Circles.create({
                id: 'hs-countdown-element-' + id,
                radius: options['radius'] || 80,
                value: 0,
                maxValue: options['maxValue'] || 100,
                width: options['width'] || 10,
                text: function (value) {
                    return value + (options['additional-text'] || '');
                },
                colors: [options['bg-color'] || '#eeeeee', options['fg-color'] || '#111111'],
                duration: 0,
                wrpClass: self.config['wrpClass'],
                textClass: self.config['textClass'],
                valueStrokeClass: self.config['valueStrokeClass'],
                maxValueStrokeClass: self.config['maxValueStrokeClass'],
                styleWrapper: self.config['styleWrapper'],
                styleText: self.config['styleText']
            }));
            if (options['font-size']) {
                el.find('.' + self.config['textClass']).css('font-size', options['font-size'] + 'px');
            }
        },
        _getDaysMaxValByFormat: function (format, startDate, endDate) {
            var oneDay = 24 * 60 * 60 * 1000;
            switch (format) {
                case '%D':
                    return Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / (oneDay)));
                default:
                    return 31;
            }
        }
    };
    // 12. Counter Component
    $.GSCore.components.GSCounter = {
        // Base Configuration
        _baseConfig: {
            bounds: -100,
            debounce: 10,
            time: 6000,
            fps: 60,
            commaSeparated: false
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = $(selector) && $(selector).length ? $(selector) : $();
            if (!this.collection.length) return;
            this.config = config && $.isPlainObject(config) ? $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initCounters();
        },
        // Initialization of each Counter of the page
        initCounters: function () {
            var self = this;
            appear({
                bounds: self.config['bounds'],
                debounce: self.config['debounce'],
                init: function () {
                    self.collection.each(function (i, el) {
                        var $item = $(el), value = parseInt($item.text(), 10);
                        $item.text('0').data('value', value);
                        self._pageCollection = self._pageCollection.add($item);
                    });
                },
                elements: function () {
                    return document.querySelectorAll(self.config['itemSelector']);
                },
                appear: function (el) {
                    var $item = $(el),
                        counter = 1,
                        endValue = $item.data('value'),
                        iterationValue = parseInt(endValue / ((self.config['time'] / self.config['fps'])), 10),
                        isCommaSeparated = $item.data('comma-separated'),
                        isReduced = $item.data('reduce-thousands-to');
                    if (iterationValue === 0) iterationValue = 1;
                    $item.data('intervalId', setInterval(function () {
                        if (isCommaSeparated) {
                            $item.text(self.getCommaSeparatedValue(counter += iterationValue));
                        } else if (isReduced) {
                            $item.text(self.getCommaReducedValue(counter += iterationValue, isReduced));
                        } else {
                            $item.text(counter += iterationValue);
                        }
                        if (counter > endValue) {
                            clearInterval($item.data('intervalId'));
                            if (isCommaSeparated) {
                                $item.text(self.getCommaSeparatedValue(endValue));
                            } else if (isReduced) {
                                $item.text(self.getCommaReducedValue(endValue, isReduced));
                            } else {
                                $item.text(endValue);
                            }
                        }
                    }, self.config['time'] / self.config['fps']));
                }
            });
        },
        getCommaReducedValue: function (value, additionalText) {
            return parseInt(value / 1000, 10) + additionalText;
        },
        // Returns comma separated value
        getCommaSeparatedValue: function (value) {
            var value = String(value);
            switch (value.length) {
                case 4:
                    return value.substr(0, 1) + ',' + value.substr(1);
                case 5:
                    return value.substr(0, 2) + ',' + value.substr(2);
                case 6:
                    return value.substr(0, 3) + ',' + value.substr(3);
                case 7:
                    value = value.substr(0, 1) + ',' + value.substr(1);
                    return value.substr(0, 5) + ',' + value.substr(5);
                case 8:
                    value = value.substr(0, 2) + ',' + value.substr(2);
                    return value.substr(0, 6) + ',' + value.substr(6);
                case 9:
                    value = value.substr(0, 3) + ',' + value.substr(3);
                    return value.substr(0, 7) + ',' + value.substr(7);
                case 10:
                    value = value.substr(0, 1) + ',' + value.substr(1);
                    value = value.substr(0, 5) + ',' + value.substr(5);
                    return value.substr(0, 9) + ',' + value.substr(9);
                default:
                    return value;
            }
        }
    };
    // 13. Filter Component
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
    // 14. Datepicker Component
    $.GSCore.components.GSDatepicker = {
        // Base Configuration
        _baseConfig: {
            dateFormat: 'dd.mm.yy',
            dayNamesMin: [
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ],
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>'
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initDatepicker();
            return this.pageCollection;
        },
        initDatepicker: function () {
            // Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;

            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    to = $this.data('to'),
                    type = $this.data('type'),
                    minDate,
                    maxDate;
                if (type === 'one-field-range') {
                    var datePicker = $this.datepicker({
                        dateFormat: config['dateFormat'],
                        defaultDate: '+1w',
                        dayNamesMin: config['dayNamesMin'],
                        numberOfMonths: 1,
                        showOtherMonths: true,
                        prevText: config['prevText'],
                        nextText: config['nextText'],
                        beforeShow: $self.datepickerCustomClass,
                        onSelect: function (dateText, inst) {
                            console.log(inst);
                        }
                    }).on('change', function () {
                        var activeDate = datePicker.datepicker('getDate');

                        if (minDate == null) {
                            minDate = activeDate;
                        } else if (activeDate < minDate) {
                            minDate = activeDate;
                        }
                        if (maxDate == null && activeDate > minDate) {
                            maxDate = activeDate;
                        } else if (activeDate > maxDate) {
                            maxDate = activeDate;
                        }
                    });
                } else if (type === 'range') {
                    var dateFrom = $this.datepicker({
                        dateFormat: config['dateFormat'],
                        defaultDate: '+1w',
                        dayNamesMin: config['dayNamesMin'],
                        numberOfMonths: 1,
                        showOtherMonths: true,
                        prevText: config['prevText'],
                        nextText: config['nextText'],
                        beforeShow: $self.datepickerCustomClass
                    }).on('change', function () {
                        dateTo.datepicker('option', 'minDate', $self.getDate(this));
                    });
                    var dateTo = $('#' + to).datepicker({
                        dateFormat: config['dateFormat'],
                        defaultDate: '+1w',
                        dayNamesMin: config['dayNamesMin'],
                        numberOfMonths: 1,
                        showOtherMonths: true,
                        prevText: config['prevText'],
                        nextText: config['nextText'],
                        beforeShow: $self.datepickerCustomClass
                    }).on('change', function () {
                        dateFrom.datepicker('option', 'maxDate', $self.getDate(this));
                    });
                } else {
                    $this.datepicker({
                        dateFormat: config['dateFormat'],
                        dayNamesMin: config['dayNamesMin'],
                        showOtherMonths: true,
                        prevText: config['prevText'],
                        nextText: config['nextText'],
                        beforeShow: $self.datepickerCustomClass
                    });
                }
                // Actions
                collection = collection.add($this);
            });
        },
        datepickerCustomClass: function (el, attr) {
            var arrayOfClasses, customClass, i;
            arrayOfClasses = attr.input[0].className.split(' ');

            for (i = 0; arrayOfClasses.length > i; i++) {
                if (arrayOfClasses[i].substring(0, 6) === 'u-date') {
                    customClass = arrayOfClasses[i];
                }
            }
            $('#ui-datepicker-div').addClass(customClass);
        },
        getDate: function (element) {
            var $self = this,
                date,
                config = $self.config;
            try {
                date = $.datepicker.parseDate(config['dateFormat'], element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }
    };
    // 15. Dropdown Content Component
    $.GSCore.components.GSDropdown = {
        // Base Configuration
        _baseConfig: {
            dropdownEvent: 'click',
            dropdownType: 'simple',
            dropdownDuration: 300,
            dropdownEasing: 'linear',
            dropdownAnimationIn: 'fadeIn',
            dropdownAnimationOut: 'fadeOut',
            dropdownHideOnScroll: true,
            dropdownHideOnBlur: false,
            dropdownDelay: 350,
            dropdownOpenedElement: 'init',
            afterOpen: function (invoker) {
            },
            beforeClose: function (invoker) {
            },
            afterClose: function (invoker) {
            }
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            var self;
            if (!collection || !collection.length) return;
            self = this;
            var fieldsQty;
            collection.each(function (i, el) {
                var $this = $(el), itemConfig;
                if ($this.data('GSDropdown')) return;
                itemConfig = config && $.isPlainObject(config) ?
                    $.extend(true, {}, self._baseConfig, config, $this.data()) :
                    $.extend(true, {}, self._baseConfig, $this.data());
                switch (itemConfig.dropdownType) {
                    case 'css-animation' :
                        $this.data('GSDropdown', new DropdownCSSAnimation($this, itemConfig));
                        break;
                    case 'jquery-slide' :
                        $this.data('GSDropdown', new DropdownJSlide($this, itemConfig));
                        break;
                    default :
                        $this.data('GSDropdown', new DropdownSimple($this, itemConfig));
                }
                self._pageCollection = self._pageCollection.add($this);
                self._bindEvents($this, itemConfig.dropdownEvent, itemConfig.dropdownDelay);
                var UnFold = $(el).data('GSDropdown');
                fieldsQty = $(UnFold.target).find('input, textarea').length;
                if ($(UnFold.target).find('[data-dropdown-target]').length) {
                    $this.addClass('target-of-invoker-has-dropdowns');
                }
            });
            $(document).on('click touchstart', 'body', function (e) {
                if (e.target.id === self._baseConfig.dropdownOpenedElement) return;
                if ($(e.target).closest('#' + self._baseConfig.dropdownOpenedElement).length) return;
                self._pageCollection.each(function (i, el) {
                    var windW = window.innerWidth, optIsMobileOnly = Boolean($(el).data('is-mobile-only'));
                    if (!optIsMobileOnly) {
                        $(el).data('GSDropdown').hide();
                    } else if (optIsMobileOnly && windW < 769) {
                        $(el).data('GSDropdown').hide();
                    }
                    $(el).data('GSDropdown').config.beforeClose.call(self.target, self.element);
                });
            });
            $(window).on('scroll.GSDropdown', function () {
                self._pageCollection.each(function (i, el) {
                    var UnFold = $(el).data('GSDropdown');
                    if (UnFold.getOption('dropdownHideOnScroll') && fieldsQty === 0) {
                        UnFold.hide();
                    } else if (UnFold.getOption('dropdownHideOnScroll') && !(/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
                        UnFold.hide();
                    }
                });
            });
            $(window).on('resize.GSDropdown', function () {
                if (self._resizeTimeOutId) clearTimeout(self._resizeTimeOutId);
                self._resizeTimeOutId = setTimeout(function () {
                    self._pageCollection.each(function (i, el) {
                        var UnFold = $(el).data('GSDropdown');
                        UnFold.smartPosition(UnFold.target);
                    });
                }, 50);
            });
            $(document).on('keydown.GSDropdown', function (e) {
                if ($('body').hasClass('u-dropdown-opened')) {
                    if (e.keyCode && e.keyCode === 38 || e.keyCode && e.keyCode === 40) {
                        e.preventDefault();
                    }
                }
            });
            return collection;
        },
        // Binds necessary events
        _bindEvents: function ($invoker, eventType, delay) {
            var self = this, $dropdown = $($invoker.data('dropdown-target'));
            if (eventType === 'hover' && !_isTouch()) {
                $invoker.on('mouseenter.GSDropdown', function () {
                    var $invoker = $(this), GSDropdown = $invoker.data('GSDropdown');
                    if (!GSDropdown) return;
                    if (GSDropdown.dropdownTimeOut) clearTimeout(GSDropdown.dropdownTimeOut);
                    GSDropdown.show();
                    $('body').addClass('u-dropdown-opened');
                })
                    .on('mouseleave.GSDropdown', function () {
                        var $invoker = $(this), GSDropdown = $invoker.data('GSDropdown');
                        if (!GSDropdown) return;
                        GSDropdown.dropdownTimeOut = setTimeout(function () {
                            GSDropdown.hide();
                            $('body').removeClass('u-dropdown-opened');
                        }, delay);
                    });
                if ($dropdown.length) {
                    $dropdown.on('mouseenter.GSDropdown', function () {
                        var GSDropdown = $invoker.data('GSDropdown');
                        if (GSDropdown.dropdownTimeOut) clearTimeout(GSDropdown.dropdownTimeOut);
                        GSDropdown.show();
                    })
                        .on('mouseleave.GSDropdown', function () {
                            var GSDropdown = $invoker.data('GSDropdown');
                            GSDropdown.dropdownTimeOut = setTimeout(function () {
                                GSDropdown.hide();
                            }, delay);
                        });
                }
            } else {
                $invoker.on('click.GSDropdown', function (e) {
                    var $curInvoker = $(this),
                        $dropdownNotHasInnerDropdowns = $('[data-dropdown-target].active:not(.target-of-invoker-has-dropdowns)'),
                        $dropdownHasInnerDropdown = $('[data-dropdown-target].active.target-of-invoker-has-dropdowns');
                    self._baseConfig.dropdownOpenedElement = $curInvoker.data('GSDropdown').target[0].id;
                    if (!$curInvoker.data('GSDropdown')) return;
                    if (!$curInvoker.hasClass('target-of-invoker-has-dropdowns')) {
                        if ($dropdownNotHasInnerDropdowns.length) {
                            $dropdownNotHasInnerDropdowns.data('GSDropdown').toggle();
                        }
                    } else {
                        if ($dropdownHasInnerDropdown.length) {
                            $dropdownHasInnerDropdown.data('GSDropdown').toggle();
                        }
                    }
                    $curInvoker.data('GSDropdown').toggle();
                    e.stopPropagation();
                    e.preventDefault();
                });
                if (Boolean($invoker.data('dropdown-target-is-menu'))) {
                    var $target = $($invoker.data('dropdown-target')),
                        $targetItems = $target.children();
                    $targetItems.on('click', function () {
                        $invoker.data('GSDropdown').toggle();
                    });
                }
            }
        }
    };

    function _isTouch() {
        return 'ontouchstart' in window;
    }

    function AbstractDropdown(element, config) {
        if (!element.length) {
            return false;
        }
        this.element = element;
        this.config = config;
        this.target = $(this.element.data('dropdown-target'));
        this.allInvokers = $('[data-dropdown-target="' + this.element.data('dropdown-target') + '"]');
        this.toggle = function () {
            if (!this.target.length) return this;
            if (this.defaultState) {
                this.show();
            } else {
                this.hide();
            }
            return this;
        };
        this.smartPosition = function (target) {
            if (target.data('baseDirection')) {
                target.css(
                    target.data('baseDirection').direction,
                    target.data('baseDirection').value
                );
            }
            var $w = $(window),
                styles = getComputedStyle(target.get(0)),
                direction = Math.abs(parseInt(styles.left, 10)) < 40 ? 'left' : 'right',
                targetOuterGeometry = target.offset();
            if (direction === 'right') {
                if (!target.data('baseDirection')) target.data('baseDirection', {
                    direction: 'right',
                    value: parseInt(styles.right, 10)
                });
                if (targetOuterGeometry.left < 0) {
                    target.css(
                        'right',
                        (parseInt(target.css('right'), 10) - (targetOuterGeometry.left - 10)) * -1
                    );
                }
            } else {
                if (!target.data('baseDirection')) target.data('baseDirection', {
                    direction: 'left',
                    value: parseInt(styles.left, 10)
                });
                if (targetOuterGeometry.left + target.outerWidth() > $w.width()) {
                    target.css(
                        'left',
                        (parseInt(target.css('left'), 10) - (targetOuterGeometry.left + target.outerWidth() + 10 - $w.width()))
                    );
                }
            }
            if (targetOuterGeometry.top + target.outerHeight() - $w.scrollTop() > $w.height()) {

            }
        };
        this.getOption = function (option) {
            return this.config[option] ? this.config[option] : null;
        };
        return true;
    }

    function DropdownSimple(element, config) {
        if (!AbstractDropdown.call(this, element, config)) return;
        Object.defineProperty(this, 'defaultState', {
            get: function () {
                return this.target.hasClass('u-dropdown--hidden');
            }
        });
        this.target.addClass('u-dropdown--simple');
        this.hide();
    }

    DropdownSimple.prototype.show = function () {
        var activeEls = $(this)[0].config.dropdownTarget;
        $('[data-dropdown-target="' + activeEls + '"]').addClass('active');
        this.smartPosition(this.target);
        this.target.removeClass('u-dropdown--hidden');
        if (this.allInvokers.length) this.allInvokers.attr('aria-expanded', 'true');
        this.config.afterOpen.call(this.target, this.element);
        return this;
    };
    DropdownSimple.prototype.hide = function () {
        var activeEls = $(this)[0].config.dropdownTarget;
        $('[data-dropdown-target="' + activeEls + '"]').removeClass('active');
        this.target.addClass('u-dropdown--hidden');
        if (this.allInvokers.length) this.allInvokers.attr('aria-expanded', 'false');
        this.config.afterClose.call(this.target, this.element);
        return this;
    };

    function DropdownCSSAnimation(element, config) {
        if (!AbstractDropdown.call(this, element, config)) return;
        var self = this;
        this.target
            .addClass('u-dropdown--css-animation u-dropdown--hidden')
            .css('animation-duration', self.config.dropdownDuration + 'ms');
        Object.defineProperty(this, 'defaultState', {
            get: function () {
                return this.target.hasClass('u-dropdown--hidden');
            }
        });
        if (this.target.length) {
            this.target.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (e) {
                if (self.target.hasClass(self.config.dropdownAnimationOut)) {
                    self.target.removeClass(self.config.dropdownAnimationOut)
                        .addClass('u-dropdown--hidden');
                    if (self.allInvokers.length) self.allInvokers.attr('aria-expanded', 'false');
                    self.config.afterClose.call(self.target, self.element);
                }
                if (self.target.hasClass(self.config.dropdownAnimationIn)) {
                    if (self.allInvokers.length) self.allInvokers.attr('aria-expanded', 'true');
                    self.config.afterOpen.call(self.target, self.element);
                }
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }

    DropdownCSSAnimation.prototype.show = function () {
        var activeEls = $(this)[0].config.dropdownTarget;
        $('[data-dropdown-target="' + activeEls + '"]').addClass('active');
        this.smartPosition(this.target);
        this.target.removeClass('u-dropdown--hidden')
            .removeClass(this.config.dropdownAnimationOut)
            .addClass(this.config.dropdownAnimationIn);
    };
    DropdownCSSAnimation.prototype.hide = function () {
        var activeEls = $(this)[0].config.dropdownTarget;
        $('[data-dropdown-target="' + activeEls + '"]').removeClass('active');
        this.target.removeClass(this.config.dropdownAnimationIn)
            .addClass(this.config.dropdownAnimationOut);
    };

    function DropdownJSlide(element, config) {
        if (!AbstractDropdown.call(this, element, config)) return;
        this.target.addClass('u-dropdown--jquery-slide u-dropdown--hidden').hide();
        Object.defineProperty(this, 'defaultState', {
            get: function () {
                return this.target.hasClass('u-dropdown--hidden');
            }
        });
    }

    DropdownJSlide.prototype.show = function () {
        var self = this;
        var activeEls = $(this)[0].config.dropdownTarget;
        $('[data-dropdown-target="' + activeEls + '"]').addClass('active');
        this.smartPosition(this.target);
        this.target.removeClass('u-dropdown--hidden').stop().slideDown({
            duration: self.config.dropdownDuration,
            easing: self.config.dropdownEasing,
            complete: function () {
                self.config.afterOpen.call(self.target, self.element);
            }
        });
    };
    DropdownJSlide.prototype.hide = function () {
        var self = this;
        var activeEls = $(this)[0].config.dropdownTarget;
        $('[data-dropdown-target="' + activeEls + '"]').removeClass('active');
        this.target.slideUp({
            duration: self.config.dropdownDuration,
            easing: self.config.dropdownEasing,
            complete: function () {
                self.config.afterClose.call(self.target, self.element);
                self.target.addClass('u-dropdown--hidden');
            }
        });
    };
    // 16. File Attachment Component
    $.GSCore.components.GSFileAttachment = {
        // File Attachment Function
        _baseConfig: {
            changeInput: '<div class="u-file-attach-v3 g-mb-15">\
               				<h3 class="g-font-size-16 g-color-gray-dark-v2 mb-0">Drop files here or <span class="g-color-primary">Browse your device</span></h3>\
               				<p class="g-font-size-14 g-color-gray-light-v2 mb-0">Maximum file size 10mb</p>\
              			</div>',
            showThumbs: true,
            templates: {
                box: '<div class="js-result-list row"></div>',
                item: '<div class="js-result-list__item col-md-3 text-center">\
	              <div class="g-pa-10 g-brd-around g-brd-gray-light-v2">\
	                <h3 class="g-font-size-16 g-color-gray-dark-v2 g-mb-5">{{fi-name}}</h3>\
	                <p class="g-font-size-12 g-color-gray-light-v2 g-mb-5">{{fi-size2}}</p>\
	                <div class="g-mb-10">{{fi-image}}</div>\
	                <div class="text-left">{{fi-progressBar}}</div>\
	              </div>\
	             </div>',
                itemAppend: '<div class="js-result-list__item col-md-3">\
	                    <div class="g-pa-10 g-brd-around g-brd-gray-light-v2">\
	                      <h3 class="g-font-size-16 g-color-gray-dark-v2 g-mb-5">{{fi-name}}</h3>\
	                      <p class="g-font-size-12 g-color-gray-light-v2 g-mb-5">{{fi-size2}}</p>\
	                      <div class="g-mb-10">{{fi-image}}</div>\
	                      <div class="text-left">{{fi-progressBar}}</div>\
	                      <div>{{fi-icon}}</div>\
	                      <div><i class="js-result-list-item-remove fa fa-close"></i></div>\
	                    </div>\
	                   </div>',
                progressBar: '<progress class="u-progress-bar-v1"></progress>',
                _selectors: {
                    list: '.js-result-list',
                    item: '.js-result-list__item',
                    progressBar: '.u-progress-bar-v1',
                    remove: '.js-result-list-item-remove'
                },
                itemAppendToEnd: false,
                removeConfirmation: true
            },
            uploadFile: {
                url: '../../../html/assets/include/php/file-upload/upload.php',
                data: {},
                type: 'POST',
                enctype: 'multipart/form-data',
                beforeSend: function () {
                },
                success: function (data, element) {
                    var parent = element.find('.u-progress-bar-v1').parent();
                    element.find('.u-progress-bar-v1').fadeOut('slow', function () {
                        $('<div class=\'text-success g-px-10\'><i class=\'fa fa-check-circle\'></i> Success</div>').hide().appendTo(parent).fadeIn('slow');
                    });
                },
                error: function (element) {
                    var parent = element.find('.u-progress-bar-v1').parent();
                    element.find('.u-progress-bar-v1').fadeOut('slow', function () {
                        $('<div class=\'text-error g-px-10\'><i class=\'fa fa-minus-circle\'></i> Error</div>').hide().appendTo(parent).fadeIn('slow');
                    });
                }
            }
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            if (!selector) return;
            var $collection = $(selector);
            if (!$collection.length) return;
            config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
            this.initFileAttachment(selector, config);
        },
        initFileAttachment: function (el, conf) {
            // Variables
            var $el = $(el);
            // Actions
            $el.each(function () {
                var $this = $(this);
                $this.filer($.extend(true, {}, conf, {
                    dragDrop: {}
                }));
            });
        }
    };
    // 17. Go To Component
    $.GSCore.components.GSGoTo = {
        // Header Function
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
            this.initGoTo();
            return this.pageCollection;
        },
        initGoTo: function () {
            // Variables
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    $target = $this.data('target'),
                    type = $this.data('type'),
                    showEffect = $this.data('show-effect'),
                    hideEffect = $this.data('hide-effect'),
                    position = JSON.parse(el.getAttribute('data-position')),
                    compensation = $($this.data('compensation')).outerHeight(),
                    offsetTop = $this.data('offset-top'),
                    targetOffsetTop = function () {
                        if (compensation) {
                            return $target ? $($target).offset().top - compensation : 0;
                        } else {
                            return $target ? $($target).offset().top : 0;
                        }
                    };
                if (type === 'static') {
                    $this.css({
                        'display': 'inline-block'
                    });
                } else {
                    $this.addClass('animated').css({
                        'display': 'inline-block',
                        'position': type,
                        'opacity': 0
                    });
                }
                if (type === 'fixed' || type === 'absolute') {
                    $this.css(position);
                }
                $this.on('click', function (e) {
                    e.preventDefault();
                    $('html, body').stop().animate({
                        'scrollTop': targetOffsetTop()
                    }, 800);
                });
                if (!$this.data('offset-top') && !$this.hasClass('js-animation-was-fired') && type !== 'static') {
                    if ($this.offset().top <= $(window).height()) {
                        $this.show();
                        setTimeout(function () {
                            $this.addClass('js-animation-was-fired ' + showEffect).css({
                                'opacity': ''
                            });
                        });
                    }
                }
                if (type !== 'static') {
                    $(window).on('scroll', function () {
                        if ($this.data('offset-top')) {
                            if ($(window).scrollTop() >= offsetTop && !$this.hasClass('js-animation-was-fired')) {
                                $this.show();
                                setTimeout(function () {
                                    $this.addClass('js-animation-was-fired ' + showEffect).css({
                                        'opacity': ''
                                    });
                                });
                            } else if ($(window).scrollTop() <= offsetTop && $this.hasClass('js-animation-was-fired')) {
                                $this.removeClass('js-animation-was-fired ' + showEffect);
                                setTimeout(function () {
                                    $this.addClass(hideEffect).css({
                                        'opacity': 0
                                    });
                                }, 100);
                                setTimeout(function () {
                                    $this.removeClass(hideEffect).hide();
                                }, 400);
                            }
                        } else {
                            var thisOffsetTop = $this.offset().top;
                            if (!$this.hasClass('js-animation-was-fired')) {
                                if ($(window).scrollTop() >= thisOffsetTop - $(window).height()) {
                                    $this.show();
                                    setTimeout(function () {
                                        $this.addClass('js-animation-was-fired ' + showEffect).css({
                                            'opacity': ''
                                        });
                                    });
                                }
                            }
                        }
                    });
                    $(window).trigger('scroll');
                }
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 18. Header Component
    $.GSCore.components.GSHeader = {
        // Base Configuration
        _baseConfig: {
            headerFixMoment: 0,
            headerFixEffect: 'slide',
            breakpointsMap: {
                'md': 768,
                'sm': 576,
                'lg': 992,
                'xl': 1200
            }
        },
        // Init Function
        init: function (element) {
            if (!element || element.length !== 1 || element.data('GSHeader')) return;
            var self = this, windowW = window.innerWidth;
            this.element = element;
            this.config = $.extend(true, {}, this._baseConfig, element.data());
            this.observers = this._detectObservers();
            this.fixMediaDifference(this.element);
            this.element.data('GSHeader', new GSHeader(this.element, this.config, this.observers));
            $(window)
                .on('scroll.uHeader', function (e) {
                    element
                        .data('GSHeader')
                        .notify();
                })
                .on('resize.uHeader', function (e) {
                    if (self.resizeTimeOutId) clearTimeout(self.resizeTimeOutId);
                    self.resizeTimeOutId = setTimeout(function () {
                        element
                            .data('GSHeader')
                            .checkViewport();
                    }, 100);
                })
                .trigger('scroll.uHeader');
            $(window).on('resize.uHeader', function () {
                if (window.innerWidth === windowW) return;
                windowW = window.innerWidth;
                if (self.resizeTimeOutId) clearTimeout(self.resizeTimeOutId);
                self.resizeTimeOutId = setTimeout(function () {
                    element
                        .data('GSHeader')
                        .update();
                }, 100);
            });
            return this.element;
        },
        _detectObservers: function () {
            if (!this.element || !this.element.length) return;
            var observers = {
                'xs': [],
                'sm': [],
                'md': [],
                'lg': [],
                'xl': []
            };
            // XS Size
            // Has Hidden Element
            if (this.element.hasClass('u-header--has-hidden-element')) {
                observers['xs'].push(
                    new GSHeaderHasHiddenElement(this.element)
                );
            }
            // Sticky Top
            if (this.element.hasClass('u-header--sticky-top')) {
                if (this.element.hasClass('u-header--show-hide')) {
                    observers['xs'].push(
                        new GSHeaderMomentShowHideObserver(this.element)
                    );
                } else if (this.element.hasClass('u-header--toggle-section')) {
                    observers['xs'].push(
                        new GSHeaderHideSectionObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo')) {
                    observers['xs'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-appearance')) {
                    observers['xs'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }
            // Floating
            if (this.element.hasClass('u-header--floating')) {
                observers['xs'].push(
                    new GSHeaderFloatingObserver(this.element)
                );
            }
            if (this.element.hasClass('u-header--invulnerable')) {
                observers['xs'].push(
                    new GSHeaderWithoutBehaviorObserver(this.element)
                );
            }
            // Sticky Bottom
            if (this.element.hasClass('u-header--sticky-bottom')) {
                if (this.element.hasClass('u-header--change-appearance')) {
                    observers['xs'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo')) {
                    observers['xs'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
            }
            // Abs Top & Static
            if (this.element.hasClass('u-header--abs-top') || this.element.hasClass('u-header--static')) {
                if (this.element.hasClass('u-header--show-hide')) {
                    observers['xs'].push(
                        new GSHeaderShowHideObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo')) {
                    observers['xs'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-appearance')) {
                    observers['xs'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }
            // Abs Bottom & Abs Top 2nd screen
            if (this.element.hasClass('u-header--abs-bottom') || this.element.hasClass('u-header--abs-top-2nd-screen')) {
                observers['xs'].push(
                    new GSHeaderStickObserver(this.element)
                );
                if (this.element.hasClass('u-header--change-appearance')) {
                    observers['xs'].push(
                        new GSHeaderChangeAppearanceObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
                if (this.element.hasClass('u-header--change-logo')) {
                    observers['xs'].push(
                        new GSHeaderChangeLogoObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
            }
            // SM Size
            // Has Hidden Element
            if (this.element.hasClass('u-header--has-hidden-element--sm')) {
                observers['sm'].push(
                    new GSHeaderHasHiddenElement(this.element)
                );
            }
            if (this.element.hasClass('u-header--sticky-top--sm')) {
                if (this.element.hasClass('u-header--show-hide--sm')) {
                    observers['sm'].push(
                        new GSHeaderMomentShowHideObserver(this.element)
                    );
                } else if (this.element.hasClass('u-header--toggle-section--sm')) {
                    observers['sm'].push(
                        new GSHeaderHideSectionObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--sm')) {
                    observers['sm'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-appearance--sm')) {
                    observers['sm'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }
            // Floating
            if (this.element.hasClass('u-header--floating--sm')) {
                observers['sm'].push(
                    new GSHeaderFloatingObserver(this.element)
                );
            }
            if (this.element.hasClass('u-header--invulnerable--sm')) {
                observers['sm'].push(
                    new GSHeaderWithoutBehaviorObserver(this.element)
                );
            }
            // Sticky Bottom
            if (this.element.hasClass('u-header--sticky-bottom--sm')) {
                if (this.element.hasClass('u-header--change-appearance--sm')) {
                    observers['sm'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--sm')) {
                    observers['sm'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
            }
            // Abs Top & Static
            if (this.element.hasClass('u-header--abs-top--sm') || this.element.hasClass('u-header--static--sm')) {
                if (this.element.hasClass('u-header--show-hide--sm')) {
                    observers['sm'].push(
                        new GSHeaderShowHideObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--sm')) {
                    observers['sm'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-appearance--sm')) {
                    observers['sm'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }
            // Abs Bottom & Abs Top 2nd screen
            if (this.element.hasClass('u-header--abs-bottom--sm') || this.element.hasClass('u-header--abs-top-2nd-screen--sm')) {
                observers['sm'].push(
                    new GSHeaderStickObserver(this.element)
                );
                if (this.element.hasClass('u-header--change-appearance--sm')) {
                    observers['sm'].push(
                        new GSHeaderChangeAppearanceObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
                if (this.element.hasClass('u-header--change-logo--sm')) {
                    observers['sm'].push(
                        new GSHeaderChangeLogoObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
            }
            // MD Size
            // Has Hidden Element
            if (this.element.hasClass('u-header--has-hidden-element--md')) {
                observers['md'].push(
                    new GSHeaderHasHiddenElement(this.element)
                );
            }
            // Sticky Top
            if (this.element.hasClass('u-header--sticky-top--md')) {
                if (this.element.hasClass('u-header--show-hide--md')) {
                    observers['md'].push(
                        new GSHeaderMomentShowHideObserver(this.element)
                    );
                } else if (this.element.hasClass('u-header--toggle-section--md')) {
                    observers['md'].push(
                        new GSHeaderHideSectionObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--md')) {
                    observers['md'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-appearance--md')) {
                    observers['md'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }
            // Floating
            if (this.element.hasClass('u-header--floating--md')) {
                observers['md'].push(
                    new GSHeaderFloatingObserver(this.element)
                );
            }
            if (this.element.hasClass('u-header--invulnerable--md')) {
                observers['md'].push(
                    new GSHeaderWithoutBehaviorObserver(this.element)
                );
            }
            // Sticky Bottom
            if (this.element.hasClass('u-header--sticky-bottom--md')) {
                if (this.element.hasClass('u-header--change-appearance--md')) {
                    observers['md'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--md')) {
                    observers['md'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
            }
            // Abs Top & Static
            if (this.element.hasClass('u-header--abs-top--md') || this.element.hasClass('u-header--static--md')) {
                if (this.element.hasClass('u-header--show-hide--md')) {
                    observers['md'].push(
                        new GSHeaderShowHideObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--md')) {
                    observers['md'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-appearance--md')) {
                    observers['md'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }
            // Abs Bottom & Abs Top 2nd screen
            if (this.element.hasClass('u-header--abs-bottom--md') || this.element.hasClass('u-header--abs-top-2nd-screen--md')) {
                observers['md'].push(
                    new GSHeaderStickObserver(this.element)
                );
                if (this.element.hasClass('u-header--change-appearance--md')) {
                    observers['md'].push(
                        new GSHeaderChangeAppearanceObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
                if (this.element.hasClass('u-header--change-logo--md')) {
                    observers['md'].push(
                        new GSHeaderChangeLogoObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
            }
            // LG Size
            // Has Hidden Element
            if (this.element.hasClass('u-header--has-hidden-element--lg')) {
                observers['lg'].push(
                    new GSHeaderHasHiddenElement(this.element)
                );
            }
            // Sticky Top
            if (this.element.hasClass('u-header--sticky-top--lg')) {
                if (this.element.hasClass('u-header--show-hide--lg')) {
                    observers['lg'].push(
                        new GSHeaderMomentShowHideObserver(this.element)
                    );
                } else if (this.element.hasClass('u-header--toggle-section--lg')) {
                    observers['lg'].push(
                        new GSHeaderHideSectionObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--lg')) {
                    observers['lg'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-appearance--lg')) {
                    observers['lg'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }
            // Floating
            if (this.element.hasClass('u-header--floating--lg')) {
                observers['lg'].push(
                    new GSHeaderFloatingObserver(this.element)
                );
            }
            if (this.element.hasClass('u-header--invulnerable--lg')) {
                observers['lg'].push(
                    new GSHeaderWithoutBehaviorObserver(this.element)
                );
            }
            // Sticky Bottom
            if (this.element.hasClass('u-header--sticky-bottom--lg')) {
                if (this.element.hasClass('u-header--change-appearance--lg')) {
                    observers['lg'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--lg')) {
                    observers['lg'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
            }
            // Abs Top & Static
            if (this.element.hasClass('u-header--abs-top--lg') || this.element.hasClass('u-header--static--lg')) {
                if (this.element.hasClass('u-header--show-hide--lg')) {
                    observers['lg'].push(
                        new GSHeaderShowHideObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--lg')) {
                    observers['lg'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-appearance--lg')) {
                    observers['lg'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }
            // Abs Bottom & Abs Top 2nd screen
            if (this.element.hasClass('u-header--abs-bottom--lg') || this.element.hasClass('u-header--abs-top-2nd-screen--lg')) {
                observers['lg'].push(
                    new GSHeaderStickObserver(this.element)
                );
                if (this.element.hasClass('u-header--change-appearance--lg')) {
                    observers['lg'].push(
                        new GSHeaderChangeAppearanceObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
                if (this.element.hasClass('u-header--change-logo--lg')) {
                    observers['lg'].push(
                        new GSHeaderChangeLogoObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
            }
            // XL Size
            // Has Hidden Element
            if (this.element.hasClass('u-header--has-hidden-element--xl')) {
                observers['xl'].push(
                    new GSHeaderHasHiddenElement(this.element)
                );
            }
            // Sticky Top
            if (this.element.hasClass('u-header--sticky-top--xl')) {
                if (this.element.hasClass('u-header--show-hide--xl')) {
                    observers['xl'].push(
                        new GSHeaderMomentShowHideObserver(this.element)
                    );
                } else if (this.element.hasClass('u-header--toggle-section--xl')) {
                    observers['xl'].push(
                        new GSHeaderHideSectionObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--xl')) {
                    observers['xl'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-appearance--xl')) {
                    observers['xl'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }
            // Floating
            if (this.element.hasClass('u-header--floating--xl')) {
                observers['xl'].push(
                    new GSHeaderFloatingObserver(this.element)
                );
            }
            // Sticky Bottom
            if (this.element.hasClass('u-header--invulnerable--xl')) {
                observers['xl'].push(
                    new GSHeaderWithoutBehaviorObserver(this.element)
                );
            }
            // Sticky Bottom
            if (this.element.hasClass('u-header--sticky-bottom--xl')) {
                if (this.element.hasClass('u-header--change-appearance--xl')) {
                    observers['xl'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--xl')) {
                    observers['xl'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
            }
            // Abs Top & Static
            if (this.element.hasClass('u-header--abs-top--xl') || this.element.hasClass('u-header--static--xl')) {
                if (this.element.hasClass('u-header--show-hide--xl')) {
                    observers['xl'].push(
                        new GSHeaderShowHideObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-logo--xl')) {
                    observers['xl'].push(
                        new GSHeaderChangeLogoObserver(this.element)
                    );
                }
                if (this.element.hasClass('u-header--change-appearance--xl')) {
                    observers['xl'].push(
                        new GSHeaderChangeAppearanceObserver(this.element)
                    );
                }
            }
            // Abs Bottom & Abs Top 2nd screen
            if (this.element.hasClass('u-header--abs-bottom--xl') || this.element.hasClass('u-header--abs-top-2nd-screen--xl')) {
                observers['xl'].push(
                    new GSHeaderStickObserver(this.element)
                );
                if (this.element.hasClass('u-header--change-appearance--xl')) {
                    observers['xl'].push(
                        new GSHeaderChangeAppearanceObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
                if (this.element.hasClass('u-header--change-logo--xl')) {
                    observers['xl'].push(
                        new GSHeaderChangeLogoObserver(this.element, {
                            fixPointSelf: true
                        })
                    );
                }
            }
            return observers;
        },
        fixMediaDifference: function (element) {
            if (!element || !element.length || !element.filter('[class*="u-header--side"]').length) return;
            var toggleable;
            if (element.hasClass('u-header--side-left--xl') || element.hasClass('u-header--side-right--xl')) {
                toggleable = element.find('.navbar-expand-xl');
                if (toggleable.length) {
                    toggleable
                        .removeClass('navbar-expand-xl')
                        .addClass('navbar-expand-lg');
                }
            } else if (element.hasClass('u-header--side-left--lg') || element.hasClass('u-header--side-right--lg')) {
                toggleable = element.find('.navbar-expand-lg');
                if (toggleable.length) {
                    toggleable
                        .removeClass('navbar-expand-lg')
                        .addClass('navbar-expand-md');
                }
            } else if (element.hasClass('u-header--side-left--md') || element.hasClass('u-header--side-right--md')) {
                toggleable = element.find('.navbar-expand-md');
                if (toggleable.length) {
                    toggleable
                        .removeClass('navbar-expand-md')
                        .addClass('navbar-expand-sm');
                }
            } else if (element.hasClass('u-header--side-left--sm') || element.hasClass('u-header--side-right--sm')) {
                toggleable = element.find('.navbar-expand-sm');
                if (toggleable.length) {
                    toggleable
                        .removeClass('navbar-expand-sm')
                        .addClass('navbar-expand');
                }
            }
        }
    };

    function GSHeader(element, config, observers) {
        if (!element || !element.length) return;
        this.element = element;
        this.config = config;
        this.observers = observers && $.isPlainObject(observers) ? observers : {};
        this.viewport = 'xs';
        this.checkViewport();
    }

    GSHeader.prototype.checkViewport = function () {
        var $w = $(window);
        if ($w.width() > this.config.breakpointsMap['sm'] && this.observers['sm'].length) {
            this.prevViewport = this.viewport;
            this.viewport = 'sm';
            return this;
        }
        if ($w.width() > this.config.breakpointsMap['md'] && this.observers['md'].length) {
            this.prevViewport = this.viewport;
            this.viewport = 'md';
            return this;
        }
        if ($w.width() > this.config.breakpointsMap['lg'] && this.observers['lg'].length) {
            this.prevViewport = this.viewport;
            this.viewport = 'lg';
            return this;
        }
        if ($w.width() > this.config.breakpointsMap['xl'] && this.observers['xl'].length) {
            this.prevViewport = this.viewport;
            this.viewport = 'xl';
            return this;
        }
        if (this.prevViewport) this.prevViewport = this.viewport;
        this.viewport = 'xs';
        return this;

    };
    GSHeader.prototype.notify = function () {
        if (this.prevViewport) {
            this.observers[this.prevViewport].forEach(function (observer) {
                observer.destroy();
            });
            this.prevViewport = null;
        }
        this.observers[this.viewport].forEach(function (observer) {
            observer.check();
        });
        return this;
    };
    GSHeader.prototype.update = function () {
        for (var viewport in this.observers) {
            this.observers[viewport].forEach(function (observer) {
                observer.destroy();
            });
        }
        this.prevViewport = null;
        this.observers[this.viewport].forEach(function (observer) {
            observer.reinit();
        });
        return this;
    };

    function GSAbstractObserver(element) {
        if (!element || !element.length) return;
        this.element = element;
        this.defaultState = true;
        this.reinit = function () {
            this
                .destroy()
                .init()
                .check();
        };
        return true;
    }

    function GSHeaderStickObserver(element) {
        if (!GSAbstractObserver.call(this, element)) return;
        this.init();
    }

    GSHeaderStickObserver.prototype.init = function () {
        this.defaultState = true;
        this.offset = this.element.offset().top;
        return this;
    };
    GSHeaderStickObserver.prototype.destroy = function () {
        this.toDefaultState();
        return this;
    };
    GSHeaderStickObserver.prototype.check = function () {
        var $w = $(window),
            docScrolled = $w.scrollTop();
        if (docScrolled > this.offset && this.defaultState) {
            this.changeState();
        } else if (docScrolled < this.offset && !this.defaultState) {
            this.toDefaultState();
        }
        return this;
    };
    GSHeaderStickObserver.prototype.changeState = function () {
        this.element.addClass('js-header-fix-moment');
        this.defaultState = !this.defaultState;
        return this;
    };
    GSHeaderStickObserver.prototype.toDefaultState = function () {
        this.element.removeClass('js-header-fix-moment');
        this.defaultState = !this.defaultState;
        return this;
    };

    function GSHeaderMomentShowHideObserver(element) {
        if (!GSAbstractObserver.call(this, element)) return;
        this.init();
    }

    GSHeaderMomentShowHideObserver.prototype.init = function () {
        this.direction = 'down';
        this.delta = 0;
        this.defaultState = true;
        this.offset = isFinite(this.element.data('header-fix-moment')) && this.element.data('header-fix-moment') !== 0 ? this.element.data('header-fix-moment') : 5;
        this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';
        return this;
    };
    GSHeaderMomentShowHideObserver.prototype.destroy = function () {
        this.toDefaultState();
        return this;
    };
    GSHeaderMomentShowHideObserver.prototype.checkDirection = function () {
        if ($(window).scrollTop() > this.delta) {
            this.direction = 'down';
        } else {
            this.direction = 'up';
        }
        this.delta = $(window).scrollTop();
        return this;
    };
    GSHeaderMomentShowHideObserver.prototype.toDefaultState = function () {
        switch (this.effect) {
            case 'slide' :
                this.element.removeClass('u-header--moved-up');
                break;
            case 'fade' :
                this.element.removeClass('u-header--faded');
                break;
            default:
                this.element.removeClass('u-header--invisible');
        }
        this.defaultState = !this.defaultState;
        return this;
    };
    GSHeaderMomentShowHideObserver.prototype.changeState = function () {
        switch (this.effect) {
            case 'slide' :
                this.element.addClass('u-header--moved-up');
                break;
            case 'fade' :
                this.element.addClass('u-header--faded');
                break;
            default:
                this.element.addClass('u-header--invisible');
        }
        this.defaultState = !this.defaultState;
        return this;
    };
    GSHeaderMomentShowHideObserver.prototype.check = function () {
        var docScrolled = $(window).scrollTop();
        this.checkDirection();
        if (docScrolled >= this.offset && this.defaultState && this.direction === 'down') {
            this.changeState();
        } else if (!this.defaultState && this.direction === 'up') {
            this.toDefaultState();
        }
        return this;
    };

    function GSHeaderShowHideObserver(element) {
        if (!GSAbstractObserver.call(this, element)) return;
        this.init();
    }

    GSHeaderShowHideObserver.prototype.init = function () {
        if (!this.defaultState && $(window).scrollTop() > this.offset) return this;
        this.defaultState = true;
        this.transitionDuration = parseFloat(getComputedStyle(this.element.get(0))['transition-duration'], 10) * 1000;
        this.offset = isFinite(this.element.data('header-fix-moment')) && this.element.data('header-fix-moment') > this.element.outerHeight() ? this.element.data('header-fix-moment') : this.element.outerHeight() + 100;
        this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';
        return this;
    };
    GSHeaderShowHideObserver.prototype.destroy = function () {
        if (!this.defaultState && $(window).scrollTop() > this.offset) return this;
        this.element.removeClass('u-header--untransitioned');
        this._removeCap();
        return this;
    };
    GSHeaderShowHideObserver.prototype._insertCap = function () {
        this.element.addClass('js-header-fix-moment u-header--untransitioned');
        if (this.element.hasClass('u-header--static')) {
            $('html').css('padding-top', this.element.outerHeight());
        }
        switch (this.effect) {
            case 'fade' :
                this.element.addClass('u-header--faded');
                break;
            case 'slide' :
                this.element.addClass('u-header--moved-up');
                break;
            default :
                this.element.addClass('u-header--invisible');
        }
        this.capInserted = true;
    };
    GSHeaderShowHideObserver.prototype._removeCap = function () {
        var self = this;
        this.element.removeClass('js-header-fix-moment');
        if (this.element.hasClass('u-header--static')) {
            $('html').css('padding-top', 0);
        }
        if (this.removeCapTimeOutId) clearTimeout(this.removeCapTimeOutId);
        this.removeCapTimeOutId = setTimeout(function () {
            self.element.removeClass('u-header--moved-up u-header--faded u-header--invisible');
        }, 10);
        this.capInserted = false;
    };
    GSHeaderShowHideObserver.prototype.check = function () {
        var $w = $(window);
        if ($w.scrollTop() > this.element.outerHeight() && !this.capInserted) {
            this._insertCap();
        } else if ($w.scrollTop() <= this.element.outerHeight() && this.capInserted) {
            this._removeCap();
        }
        if ($w.scrollTop() > this.offset && this.defaultState) {
            this.changeState();
        } else if ($w.scrollTop() <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }
    };
    GSHeaderShowHideObserver.prototype.changeState = function () {
        this.element.removeClass('u-header--untransitioned');
        if (this.animationTimeoutId) clearTimeout(this.animationTimeoutId);
        switch (this.effect) {
            case 'fade' :
                this.element.removeClass('u-header--faded');
                break;
            case 'slide' :
                this.element.removeClass('u-header--moved-up');
                break;
            default:
                this.element.removeClass('u-header--invisible');
        }
        this.defaultState = !this.defaultState;
    };
    GSHeaderShowHideObserver.prototype.toDefaultState = function () {
        var self = this;
        this.animationTimeoutId = setTimeout(function () {
            self.element.addClass('u-header--untransitioned');
        }, this.transitionDuration);
        switch (this.effect) {
            case 'fade' :
                this.element.addClass('u-header--faded');
                break;
            case 'slide' :
                this.element.addClass('u-header--moved-up');
                break;
            default:
                this.element.addClass('u-header--invisible');
        }
        this.defaultState = !this.defaultState;
    };

    function GSHeaderChangeLogoObserver(element, config) {
        if (!GSAbstractObserver.call(this, element)) return;
        this.config = {
            fixPointSelf: false
        };
        if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);
        this.init();
    }

    GSHeaderChangeLogoObserver.prototype.init = function () {
        if (this.element.hasClass('js-header-fix-moment')) {
            this.hasFixedClass = true;
            this.element.removeClass('js-header-fix-moment');
        }
        if (this.config.fixPointSelf) {
            this.offset = this.element.offset().top;
        } else {
            this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 0;
        }
        if (this.hasFixedClass) {
            this.hasFixedClass = false;
            this.element.addClass('js-header-fix-moment');
        }
        this.imgs = this.element.find('.u-header__logo-img');
        this.defaultState = true;
        this.mainLogo = this.imgs.filter('.u-header__logo-img--main');
        this.additionalLogo = this.imgs.not('.u-header__logo-img--main');
        if (!this.imgs.length) return this;
        return this;
    };
    GSHeaderChangeLogoObserver.prototype.destroy = function () {
        this.toDefaultState();
        return this;
    };
    GSHeaderChangeLogoObserver.prototype.check = function () {
        var $w = $(window);
        if (!this.imgs.length) return this;
        if ($w.scrollTop() > this.offset && this.defaultState) {
            this.changeState();
        } else if ($w.scrollTop() <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }
        return this;
    };
    GSHeaderChangeLogoObserver.prototype.changeState = function () {
        if (this.mainLogo.length) {
            this.mainLogo.removeClass('u-header__logo-img--main');
        }
        if (this.additionalLogo.length) {
            this.additionalLogo.addClass('u-header__logo-img--main');
        }
        this.defaultState = !this.defaultState;
        return this;
    };
    GSHeaderChangeLogoObserver.prototype.toDefaultState = function () {
        if (this.mainLogo.length) {
            this.mainLogo.addClass('u-header__logo-img--main');
        }
        if (this.additionalLogo.length) {
            this.additionalLogo.removeClass('u-header__logo-img--main');
        }
        this.defaultState = !this.defaultState;
        return this;
    };

    function GSHeaderHideSectionObserver(element) {
        if (!GSAbstractObserver.call(this, element)) return;
        this.init();
    }

    GSHeaderHideSectionObserver.prototype.init = function () {
        this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
        this.section = this.element.find('.u-header__section--hidden');
        this.defaultState = true;
        this.sectionHeight = this.section.length ? this.section.outerHeight() : 0;
        return this;
    };
    GSHeaderHideSectionObserver.prototype.destroy = function () {
        if (this.section.length) {
            this.element.css({
                'margin-top': 0
            });
        }
        return this;
    };
    GSHeaderHideSectionObserver.prototype.check = function () {
        if (!this.section.length) return this;
        var $w = $(window),
            docScrolled = $w.scrollTop();
        if (docScrolled > this.offset && this.defaultState) {
            this.changeState();
        } else if (docScrolled <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }
        return this;
    };
    GSHeaderHideSectionObserver.prototype.changeState = function () {
        var self = this;
        this.element.stop().animate({
            'margin-top': self.sectionHeight * -1 - 1 // last '-1' is a small fix
        });
        this.defaultState = !this.defaultState;
        return this;
    };
    GSHeaderHideSectionObserver.prototype.toDefaultState = function () {
        this.element.stop().animate({
            'margin-top': 0
        });
        this.defaultState = !this.defaultState;
        return this;
    };

    function GSHeaderChangeAppearanceObserver(element, config) {
        if (!GSAbstractObserver.call(this, element)) return;
        this.config = {
            fixPointSelf: false
        };
        if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);
        this.init();
    }

    GSHeaderChangeAppearanceObserver.prototype.init = function () {
        if (this.element.hasClass('js-header-fix-moment')) {
            this.hasFixedClass = true;
            this.element.removeClass('js-header-fix-moment');
        }
        if (this.config.fixPointSelf) {
            this.offset = this.element.offset().top;
        } else {
            this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
        }
        if (this.hasFixedClass) {
            this.hasFixedClass = false;
            this.element.addClass('js-header-fix-moment');
        }
        this.sections = this.element.find('[data-header-fix-moment-classes]');
        this.defaultState = true;
        return this;

    };
    GSHeaderChangeAppearanceObserver.prototype.destroy = function () {
        this.toDefaultState();
        return this;
    };
    GSHeaderChangeAppearanceObserver.prototype.check = function () {
        if (!this.sections.length) return this;
        var $w = $(window),
            docScrolled = $w.scrollTop();
        if (docScrolled > this.offset && this.defaultState) {
            this.changeState();
        } else if (docScrolled <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }
        return this;
    };
    GSHeaderChangeAppearanceObserver.prototype.changeState = function () {
        this.sections.each(function (i, el) {
            var $this = $(el),
                classes = $this.data('header-fix-moment-classes'),
                exclude = $this.data('header-fix-moment-exclude');
            if (!classes && !exclude) return;
            $this.addClass(classes + ' js-header-change-moment');
            $this.removeClass(exclude);
        });
        this.defaultState = !this.defaultState;
        return this;
    };
    GSHeaderChangeAppearanceObserver.prototype.toDefaultState = function () {
        this.sections.each(function (i, el) {
            var $this = $(el),
                classes = $this.data('header-fix-moment-classes'),
                exclude = $this.data('header-fix-moment-exclude');
            if (!classes && !exclude) return;
            $this.removeClass(classes + ' js-header-change-moment');
            $this.addClass(exclude);
        });
        this.defaultState = !this.defaultState;
        return this;
    };

    function GSHeaderHasHiddenElement(element, config) {
        if (!GSAbstractObserver.call(this, element)) return;
        this.config = {
            animated: true
        };
        if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);
        this.init();
    }

    GSHeaderHasHiddenElement.prototype.init = function () {
        this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
        this.elements = this.element.find('.u-header--hidden-element');
        this.defaultState = true;
        return this;
    };
    GSHeaderHasHiddenElement.prototype.destroy = function () {
        this.toDefaultState();
        return this;
    };
    GSHeaderHasHiddenElement.prototype.check = function () {
        if (!this.elements.length) return this;
        var $w = $(window),
            docScrolled = $w.scrollTop();
        if (docScrolled > this.offset && this.defaultState) {
            this.changeState();
        } else if (docScrolled <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }
        return this;
    };
    GSHeaderHasHiddenElement.prototype.changeState = function () {
        if (this.config.animated) {
            this.elements.stop().slideUp();
        } else {
            this.elements.hide();
        }
        this.defaultState = !this.defaultState;
        return this;
    };
    GSHeaderHasHiddenElement.prototype.toDefaultState = function () {
        if (this.config.animated) {
            this.elements.stop().slideDown();
        } else {
            this.elements.show();
        }
        this.defaultState = !this.defaultState;
        return this;
    };

    function GSHeaderFloatingObserver(element, config) {
        if (!GSAbstractObserver.call(this, element)) return;
        this.config = config && $.isPlainObject(config) ? $.extend(true, {}, this.config, config) : {};
        this.init();
    }

    GSHeaderFloatingObserver.prototype.init = function () {
        this.offset = this.element.offset().top;
        this.sections = this.element.find('.u-header__section');
        this.defaultState = true;
        return this;
    };
    GSHeaderFloatingObserver.prototype.destroy = function () {
        this.toDefaultState();
        return this;
    };
    GSHeaderFloatingObserver.prototype.check = function () {
        var $w = $(window),
            docScrolled = $w.scrollTop();
        if (docScrolled > this.offset && this.defaultState) {
            this.changeState();
        } else if (docScrolled <= this.offset && !this.defaultState) {
            this.toDefaultState();
        }
        return this;
    };
    GSHeaderFloatingObserver.prototype.changeState = function () {
        this.element
            .addClass('js-header-fix-moment')
            .addClass(this.element.data('header-fix-moment-classes'))
            .removeClass(this.element.data('header-fix-moment-exclude'));
        if (this.sections.length) {
            this.sections.each(function (i, el) {
                var $section = $(el);
                $section.addClass($section.data('header-fix-moment-classes'))
                    .removeClass($section.data('header-fix-moment-exclude'));
            });
        }
        this.defaultState = !this.defaultState;
        return this;
    };
    GSHeaderFloatingObserver.prototype.toDefaultState = function () {
        this.element
            .removeClass('js-header-fix-moment')
            .removeClass(this.element.data('header-fix-moment-classes'))
            .addClass(this.element.data('header-fix-moment-exclude'));
        if (this.sections.length) {
            this.sections.each(function (i, el) {
                var $section = $(el);
                $section.removeClass($section.data('header-fix-moment-classes'))
                    .addClass($section.data('header-fix-moment-exclude'));
            });
        }
        this.defaultState = !this.defaultState;
        return this;
    };

    function GSHeaderWithoutBehaviorObserver(element) {
        if (!GSAbstractObserver.call(this, element)) {
            return;
        }
    }

    GSHeaderWithoutBehaviorObserver.prototype.check = function () {
        return this;
    };
    GSHeaderWithoutBehaviorObserver.prototype.init = function () {
        return this;
    };
    GSHeaderWithoutBehaviorObserver.prototype.destroy = function () {
        return this;
    };
    GSHeaderWithoutBehaviorObserver.prototype.changeState = function () {
        return this;
    };
    GSHeaderWithoutBehaviorObserver.prototype.toDefaultState = function () {
        return this;
    };
    // 19. Header Fullscreen Component
    $.GSCore.components.GSHeaderFullscreen = {
        // Base Configuration
        _baseConfig: {
            afterOpen: function () {
            },
            afterClose: function () {
            },
            overlayClass: 'u-header__overlay',
            sectionsContainerSelector: '.u-header__sections-container'
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            var _self = this;
            if (!collection) return $();
            collection = $(collection);
            if (!collection.length) return $();
            config = config && $.isPlainObject(config) ? config : {};
            this._bindGlobalEvents();
            return collection.each(function (i, el) {
                var $this = $(this), itemConfig = $.extend(true, {}, _self._baseConfig, config, $this.data());
                if ($this.data('GSHeaderFullscreen')) return;
                $this.data('GSHeaderFullscreen', new GSHeaderFullscreen(
                    $this,
                    itemConfig,
                    new GSHeaderFullscreenOverlayEffect()
                ));
                _self._pageCollection = _self._pageCollection.add($this);
            });
        },
        // Binds necessary global events
        _bindGlobalEvents: function () {
            var _self = this;
            $(window).on('resize.GSHeaderFullscreen', function () {
                if (_self.resizeTimeOutId) clearTimeout(_self.resizeTimeOutId);
                _self.resizeTimeOutId = setTimeout(function () {
                    _self._pageCollection.each(function (i, el) {
                        var $this = $(el), GSHeaderFullscreen = $this.data('GSHeaderFullscreen');
                        if (!GSHeaderFullscreen) return;
                        GSHeaderFullscreen.update();
                    });
                }, 50);
            });
            $(document).on('keyup.GSHeaderFullscreen', function (e) {
                if (e.keyCode && e.keyCode === 27) {
                    _self._pageCollection.each(function (i, el) {
                        var $this = $(el),
                            GSHeaderFullscreen = $this.data('GSHeaderFullscreen');
                        if (!GSHeaderFullscreen) return;
                        GSHeaderFullscreen.hide();
                    });
                }
            });
        }
    };

    function GSHeaderFullscreen(element, config, effect) {
        var _self = this;
        this.element = element;
        this.config = config;
        this.effect = effect;
        this.overlay = $('<div></div>', {
            class: _self.config.overlayClass
        });
        Object.defineProperty(this, 'isShown', {
            get: function () {
                return _self.effect.isShown();
            }
        });
        Object.defineProperty(this, 'sections', {
            get: function () {
                return _self.element.find(_self.config.sectionsContainerSelector);
            }
        });
        this.element.append(this.overlay);
        this.effect.init(this.element, this.overlay, this.config.afterOpen, this.config.afterClose);
        this._bindEvents();
        if ($.GSCore.components.GSScrollBar && this.sections.length) {
            $.GSCore.components.GSScrollBar.init(this.sections);
        }
    }

    GSHeaderFullscreen.prototype._bindEvents = function () {
        var _self = this;
        this.invoker = $('[data-target="#' + this.element.attr('id') + '"]');
        if (this.invoker.length) {
            this.invoker.off('click.GSHeaderFullscreen').on('click.GSHeaderFullscreen', function (e) {
                _self[_self.isShown ? 'hide' : 'show']();
                e.preventDefault();
            });
        }
        return this;
    };
    GSHeaderFullscreen.prototype.update = function () {
        if (!this.effect) return false;
        this.effect.update();
        return this;
    };
    GSHeaderFullscreen.prototype.show = function () {
        if (!this.effect) return false;
        this.effect.show();
        return this;
    };
    GSHeaderFullscreen.prototype.hide = function () {
        if (!this.effect) return false;
        this.effect.hide();
        return this;
    };

    function GSHeaderFullscreenOverlayEffect() {
        this._isShown = false;
    }

    GSHeaderFullscreenOverlayEffect.prototype.init = function (element, overlay, afterOpen, afterClose) {
        var _self = this;
        this.element = element;
        this.overlay = overlay;
        this.afterOpen = afterOpen;
        this.afterClose = afterClose;
        this.overlay.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            if (_self.isShown() && e.originalEvent.propertyName === 'transform') {
                _self.afterOpen.call(_self.element, _self.overlay);
            } else if (!_self.isShown() && e.originalEvent.propertyName === 'transform') {
                _self.afterClose.call(_self.element, _self.overlay);
            }
            e.stopPropagation();
            e.preventDefault();
        });
        this.update();
        this.overlay.addClass(this.element.data('overlay-classes'));
        return this;
    };
    GSHeaderFullscreenOverlayEffect.prototype.destroy = function () {
        this.overlay.css({
            'width': 'auto',
            'height': 'auto'
        });
        this.element.removeClass('u-header--fullscreen-showed');
        return this;
    };
    GSHeaderFullscreenOverlayEffect.prototype.update = function () {
        var $w = $(window),
            $wW = $w.width(),
            $wH = $w.height();
        this.overlay.css({
            width: $wW > $wH ? $wW * 1.5 : $wH * 1.5,
            height: $wW > $wH ? $wW * 1.5 : $wH * 1.5
        });
        return this;
    };
    GSHeaderFullscreenOverlayEffect.prototype.show = function () {
        this.element.addClass('u-header--fullscreen-showed');
        this._isShown = true;
        return this;
    };
    GSHeaderFullscreenOverlayEffect.prototype.hide = function () {
        this.element.removeClass('u-header--fullscreen-showed');
        this._isShown = false;
        return this;
    };
    GSHeaderFullscreenOverlayEffect.prototype.isShown = function () {
        return this._isShown;
    };
    // 20. GSHeaderSide Component
    $.GSCore.components.GSHeaderSide = {
        // Base Configuration
        _baseConfig: {
            headerBreakpoint: null,
            breakpointsMap: {
                'md': 768,
                'sm': 576,
                'lg': 992,
                'xl': 1200
            },
            afterOpen: function () {
            },
            afterClose: function () {
            }
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            var _self = this;
            if (!collection || !collection.length) {
                return $();
            }
            this.$w = $(window);
            config = config && $.isPlainObject(config) ? config : {};
            this._bindGlobalEvents();
            return collection.each(function (i, el) {
                var $this = $(el), itemConfig = $.extend(true, {}, _self._baseConfig, config, $this.data());
                if ($this.data('GSHeaderSide')) {
                    return;
                }
            });
        },
        // Binds Necessary Global Events
        _bindGlobalEvents: function () {
            var _self = this;
            this.$w.on('resize.GSHeaderSide', function (e) {
                if (_self.resizeTimeoutId) clearTimeout(_self.resizeTimeoutId);
                _self.resizeTimeoutId = setTimeout(function () {
                    _self._pageCollection.each(function (i, el) {
                        var GSHeaderSide = $(el).data('GSHeaderSide');
                        if (!GSHeaderSide.config.headerBreakpoint) return;
                        if (_self.$w.width() < GSHeaderSide.config.breakpointsMap[GSHeaderSide.config.headerBreakpoint] && GSHeaderSide.isInit()) {
                            GSHeaderSide.destroy();
                        } else if (_self.$w.width() >= GSHeaderSide.config.breakpointsMap[GSHeaderSide.config.headerBreakpoint] && !GSHeaderSide.isInit()) {
                            GSHeaderSide.init();
                        }
                    });
                }, 10);
            });

        }
    };

    function _GSHeaderSideAbstract(element, config) {
        // Contains link to the current element
        this.element = element;
        // Contains configuration object
        this.config = config;
        // Contains link to the window object
        this.$w = $(window);
        // Contains name of methods which should be implemented in derived class
        this._abstractMethods = ['init', 'destroy', 'show', 'hide', 'isInit'];
        // Runs initialization of the object
        this._build = function () {
            if (!this.config.headerBreakpoint) return this.init();
            if (this.config.breakpointsMap[this.config.headerBreakpoint] <= this.$w.width()) {
                return this.init();
            } else {
                return this.destroy();
            }
        };
        // Checks whether derived class implements necessary abstract events
        this._isCorrectDerrivedClass = function () {
            var _self = this;
            this._abstractMethods.forEach(function (method) {
                if (!(method in _self) || !$.isFunction(_self[method])) {
                    throw new Error('GSHeaderSide: Derived class must implement ' + method + ' method.');
                }
            });
            this._build();
        };
        setTimeout(this._isCorrectDerrivedClass.bind(this), 10);
    }

    function GSHeaderSideStaticLeft(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        this.body = $('body');
    }

    GSHeaderSideStaticLeft.prototype.init = function () {
        this.body.addClass('u-body--header-side-static-left');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        return this;
    };
    GSHeaderSideStaticLeft.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-static-left');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        return this;
    };
    GSHeaderSideStaticLeft.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-static-left');
    };
    GSHeaderSideStaticLeft.prototype.show = function () {
        return this;
    };
    GSHeaderSideStaticLeft.prototype.hide = function () {
        return this;
    };

    function GSHeaderSideStaticRight(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        this.body = $('body');
    }

    GSHeaderSideStaticRight.prototype.init = function () {
        this.body.addClass('u-body--header-side-static-right');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        return this;
    };
    GSHeaderSideStaticRight.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-static-right');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        return this;
    };
    GSHeaderSideStaticRight.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-static-right');
    };
    GSHeaderSideStaticRight.prototype.show = function () {
        return this;
    };
    GSHeaderSideStaticRight.prototype.hide = function () {
        return this;
    };

    function GSHeaderSideOverlayLeft(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        Object.defineProperty(this, 'isShown', {
            get: function () {
                return this.body.hasClass('u-body--header-side-opened');
            }
        });
        Object.defineProperty(this, 'overlayClasses', {
            get: function () {
                return this.element.data('header-overlay-classes') ? this.element.data('header-overlay-classes') : '';
            }
        });
        Object.defineProperty(this, 'headerClasses', {
            get: function () {
                return this.element.data('header-classes') ? this.element.data('header-classes') : '';
            }
        });
        this.body = $('body');
        this.invoker = $('[data-target="#' + this.element.attr('id') + '"]');
    }

    GSHeaderSideOverlayLeft.prototype.init = function () {
        var _self = this;
        this.body.addClass('u-body--header-side-overlay-left');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        if (this.invoker.length) {
            this.invoker.on('click.GSHeaderSide', function (e) {
                if (_self.isShown) {
                    _self.hide();
                } else {
                    _self.show();
                }
                e.preventDefault();
            }).css('display', 'block');
        }
        if (!this.overlay) {
            this.overlay = $('<div></div>', {
                class: 'u-header__overlay ' + _self.overlayClasses
            });
        }
        this.overlay.on('click.GSHeaderSide', function (e) {
            var hamburgers = _self.invoker.length ? _self.invoker.find('.is-active') : $();
            if (hamburgers.length) hamburgers.removeClass('is-active');
            _self.hide();
        });
        this.element.addClass(this.headerClasses).append(this.overlay);
        return this;
    };
    GSHeaderSideOverlayLeft.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-overlay-left');
        this.hide();
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        this.element.removeClass(this.headerClasses);
        if (this.invoker.length) {
            this.invoker.off('click.GSHeaderSide').css('display', 'none');
        }
        if (this.overlay) {
            this.overlay.off('click.GSHeaderSide');
            this.overlay.remove();
            this.overlay = null;
        }
        return this;
    };
    GSHeaderSideOverlayLeft.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-overlay-left');
    };
    GSHeaderSideOverlayLeft.prototype.show = function () {
        this.body.addClass('u-body--header-side-opened');
        return this;
    };
    GSHeaderSideOverlayLeft.prototype.hide = function () {
        this.body.removeClass('u-body--header-side-opened');
        return this;
    };

    function GSHeaderSidePushLeft(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        Object.defineProperty(this, 'isShown', {
            get: function () {
                return this.body.hasClass('u-body--header-side-opened');
            }
        });
        Object.defineProperty(this, 'overlayClasses', {
            get: function () {
                return this.element.data('header-overlay-classes') ? this.element.data('header-overlay-classes') : '';
            }
        });
        Object.defineProperty(this, 'headerClasses', {
            get: function () {
                return this.element.data('header-classes') ? this.element.data('header-classes') : '';
            }
        });
        Object.defineProperty(this, 'bodyClasses', {
            get: function () {
                return this.element.data('header-body-classes') ? this.element.data('header-body-classes') : '';
            }
        });
        this.body = $('body');
        this.invoker = $('[data-target="#' + this.element.attr('id') + '"]');
    }

    GSHeaderSidePushLeft.prototype.init = function () {
        var _self = this;
        this.body.addClass('u-body--header-side-push-left');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        if (this.invoker.length) {
            this.invoker.on('click.GSHeaderSide', function (e) {
                if (_self.isShown) {
                    _self.hide();
                } else {
                    _self.show();
                }
                e.preventDefault();
            }).css('display', 'block');
        }
        if (!this.overlay) {
            this.overlay = $('<div></div>', {
                class: 'u-header__overlay ' + _self.overlayClasses
            });
        }
        this.overlay.on('click.GSHeaderSide', function (e) {
            var hamburgers = _self.invoker.length ? _self.invoker.find('.is-active') : $();
            if (hamburgers.length) hamburgers.removeClass('is-active');
            _self.hide();
        });
        this.element.addClass(this.headerClasses).append(this.overlay);
        this.body.addClass(this.bodyClasses);
        return this;
    };
    GSHeaderSidePushLeft.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-push-left');
        this.hide();
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        this.element.removeClass(this.headerClasses);
        this.body.removeClass(this.bodyClasses);
        if (this.invoker.length) {
            this.invoker.off('click.GSHeaderSide').css('display', 'none');
        }
        if (this.overlay) {
            this.overlay.off('click.GSHeaderSide');
            this.overlay.remove();
            this.overlay = null;
        }
        return this;
    };
    GSHeaderSidePushLeft.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-push-left');
    };
    GSHeaderSidePushLeft.prototype.show = function () {
        this.body.addClass('u-body--header-side-opened');
        return this;
    };
    GSHeaderSidePushLeft.prototype.hide = function () {
        this.body.removeClass('u-body--header-side-opened');
        return this;
    };

    function GSHeaderSideOverlayRight(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        Object.defineProperty(this, 'isShown', {
            get: function () {
                return this.body.hasClass('u-body--header-side-opened');
            }
        });
        Object.defineProperty(this, 'overlayClasses', {
            get: function () {
                return this.element.data('header-overlay-classes') ? this.element.data('header-overlay-classes') : '';
            }
        });
        Object.defineProperty(this, 'headerClasses', {
            get: function () {
                return this.element.data('header-classes') ? this.element.data('header-classes') : '';
            }
        });
        this.body = $('body');
        this.invoker = $('[data-target="#' + this.element.attr('id') + '"]');
    }

    GSHeaderSideOverlayRight.prototype.init = function () {
        var _self = this;
        this.body.addClass('u-body--header-side-overlay-right');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        if (this.invoker.length) {
            this.invoker.on('click.GSHeaderSide', function (e) {
                if (_self.isShown) {
                    _self.hide();
                } else {
                    _self.show();
                }
                e.preventDefault();
            }).css('display', 'block');
        }
        if (!this.overlay) {
            this.overlay = $('<div></div>', {
                class: 'u-header__overlay ' + _self.overlayClasses
            });
        }
        this.overlay.on('click.GSHeaderSide', function (e) {
            var hamburgers = _self.invoker.length ? _self.invoker.find('.is-active') : $();
            if (hamburgers.length) hamburgers.removeClass('is-active');
            _self.hide();
        });
        this.element.addClass(this.headerClasses).append(this.overlay);
        return this;
    };
    GSHeaderSideOverlayRight.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-overlay-right');
        this.hide();
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        this.element.removeClass(this.headerClasses);
        if (this.invoker.length) {
            this.invoker.off('click.GSHeaderSide').css('display', 'none');
        }
        if (this.overlay) {
            this.overlay.off('click.GSHeaderSide');
            this.overlay.remove();
            this.overlay = null;
        }
        return this;
    };
    GSHeaderSideOverlayRight.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-overlay-right');
    };
    GSHeaderSideOverlayRight.prototype.show = function () {
        this.body.addClass('u-body--header-side-opened');
        return this;
    };
    GSHeaderSideOverlayRight.prototype.hide = function () {
        this.body.removeClass('u-body--header-side-opened');
        return this;
    };

    function GSHeaderSidePushRight(element, config) {
        _GSHeaderSideAbstract.call(this, element, config);
        Object.defineProperty(this, 'scrollContainer', {
            get: function () {
                return this.element.find('.u-header__sections-container');
            }
        });
        Object.defineProperty(this, 'isShown', {
            get: function () {
                return this.body.hasClass('u-body--header-side-opened');
            }
        });
        Object.defineProperty(this, 'overlayClasses', {
            get: function () {
                return this.element.data('header-overlay-classes') ? this.element.data('header-overlay-classes') : '';
            }
        });
        Object.defineProperty(this, 'headerClasses', {
            get: function () {
                return this.element.data('header-classes') ? this.element.data('header-classes') : '';
            }
        });
        Object.defineProperty(this, 'bodyClasses', {
            get: function () {
                return this.element.data('header-body-classes') ? this.element.data('header-body-classes') : '';
            }
        });
        this.body = $('body');
        this.invoker = $('[data-target="#' + this.element.attr('id') + '"]');
    }

    GSHeaderSidePushRight.prototype.init = function () {
        var _self = this;
        this.body.addClass('u-body--header-side-push-right');
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.init(this.scrollContainer);
        }
        if (this.invoker.length) {
            this.invoker.on('click.GSHeaderSide', function (e) {
                if (_self.isShown) {
                    _self.hide();
                } else {
                    _self.show();
                }
                e.preventDefault();
            }).css('display', 'block');
        }
        if (!this.overlay) {
            this.overlay = $('<div></div>', {
                class: 'u-header__overlay ' + _self.overlayClasses
            });
        }
        this.overlay.on('click.GSHeaderSide', function (e) {
            var hamburgers = _self.invoker.length ? _self.invoker.find('.is-active') : $();
            if (hamburgers.length) hamburgers.removeClass('is-active');
            _self.hide();
        });
        this.element.addClass(this.headerClasses).append(this.overlay);
        this.body.addClass(this.bodyClasses);
        return this;
    };
    GSHeaderSidePushRight.prototype.destroy = function () {
        this.body.removeClass('u-body--header-side-push-right');
        this.hide();
        if ($.GSCore.components.GSScrollBar && this.scrollContainer.length) {
            $.GSCore.components.GSScrollBar.destroy(this.scrollContainer);
        }
        this.element.removeClass(this.headerClasses);
        this.body.removeClass(this.bodyClasses);
        if (this.invoker.length) {
            this.invoker.off('click.GSHeaderSide').css('display', 'none');
        }
        if (this.overlay) {
            this.overlay.off('click.GSHeaderSide');
            this.overlay.remove();
            this.overlay = null;
        }
        return this;
    };
    GSHeaderSidePushRight.prototype.isInit = function () {
        return this.body.hasClass('u-body--header-side-push-right');
    };
    GSHeaderSidePushRight.prototype.show = function () {
        this.body.addClass('u-body--header-side-opened');
        return this;
    };
    GSHeaderSidePushRight.prototype.hide = function () {
        this.body.removeClass('u-body--header-side-opened');
        return this;
    };
    // 21. Map Pin Component
    $.GSCore.components.GSPinMap = {
        // Base Configuration
        _baseConfig: {
            responsive: true,
            popover: {
                show: false,
                animate: true
            }
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
                return;
            }
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initPinMap();
            return this.pageCollection;
        },
        // Init Map Pin Function
        initPinMap: function () {
            // Variables
            var $self, config, collection;
            // Variables Values
            $self = this;
            config = $self.config;
            collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this;
                // Variables Values
                $this = $(el);
                $this.easypinShow(config);
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 22. Svg Map Component
    $.GSCore.components.GSSvgMap = {
        // Base Configuration
        _baseConfig: {
            map: 'world_mill_en',
            zoomOnScroll: false
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) return;
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initSvgMap();
            return this.pageCollection;
        },
        // Init SvgMap Function
        initSvgMap: function () {
            // Variables
            var $self, config, collection;
            // Variables Values
            $self = this;
            config = $self.config;
            collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this;
                // Variables Values
                $this = $(el);
                $this.vectorMap(config);
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 23. Markup Copy Component
    $.GSCore.components.GSMarkupCopy = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
                return;
            }
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initMarkupCopy();
            return this.pageCollection;
        },
        // Init Markup Copy Function
        initMarkupCopy: function () {
            // Variables
            var $self = this, collection = $self.pageCollection, shortcodeArr = {};
            $('[data-content-target]').each(function () {
                var $this = $(this), contentTarget = $this.data('content-target');
                shortcodeArr[contentTarget] = $(contentTarget).html().replace(/&quot;/g, /&quot;/g).replace(/type=\"text\/plain\"/g, '');
            });
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var windW = $(window).width(),
                    // Tabs
                    $this = $(el),
                    defaultText = $this.get(0).lastChild.nodeValue;
                $this.on('click', function (e) {
                    e.preventDefault();
                });
                new ClipboardJS(el, {
                    text: function (button) {
                        // Variables
                        var target = $(button).data('content-target');
                        // Actions
                        return shortcodeArr[target];
                    }
                }).on('success', function () {
                    // Variables
                    var successText = $this.data('success-text');
                    $this.get(0).lastChild.nodeValue = ' ' + successText + ' ';
                    setTimeout(function () {
                        $this.get(0).lastChild.nodeValue = defaultText;
                    }, 800);
                });
                // Actions
                collection = collection.add(el);
            });
        }
    };
    // 24. Masked Input Component
    $.GSCore.components.GSMaskedInput = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
                return;
            }
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initMaskedInput();
            return this.pageCollection;
        },
        // Init Masked Input Function
        initMaskedInput: function () {
            // Variables
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el), mask = $this.data('mask'), placeholder = $this.attr('placeholder');
                $this.mask(mask, {
                    placeholder: placeholder ? placeholder : false
                });
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 25. Modal Event Component
    $.GSCore.components.GSModalEvent = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
                return;
            }
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initModalEvent();
            return this.pageCollection;
        },
        // Init Modal Event Function
        initModalEvent: function () {
            // Variables
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el), eventType = $this.data('event-type');
                if (eventType === 'scrollOnce') {
                    $self.scrollOnce(el);
                } else if (eventType === 'callAfterTime') {
                    $self.callAfterTime(el);
                } else if (eventType === 'scrollSequential') {
                    $self.scrollSequential(el);
                } else if (eventType === 'exitIntent') {
                    $self.exitIntent(el);
                }
                // Actions
                collection = collection.add($this);
            });
        },
        scrollOnce: function (el) {
            var counter = 0;
            $(window).on('scroll', function () {
                var $this = $(el),
                    event = $this.data('event'),
                    thisOffsetTop = $this.offset().top;
                if (counter === 0) {
                    if ($(window).scrollTop() >= thisOffsetTop) {
                        counter += 1;
                    }
                }
            });
        },
        scrollSequential: function (el) {
            var counter = 0;
            $(window).on('scroll', function () {
                var $this = $(el),
                    eventFirst = $this.data('event-first'),
                    eventSecond = $this.data('event-second'),
                    thisOffsetTop = $this.offset().top;
                if (counter === 0) {
                    if ($(window).scrollTop() >= thisOffsetTop) {
                        counter += 1;
                    }
                } else if (counter === 1) {
                    if ($(window).scrollTop() < thisOffsetTop) {
                        counter -= 1;
                    }
                }
            });
        },
        callAfterTime: function (el) {
            var $this = $(el),
                event = $this.data('event'),
                time = $this.data('time');
            setTimeout(function () {

            }, time);
        },
        exitIntent: function (el) {
            var $this = $(el), event = $this.data('event');
            $('html').mouseleave(function () {
                $('html').unbind('mouseleave');
            });
        }
    };
    // 26. Modal Window Component
    $.GSCore.components.GSModalWindow = {
        // Base Configuration
        _baseConfig: {
            bounds: 100,
            debounce: 50,
            overlayOpacity: 0.48,
            overlayColor: '#000000',
            speed: 400,
            type: 'onscroll',
            effect: 'fadein',
            onOpen: function () {
            },
            onClose: function () {
            },
            onComplete: function () {
            }
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            var collection = $(selector);
            if (!collection.length) return;
            config = config && $.isPlainObject(config) ? $.extend({}, this._baseConfig, config) : this._baseConfig;
            config.selector = selector;
            this._pageCollection = this._pageCollection.add(collection.not(this._pageCollection));
            if (config.autonomous) {
                return this.initAutonomousModalWindows(collection, config);
            }
            return this.initBaseModalWindows(collection, config);
        },
        // Initialization of Base Modal Window of the page
        initBaseModalWindows: function (collection, config) {
            return collection.on('click', function (e) {
                if (!('Custombox' in window)) return;
                var $this = $(this),
                    target = $this.data('modal-target'),
                    effect = $this.data('modal-effect') || config['effect'];
                if (!target || !$(target).length) return;
                new Custombox.modal(
                    {
                        content: {
                            target: target,
                            effect: effect,
                            onOpen: function () {
                                config['onOpen'].call($(target));
                                Custombox.modal.closeAll();
                            },
                            onClose: function () {
                                config['onClose'].call($(target));
                            },
                            onComplete: function () {
                                config['onComplete'].call($(target));
                            }
                        },
                        overlay: {
                            color: $this.data('overlay-color') || config['overlayColor'],
                            opacity: $this.data('overlay-opacity') || config['overlayOpacity'],
                            speedIn: $this.data('speed') || config['speed'],
                            speedOut: $this.data('speed') || config['speed']
                        }
                    }
                ).open();
                e.preventDefault();
            });
        },
        // Initialization of Autonomous Modal Window of the page
        initAutonomousModalWindows: function (collection, config) {
            var self = this;
            return collection.each(function (i, el) {
                var $this = $(el), type = $this.data('modal-type');
                switch (type) {
                    case 'hashlink' :
                        self.initHashLinkPopup($this, config);
                        break;
                    case 'onscroll' :
                        self.initOnScrollPopup($this, config);
                        break;
                    case 'beforeunload' :
                        self.initBeforeUnloadPopup($this, config);
                        break;
                    case 'ontarget' :
                        self.initOnTargetPopup($this, config);
                        break;
                    case 'aftersometime' :
                        self.initAfterSomeTimePopup($this, config);
                        break;
                }
            });
        },
        // Initialization of Hash Link Popup
        initHashLinkPopup: function (popup, config) {
            var self = this, hashItem = $(window.location.hash), target = $('#' + popup.attr('id'));
            if (hashItem.length && hashItem.attr('id') === popup.attr('id')) {
                new Custombox.modal(
                    {
                        content: {
                            target: '#' + popup.attr('id'),
                            effect: popup.data('effect') || config['effect'],
                            onOpen: function () {
                                config['onOpen'].call($(target));
                            },
                            onClose: function () {
                                config['onClose'].call($(target));
                            },
                            onComplete: function () {
                                config['onComplete'].call($(target));
                            }
                        },
                        overlay: {
                            color: popup.data('overlay-color') || config['overlayColor'],
                            opacity: popup.data('overlay-opacity') || config['overlayOpacity'],
                            speedIn: popup.data('speed') || config['speed'],
                            speedOut: popup.data('speed') || config['speed']
                        }
                    }
                ).open();
            }
        },
        // Initialization of OnScroll Popup
        initOnScrollPopup: function (popup, config) {
            var self = this,
                $window = $(window),
                breakpoint = popup.data('breakpoint') ? popup.data('breakpoint') : 0,
                target = $('#' + popup.attr('id'));
            $window.on('scroll.popup', function () {
                var scrolled = $window.scrollTop() + $window.height();
                if (scrolled >= breakpoint) {
                    new Custombox.modal(
                        {
                            content: {
                                target: '#' + popup.attr('id'),
                                effect: popup.data('effect') || config['effect'],
                                onOpen: function () {
                                    config['onOpen'].call($(target));
                                },
                                onClose: function () {
                                    config['onClose'].call($(target));
                                },
                                onComplete: function () {
                                    config['onComplete'].call($(target));
                                }
                            },
                            overlay: {
                                color: popup.data('overlay-color') || config['overlayColor'],
                                opacity: popup.data('overlay-opacity') || config['overlayOpacity'],
                                speedIn: popup.data('speed') || config['speed'],
                                speedOut: popup.data('speed') || config['speed']
                            }
                        }
                    ).open();
                    $window.off('scroll.popup');
                }
            });
            $window.trigger('scroll.popup');
        },
        // Initialization of Before Unload Popup
        initBeforeUnloadPopup: function (popup, config) {
            var self = this,
                count = 0,
                target = $('#' + popup.attr('id')),
                timeoutId;
            window.addEventListener('mousemove', function (e) {
                if (timeoutId) clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    if (e.clientY < 10 && !count) {
                        count++;
                        new Custombox.modal(
                            {
                                content: {
                                    target: '#' + popup.attr('id'),
                                    effect: popup.data('effect') || config['effect'],
                                    onOpen: function () {
                                        config['onOpen'].call($(target));
                                    },
                                    onClose: function () {
                                        config['onClose'].call($(target));
                                    },
                                    onComplete: function () {
                                        config['onComplete'].call($(target));
                                    }
                                },
                                overlay: {
                                    color: popup.data('overlay-color') || config['overlayColor'],
                                    opacity: popup.data('overlay-opacity') || config['overlayOpacity'],
                                    speedIn: popup.data('speed') || config['speed'],
                                    speedOut: popup.data('speed') || config['speed']
                                }
                            }
                        ).open();
                    }
                }, 10);
            });
        },
        // Initialization of OnTarget Popup
        initOnTargetPopup: function (popup, config) {
            var self = this, target = popup.data('target');
            if (!target || !$(target).length) return;
            appear({
                bounds: config['bounds'],
                debounce: config['debounce'],
                elements: function () {
                    return document.querySelectorAll(target);
                },
                appear: function (element) {

                    new Custombox.modal(
                        {
                            content: {
                                target: '#' + popup.attr('id'),
                                effect: popup.data('effect') || config['effect'],
                                onOpen: function () {
                                    config['onOpen'].call($(target));
                                },
                                onClose: function () {
                                    config['onClose'].call($(target));
                                },
                                onComplete: function () {
                                    config['onComplete'].call($(target));
                                }
                            },
                            overlay: {
                                color: popup.data('overlay-color') || config['overlayColor'],
                                opacity: popup.data('overlay-opacity') || config['overlayOpacity'],
                                speedIn: popup.data('speed') || config['speed'],
                                speedOut: popup.data('speed') || config['speed']
                            }
                        }
                    ).open();
                }
            });
        },
        // Initialization of After Some Time Popup
        initAfterSomeTimePopup: function (popup, config) {
            var self = this, target = $('#' + popup.attr('id'));
            setTimeout(function () {
                new Custombox.modal(
                    {
                        content: {
                            target: '#' + popup.attr('id'),
                            effect: popup.data('effect') || config['effect'],
                            onOpen: function () {
                                config['onOpen'].call($(target));
                            },
                            onClose: function () {
                                config['onClose'].call($(target));
                            },
                            onComplete: function () {
                                config['onComplete'].call($(target));
                            }
                        },
                        overlay: {
                            color: popup.data('overlay-color') || config['overlayColor'],
                            opacity: popup.data('overlay-opacity') || config['overlayOpacity'],
                            speedIn: popup.data('speed') || config['speed'],
                            speedOut: popup.data('speed') || config['speed']
                        }
                    }
                ).open();
            }, popup.data('delay') ? popup.data('delay') : 10);
        }
    };
    // 27. Navigation Component
    $.GSCore.components.GSNavigation = {
        // Base Configuration
        _baseConfig: {
            navigationOverlayClasses: '',
            navigationInitClasses: '',
            navigationInitBodyClasses: '',
            navigationPosition: 'right',
            activeClass: 'u-main-nav--overlay-opened',
            navigationBreakpoint: 768,
            breakpointsMap: {
                'sm': 576,
                'md': 768,
                'lg': 992,
                'xl': 1200
            },
            afterOpen: function () {
            },
            afterClose: function () {
            }
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            var _self = this, $w = $(window);
            if (!collection || !collection.length) {
                return $();
            }
            config = config && $.isPlainObject(config) ? config : {};
            $w.on('resize.GSNavigation', function (e) {
                if (_self.resizeTimeoutId) clearTimeout(_self.resizeTimeoutId);
                _self.resizeTimeoutId = setTimeout(function () {
                    _self._pageCollection.each(function (i, el) {
                        var $this = $(el), GSNavigation = $this.data('GSNavigation');
                        if ($w.width() > GSNavigation.config.breakpointsMap[GSNavigation.config.navigationBreakpoint] && GSNavigation.isInitialized()) {
                            GSNavigation.destroy();
                        } else if ($w.width() <= GSNavigation.config.breakpointsMap[GSNavigation.config.navigationBreakpoint] && !GSNavigation.isInitialized()) {
                            GSNavigation.init();
                        }
                    });
                }, 50);
            });
            collection.each(function (i, el) {
                var $this = $(el), itemConfig = $.extend(true, {}, _self._baseConfig, config, $this.data());
                if ($this.data('GSNavigation')) return;
                $this.data('GSNavigation', _self._factoryMethod($this, itemConfig));
                _self._pageCollection = _self._pageCollection.add($this);
            });
            _self._pageCollection.each(function (i, el) {
                var $this = $(el), GSNavigation = $this.data('GSNavigation');
                if ($w.width() > GSNavigation.config.breakpointsMap[GSNavigation.config.navigationBreakpoint]) {
                    GSNavigation.destroy();
                } else if ($w.width() <= GSNavigation.config.breakpointsMap[GSNavigation.config.navigationBreakpoint]) {
                    GSNavigation.init();
                }
            });
            return collection;
        },
        // Returns certain object relative to class name
        _factoryMethod: function (element, config) {
            if (element.filter('[class*="u-main-nav--overlay"]').length) {
                return new GSNavigationOverlay(element, config);
            } else if (element.filter('[class*="u-main-nav--push"]').length) {
                return new GSNavigationPush(element, config);
            }
        }
    };

    function GSNavigationAbstract(element, config) {
        this.element = element;
        this.body = $('body');
        this.config = config;
        this.reinit = function () {
            this.destroy().init();
        };
    }

    function GSNavigationOverlay(element, config) {
        var _self = this;
        GSNavigationAbstract.call(this, element, config);
        Object.defineProperties(this, {
            overlayClasses: {
                get: function () {
                    return 'u-main-nav__overlay ' + _self.config.navigationOverlayClasses;
                }
            },
            bodyClasses: {
                get: function () {
                    return 'u-main-nav--overlay-' + _self.config.navigationPosition;
                }
            },
            isOpened: {
                get: function () {
                    return _self.body.hasClass(_self.config.activeClass);
                }
            }
        });
    }

    GSNavigationOverlay.prototype.init = function () {
        var _self = this;
        this.overlay = $('<div></div>', {
            class: _self.overlayClasses
        });
        if ($.GSCore.components.GSScrollBar) {
            setTimeout(function () {
                $.GSCore.components.GSScrollBar.init(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);
        }
        this.toggler = $('[data-target="#' + this.element.attr('id') + '"]');
        if (this.toggler && this.toggler.length) this.toggler.css('display', 'block');
        this.body.addClass(this.bodyClasses);
        this.element
            .addClass('u-main-nav--overlay')
            .append(this.overlay);
        setTimeout(function () {
            _self.element.addClass(_self.config.navigationInitClasses);
            _self.body.addClass(_self.config.navigationInitBodyClasses);
            _self.transitionDuration = parseFloat(getComputedStyle(_self.element.get(0)).transitionDuration, 10);
            if (_self.transitionDuration > 0) {
                _self.element.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                    if (_self.isOpened) {
                        _self.config.afterOpen.call(_self.element, _self.overlay);
                    } else if (!_self.isOpened) {
                        _self.config.afterClose.call(_self.element, _self.overlay);
                    }
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
        }, 50);
        this._bindEvents();
        this.isInit = true;
    };
    GSNavigationOverlay.prototype.destroy = function () {
        var _self = this;
        if (this.overlay) this.overlay.remove();
        if (this.toggler && this.toggler.length) this.toggler.hide();
        if ($.GSCore.components.GSScrollBar) {
            setTimeout(function () {
                $.GSCore.components.GSScrollBar.destroy(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);
        }
        setTimeout(function () {
            if (_self.transitionDuration && _self.transitionDuration > 0) {
                _self.element.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            }
        }, 50);
        this.body.removeClass(this.bodyClasses);
        this.element
            .removeClass('u-main-nav--overlay')
            .removeClass(this.config.navigationInitClasses);
        this.body.removeClass(this.bodyClasses).removeClass(this.config.navigationInitBodyClasses);
        this._unbindEvents();
        this.isInit = false;
    };
    GSNavigationOverlay.prototype._bindEvents = function () {
        var _self = this;
        if (this.toggler && this.toggler.length) {
            this.toggler.on('click.GSNavigation', function (e) {
                if (_self.isOpened) {
                    _self.close();
                } else {
                    _self.open();
                }
                e.preventDefault();
            });
        }
        this.overlay.on('click.GSNavigation', function (e) {
            _self.close();
        });
        $(document).on('keyup.GSNavigation', function (e) {
            if (e.keyCode === 27) {
                _self.close();
            }
        });
    };
    GSNavigationOverlay.prototype._unbindEvents = function () {
        if (this.toggler && this.toggler.length) {
            this.toggler.off('click.GSNavigation');
        }
        if (this.overlay && this.overlay.length) {
            this.overlay.off('click.GSNavigation');
        }
        $(document).off('keyup.GSNavigation');
    };
    GSNavigationOverlay.prototype.open = function () {
        this.body.addClass(this.config.activeClass);
        if (this.transitionDuration !== undefined && this.transitionDuration === 0) {
            this.config.afterOpen.call(this.element, this.overlay);
        }
    };
    GSNavigationOverlay.prototype.close = function () {
        var $this = this,
            hamburgers = $this.toggler && $this.toggler.length ? $this.toggler.find('.is-active') : $();
        if (hamburgers.length) hamburgers.removeClass('is-active');
        $this.body.removeClass($this.config.activeClass);
        $this.element.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            $this.toggler.attr('aria-expanded', false);
            $this.element.removeClass('collapse show');
        });
    };
    GSNavigationOverlay.prototype.isInitialized = function () {
        return this.isInit;
    };

    function GSNavigationPush(element, config) {
        var _self = this;
        GSNavigationAbstract.call(this, element, config);
        Object.defineProperties(this, {
            overlayClasses: {
                get: function () {
                    return 'u-main-nav__overlay ' + _self.config.navigationOverlayClasses;
                }
            },
            bodyClasses: {
                get: function () {
                    return 'u-main-nav--push-' + _self.config.navigationPosition;
                }
            },
            isOpened: {
                get: function () {
                    return _self.body.hasClass(_self.config.activeClass);
                }
            }
        });
    }

    GSNavigationPush.prototype.init = function () {
        var _self = this;
        this.overlay = $('<div></div>', {
            class: _self.overlayClasses
        });
        if ($.GSCore.components.GSScrollBar) {
            setTimeout(function () {
                $.GSCore.components.GSScrollBar.init(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);
        }
        this.toggler = $('[data-target="#' + this.element.attr('id') + '"]');
        if (this.toggler && this.toggler.length) this.toggler.css('display', 'block');
        this.body.addClass(this.bodyClasses);
        this.element
            .addClass('u-main-nav--push')
            .append(this.overlay);
        setTimeout(function () {
            _self.element.addClass(_self.config.navigationInitClasses);
            _self.body.addClass(_self.config.navigationInitBodyClasses);
            _self.transitionDuration = parseFloat(getComputedStyle(_self.element.get(0)).transitionDuration, 10);
            if (_self.transitionDuration > 0) {
                _self.element.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                    if (_self.isOpened) {
                        _self.config.afterOpen.call(_self.element, _self.overlay);
                    } else if (!_self.isOpened) {
                        _self.config.afterClose.call(_self.element, _self.overlay);
                    }
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
        }, 50);
        this._bindEvents();
        this.isInit = true;
    };
    GSNavigationPush.prototype.destroy = function () {
        var _self = this;
        if (this.overlay) this.overlay.remove();
        if (this.toggler && this.toggler.length) this.toggler.hide();
        if ($.GSCore.components.GSScrollBar) {
            setTimeout(function () {
                $.GSCore.components.GSScrollBar.destroy(_self.element.find('.u-main-nav__list-wrapper'));
            }, 10);
        }
        setTimeout(function () {
            if (_self.transitionDuration && _self.transitionDuration > 0) {
                _self.element.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            }
        }, 50);
        this.body.removeClass(this.bodyClasses).removeClass(this.config.navigationInitBodyClasses);
        this.element
            .removeClass('u-main-nav--push')
            .removeClass(this.config.navigationInitClasses);
        this._unbindEvents();
        this.isInit = false;
    };
    GSNavigationPush.prototype._bindEvents = function () {
        var _self = this;
        if (this.toggler && this.toggler.length) {
            this.toggler.on('click.GSNavigation', function (e) {
                if (_self.isOpened) {
                    _self.close();
                } else {
                    _self.open();
                }
                e.preventDefault();
            });
        }
        this.overlay.on('click.GSNavigation', function (e) {
            _self.close();
        });
        $(document).on('keyup.GSNavigation', function (e) {
            if (e.keyCode === 27) {
                _self.close();
            }
        });
    };
    GSNavigationPush.prototype._unbindEvents = function () {
        if (this.toggler && this.toggler.length) {
            this.toggler.off('click.GSNavigation');
        }
        if (this.overlay && this.overlay.length) {
            this.overlay.off('click.GSNavigation');
        }
        $(document).off('keyup.GSNavigation');
    };
    GSNavigationPush.prototype.open = function () {
        this.body.addClass(this.config.activeClass);
        if (this.transitionDuration !== undefined && this.transitionDuration === 0) {
            this.config.afterOpen.call(this.element, this.overlay);
        }
    };
    GSNavigationPush.prototype.close = function () {
        var hamburgers = this.toggler && this.toggler.length ? this.toggler.find('.is-active') : $();
        if (hamburgers.length) hamburgers.removeClass('is-active');
        this.body.removeClass(this.config.activeClass);
        if (this.transitionDuration !== undefined && this.transitionDuration === 0) {
            this.config.afterClose.call(this.element, this.overlay);
        }
    };
    GSNavigationPush.prototype.isInitialized = function () {
        return this.isInit;
    };
    // 28. NL Form Component
    $.GSCore.components.GSNLForm = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
                return;
            }
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initNLForm();
            return this.pageCollection;
        },
        // Init NL Form Function
        initNLForm: function () {
            // Variables
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                var $this = $(el)[0].id;
                // Variables
                var nlform = new NLForm(document.getElementById($this));
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 29. Onscroll Animation Component
    $.GSCore.components.GSOnScrollAnimation = {
        // Base Configuration
        _baseConfig: {
            bounds: -100,
            debounce: 50,
            inViewportClass: 'u-in-viewport',
            animation: 'fadeInUp',
            animationOut: false,
            animationDelay: 0,
            animationDuration: 1000,
            afterShow: function () {
            },
            onShown: function () {
            },
            onHidded: function () {
            }
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            if (!selector || !$(selector).length) {
                return;
            }
            var self = this;
            this.config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
            appear({
                bounds: self.config['bounds'],
                reappear: false,
                debounce: self.config['debounce'],
                elements: function () {
                    return document.querySelectorAll(selector);
                },
                init: function () {
                    $(selector).each(function (i, el) {
                        var $this = $(el);
                        if (!$this.data('GSAnimationElement')) {
                            $this.data('GSAnimationElement', new GSAnimationElement($this, self.config));

                            self._pageCollection = self._pageCollection.add($this);
                        }
                    });
                },
                appear: function (el) {
                    var $el = $(el);
                    if (!$el.hasClass(self.config.inViewportClass)) {
                        $el.data('GSAnimationElement').show();
                    }
                }
            });
            return this._pageCollection;
        }
    };

    function GSAnimationElement(element, config) {
        if (!element || !element.length) return;
        var self = this;
        this.element = element;
        this.config = config && $.isPlainObject(config) ? $.extend(true, {}, config, element.data()) : element.data();
        if (!isFinite(this.config.animationDelay)) this.config.animationDelay = 0;
        if (!isFinite(this.config.animationDuration)) this.config.animationDuration = 1000;
        element.css({
            'animation-duration': self.config.animationDuration + 'ms'
        });
    }

    GSAnimationElement.prototype.show = function () {
        var self = this;
        if (this.config.animationDelay) {
            this.timeOutId = setTimeout(function () {
                self.element
                    .removeClass(self.config.animationOut)
                    .addClass(self.config.animation + ' ' + self.config.inViewportClass);
                self.config.afterShow.call(self.element);
                self.callbackTimeoutId = setTimeout(function () {
                    self.config.onShown.call(self.element);
                }, self.config.animationDuration);

            }, this.config.animationDelay);
        } else {
            this.element
                .removeClass(this.config.animationOut)
                .addClass(this.config.animation + ' ' + this.config.inViewportClass);
            this.config.afterShow.call(this.element);
            this.callbackTimeoutId = setTimeout(function () {
                self.config.onShown.call(self.element);
            }, this.config.animationDuration);
        }
    };
    GSAnimationElement.prototype.hide = function () {
        var self = this;
        if (!this.element.hasClass(this.config.inViewportClass)) return;
        if (this.config.animationOut) {
            this.element
                .removeClass(this.config.animation)
                .addClass(this.config.animationOut);
            this.callbackTimeoutId = setTimeout(function () {
                self.element.removeClass(self.config.inViewportClass);
                self.config.onHidded.call(self.element);
            }, this.config.animationDuration);
        } else {
            this.element.removeClass(this.config.inViewportClass + ' ' + this.config.animation);
            this.config.onHidded.call(this.element);
        }
    };
    // 30. Fancybox Component
    $.GSCore.components.GSPopup = {
        // Base Configuration
        _baseConfig: {
            parentEl: 'html',
            baseClass: 'u-fancybox-theme',
            slideClass: 'u-fancybox-slide',
            speed: 1000,
            slideSpeedCoefficient: 1,
            infobar: false,
            fullScreen: true,
            thumbs: true,
            closeBtn: true,
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-content">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-controls" style="position: relative; z-index: 99999;">' +
                '<div class="fancybox-infobar">' +
                '<div class="fancybox-infobar__body">' +
                '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' +
                '</div>' +
                '</div>' +
                '<div class="fancybox-toolbar">{{BUTTONS}}</div>' +
                '</div>' +
                '<div class="fancybox-slider-wrap">' +
                '<button data-fancybox-prev class="fancybox-arrow fancybox-arrow--left" title="Previous"></button>' +
                '<button data-fancybox-next class="fancybox-arrow fancybox-arrow--right" title="Next"></button>' +
                '<div class="fancybox-stage"></div>' +
                '</div>' +
                '<div class="fancybox-caption-wrap">' +
                '<div class="fancybox-caption"></div>' +
                '</div>' +
                '</div>' +
                '</div>',
            animationEffect: 'fade'
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            if (!selector) return;
            var $collection = $(selector);
            if (!$collection.length) return;
            config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
            this.initPopup(selector, config);
        },
        // Initialization of Popup Function
        initPopup: function (el, conf) {
            var $fancybox = $(el);
            $fancybox.on('click', function () {
                var $this = $(this),
                    animationDuration = $this.data('speed'),
                    isGroup = $this.data('fancybox'),
                    isInfinite = Boolean($this.data('is-infinite')),
                    slideShowSpeed = $this.data('slideshow-speed');
                $.fancybox.defaults.animationDuration = animationDuration;
                if (isInfinite === true) {
                    $.fancybox.defaults.loop = true;
                }
                if (isGroup) {
                    $.fancybox.defaults.transitionEffect = 'slide';
                    $.fancybox.defaults.slideShow.speed = slideShowSpeed;
                }
            });
            $fancybox.fancybox($.extend(true, {}, conf, {
                beforeShow: function (instance, slide) {
                    var $fancyModal = $(instance.$refs.container),
                        $fancyOverlay = $(instance.$refs.bg[0]),
                        $fancySlide = $(instance.current.$slide),
                        animateIn = instance.current.opts.$orig[0].dataset.animateIn,
                        animateOut = instance.current.opts.$orig[0].dataset.animateOut,
                        speed = instance.current.opts.$orig[0].dataset.speed,
                        overlayBG = instance.current.opts.$orig[0].dataset.overlayBg,
                        overlayBlurBG = instance.current.opts.$orig[0].dataset.overlayBlurBg;
                    if (animateIn && $('body').hasClass('u-first-slide-init')) {
                        var $fancyPrevSlide = $(instance.slides[instance.prevPos].$slide);
                        $fancySlide.addClass('has-animation');
                        $fancyPrevSlide.addClass('animated ' + animateOut);
                        setTimeout(function () {
                            $fancySlide.addClass('animated ' + animateIn);
                        }, speed / 2);
                    } else if (animateIn) {
                        var $fancyPrevSlide = $(instance.slides[instance.prevPos].$slide);
                        $fancySlide.addClass('has-animation');
                        $fancySlide.addClass('animated ' + animateIn);
                        $('body').addClass('u-first-slide-init');
                    }
                    if (speed) {
                        $fancyOverlay.css('transition-duration', speed + 'ms');
                    } else {
                        $fancyOverlay.css('transition-duration', '1000ms');
                    }
                    if (overlayBG) {
                        $fancyOverlay.css('background-color', overlayBG);
                    }
                    if (overlayBlurBG) {
                        $('body').addClass('g-blur-30');
                    }
                },
                beforeClose: function (instance, slide) {
                    var $fancyModal = $(instance.$refs.container),
                        $fancySlide = $(instance.current.$slide),
                        animateIn = instance.current.opts.$orig[0].dataset.animateIn,
                        animateOut = instance.current.opts.$orig[0].dataset.animateOut,
                        overlayBlurBG = instance.current.opts.$orig[0].dataset.overlayBlurBg;
                    if (animateOut) {
                        $fancySlide.removeClass(animateIn).addClass(animateOut);
                        $('body').removeClass('u-first-slide-init');
                    }
                    if (overlayBlurBG) {
                        $('body').removeClass('g-blur-30');
                    }
                }
            }));
        }
    };
    // 31. Progress Bar Component
    $.GSCore.components.GSProgressBar = {
        // Base Configuration
        _baseConfig: {
            bounds: -100,
            debounce: 10,
            time: 1000,
            fps: 60,
            rtl: false,
            direction: 'horizontal',
            useProgressElement: false,
            indicatorSelector: 'progress-bar-indicator',
            moveElementSelector: false,
            moveElementTo: 'currentPosition',
            onChange: function (value) {
            },
            beforeUpdate: function () {
            },
            afterUpdate: function () {
            },
            onMoveElementChange: function (value) {
            },
            beforeMoveElementUpdate: function () {
            },
            afterMoveElementUpdate: function () {
            }
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            if (!(selector && $(selector).length)) {
                return;
            }
            this.extendHorizontalProgressBar();
            this.extendVerticalProgressBar();
            return this._initProgressBar(selector, config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig);
        },
        // Initialization of each Progress Bar of the page
        _initProgressBar: function (selector, config) {
            var self = this, currentCollection = $();
            appear({
                bounds: config['bounds'],
                debounce: config['debounce'],
                init: function () {
                    $(selector).each(function (i, el) {
                        var $this = $(el);
                        if (config['direction'] === 'horizontal') {
                            $this.data('ProgressBar', new self.HorizontalProgressBar($this, config));
                        } else {
                            $this.data('ProgressBar', new self.VerticalProgressBar($this, config));
                        }
                        currentCollection = currentCollection.add($this);
                        self._pageCollection = self._pageCollection.add($this);
                    });
                },
                elements: function () {
                    return document.querySelectorAll(selector);
                },
                appear: function (el) {
                    $(el).data('ProgressBar').update($(el).data('value'));
                }
            });
            return currentCollection;
        },
        // Constructor Function of Horizontal Progress Bar
        HorizontalProgressBar: function (element, config) {
            this.element = element;
            this.indicator = this.element.find(config.indicatorSelector);
            this.config = config;
            this.moveElement = config['moveElementSelector'] ? element.parent().find(config['moveElementSelector']) : $();
            if (this.moveElement.length) {
                if (config['rtl']) {
                    this.moveElement.css({
                        'left': 'auto',
                        'right': 0,
                        'margin-right': this.moveElement.outerWidth() / -2
                    });
                } else {
                    this.moveElement.css({
                        'left': 0,
                        'margin-left': this.moveElement.outerWidth() / -2
                    });
                }
            }
            if (this.config.useProgressElement) {
                this.element.data('value', this.element.attr('value'));
                this.element.attr('value', 0);
            } else {
                this.element.data(
                    'value',
                    this.indicator.length ? Math.round(this.indicator.outerWidth() / this.element.outerWidth() * 100) : 0
                );
                this.indicator.css('width', '0%');
            }
        },
        // Constructor Function of Vertical Progress Bar
        VerticalProgressBar: function (element, config) {
            this.element = element;
            this.config = config;
            this.indicator = element.find(config['indicatorSelector']);
            if (!this.indicator.length) {
                return;
            }
            element.data('value', parseInt(this.indicator.css('height'), 10) / this.indicator.parent().outerHeight() * 100);
            this.indicator.css('height', 0);
        },
        // Extends Horizontal ProgressBar
        extendHorizontalProgressBar: function () {
            // Sets new value of the Progress Bar
            this.HorizontalProgressBar.prototype.update = function (value) {
                var self = this;
                if (this.config.useProgressElement) {
                    var fps = (this.config['time'] / this.config['fps']),
                        iterationValue = parseInt(value / fps, 10),
                        counter = 0,
                        self = this;
                    if (iterationValue === 0) iterationValue = 1;
                    this.config.beforeUpdate.call(this.element);
                    if (this.moveElement.length) this.config.beforeMoveElementUpdate.call(this.moveElement);
                    if (self.config.moveElementSelector && self.config['moveElementTo'] === 'end') {
                        var mCounter = 0, mIterationValue = parseInt(100 / fps, 10);
                        if (mIterationValue === 0) mIterationValue = 1;
                        var mCounterId = setInterval(function () {
                            self.moveSubElement(mCounter += mIterationValue);
                            if (self.moveElement.length) self.config.onMoveElementChange.call(self.moveElement, mCounter += mIterationValue);
                            if (mCounter > 100) {
                                clearInterval(mCounterId);
                                self.moveSubElement(100);
                                if (self.moveElement.length) self.config.afterMoveElementUpdate.call(self.moveElement);
                            }
                        }, fps);
                    }
                    this.element.data('intervalId', setInterval(function () {
                        var currentValue = counter += iterationValue;
                        self.element.attr('value', currentValue);
                        self.config.onChange.call(self.element, currentValue);
                        if (self.config.moveElementSelector && self.config['moveElementTo'] === 'currentPosition') self.moveSubElement(currentValue);
                        if (counter > value) {
                            self.element.attr('value', value);
                            if (self.config.moveElementSelector && self.config['moveElementTo'] === 'currentPosition') self.moveSubElement(value);
                            clearInterval(self.element.data('intervalId'));
                            self.config.afterUpdate.call(self.element);
                        }
                    }, fps));
                } else {
                    if (this.indicator.length) {
                        this.indicator.stop().animate({
                            'width': value + '%'
                        }, {
                            duration: self.config.time,
                            complete: function () {
                                self.config.afterUpdate.call(self.element);
                            }
                        });
                    }
                }
            };

            /**
             *
             *
             * @param
             *
             * @return
             */
            this.HorizontalProgressBar.prototype.moveSubElement = function (value, duration) {

                if (!this.moveElement.length) return;

                var self = this;

                this.moveElement.css(this.config['rtl'] ? 'right' : 'left', value + '%');

            };

        },
        // Extends Vertical ProgressBars
        extendVerticalProgressBar: function () {
            // Sets new value of the Progress Bar
            this.VerticalProgressBar.prototype.update = function (value) {
                this.indicator.stop().animate({
                    height: value + '%'
                });
            };
        },
        // Returns full collection of all initialized progress bars
        get: function () {
            return this._pageCollection;
        },
        // Returns API of the progress bar by index in collection
        getAPI: function (index) {
            if (this._pageCollection.eq(index).length) return this._pageCollection.eq(index).data('ProgressBar');
            return null;
        }
    };
    // 32. Rating Component
    $.GSCore.components.GSRating = {
        // Base Configuration
        _baseConfig: {
            rtl: false,
            containerClass: 'g-rating',
            backwardClass: 'g-rating-backward',
            forwardClass: 'g-rating-forward',
            spacing: 0
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            if (!collection || !collection.length) return;
            config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
            var self = this;
            return collection.each(function (i, el) {
                var $this = $(el);
                config = $.extend(true, {}, config, $this.data());
                if (!$this.data('rating-instance')) {
                    $this.data('rating-instance', new Rating($this, $this.data('rating'), config));
                    self._pageCollection = self._pageCollection.add($this);
                }
            });
        }
    };

    function Rating(element, value, config) {
        this.value = value;
        this.element = element;
        this.config = config;
        this.init();
    }

    Rating.prototype.init = function () {
        var self = this;
        this.container = $('<div></div>', {
            class: self.config.containerClass,
            style: 'display: inline-block; position: relative; z-index: 1; white-space: nowrap;'
        });
        this.forward = $('<div></div>', {
            class: self.config.forwardClass,
            style: $('html[dir="rtl"]').length ? 'position: absolute; right: 0; top: 0; height: 100%; overflow: hidden;' : 'position: absolute; left: 0; top: 0; height: 100%; overflow: hidden;'
        });
        this.backward = $('<div></div>', {
            class: self.config.backwardClass,
            style: 'position: relative; z-index: 1;'
        });
        for (var i = 0; i < 5; i++) {
            var starEmpty = $('<i></i>', {
                    class: self.element.data('backward-icons-classes') ? self.element.data('backward-icons-classes') : 'fa fa-star-o'
                }),
                starFilled = $('<i></i>', {
                    class: self.element.data('forward-icons-classes') ? self.element.data('forward-icons-classes') : 'fa fa-star'
                });
            this.forward.append(starFilled);
            this.backward.append(starEmpty);
        }
        this.container.append(this.forward);
        this.container.append(this.backward);
        this.element.append(this.container);
        this.forward.css('width', this.value / 5 * 100 + '%');
        this.makeSpacing();
    };
    Rating.prototype.makeSpacing = function () {
        var self = this;
        this.forward.children().add(this.backward.children()).css({
            'margin-left': self.config.spacing,
            'margin-right': self.config.spacing
        });
        this.container.css({
            'margin-left': self.config.spacing * -1,
            'margin-right': self.config.spacing * -1
        });
    };
    // 33. GSScrollNav Component
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

    function GSScrollNav(element, config) {

        this.element = element;

        this.config = config;

        this._items = $();

        this._makeItems();

        this._bindEvents();
    }

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
    GSScrollNav.prototype.unhighlight = function () {

        this._items.each(function (i, el) {
            $(el).data('HSScrollNavSection').unhighlight();
        });

    };

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
    GSScrollNavSection.prototype.changeHash = function () {
        this.section.attr('id', '');
        window.location.hash = this.element.attr('href');
        this.section.attr('id', this.element.attr('href').slice(1));
    };
    GSScrollNavSection.prototype.highlight = function () {
        var parent = this.element.parent('li');
        if (parent.length) parent.addClass(this.config.activeItemClass);
    };
    GSScrollNavSection.prototype.unhighlight = function () {
        var parent = this.element.parent('li');
        if (parent.length) parent.removeClass(this.config.activeItemClass);
    };
    // 34. GSScrollBar Component
    $.GSCore.components.GSScrollBar = {
        // Base Configuration
        _baseConfig: {
            scrollInertia: 150,
            theme: 'minimal-dark'
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            if (!collection || !collection.length) {
                return;
            }
            var self = this;
            config = config && $.isPlainObject(config) ? $.extend(true, {}, config, this._baseConfig) : this._baseConfig;
            return collection.each(function (i, el) {
                var $this = $(el),
                    scrollBar,
                    scrollBarThumb,
                    itemConfig = $.extend(true, {}, config, $this.data());
                $this.mCustomScrollbar(itemConfig);
                scrollBar = $this.find('.mCSB_scrollTools');
                scrollBarThumb = $this.find('.mCSB_dragger_bar');
                if (scrollBar.length && $this.data('scroll-classes')) {
                    scrollBar.addClass($this.data('scroll-classes'));
                }
                if (scrollBarThumb.length && $this.data('scroll-thumb-classes')) {
                    scrollBarThumb.addClass($this.data('scroll-thumb-classes'));
                }
                self._pageCollection = self._pageCollection.add($this);
            });
        },
        // Destroy Function
        destroy: function (collection) {
            if (!collection && !collection.length) {
                return $();
            }
            var _self = this;
            return collection.each(function (i, el) {
                var $this = $(el);
                $this.mCustomScrollbar('destroy');
                _self._pageCollection = _self._pageCollection.not($this);
            });
        }
    };
    // 35. Select Component
    $.GSCore.components.GSSelect = {
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
            this.initSelect();
            return this.pageCollection;
        },
        // Select Function
        initSelect: function () {
            // Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    searchMaxSelections = $this.data('max-selections'),
                    setControlClasses = $this.data('control-classes'),
                    setOpenIcon = $this.data('open-icon'),
                    setCloseIcon = $this.data('close-icon'),
                    setRtl = Boolean($this.data('rtl'));
                $this.chosen({
                    inherit_select_classes: true,
                    max_selected_options: searchMaxSelections ? searchMaxSelections : Infinity,
                    disable_search: true,
                    rtl: setRtl ? setRtl : false
                });
                if (setControlClasses) {
                    $this.next().find('.chosen-single div').addClass(setControlClasses);
                }
                if (setOpenIcon) {
                    $this.next().find('.chosen-single div b').append('<i class="' + setOpenIcon + '"></i>');

                    if (setCloseIcon) {
                        $this.next().find('.chosen-single div b').append('<i class="' + setCloseIcon + '"></i>');
                    }
                }
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 36. Slider Component
    $.GSCore.components.GSSlider = {
        // Base Configuration
        _baseConfig: {
            dateFormat: 'dd.mm.yy',
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>'
        },
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
                return;
            }
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initSlider();
            return this.pageCollection;
        },
        // Slider Function
        initSlider: function () {
            // Variables
            var $self = this,
                config = $self.config,
                collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    $resultContainer = $this.data('result-container'),
                    rangeBoolean = $this.data('range'),
                    minVal = $this.data('min'),
                    maxVal = $this.data('max'),
                    defaultVal = $this.data('default'),
                    step = $this.data('step');
                $this.slider({
                    range: rangeBoolean === 1 ? true : 'min',
                    min: minVal,
                    max: maxVal,
                    step: step ? step : 1,
                    values: rangeBoolean === 1 ? JSON.parse('[' + defaultVal + ']') : false,
                    value: defaultVal ? defaultVal : false,
                    slide: function (event, ui) {
                        if (rangeBoolean === 1) {
                            $('#' + $resultContainer).text(ui.values[0] + ' - ' + ui.values[1]);
                        } else {
                            $('#' + $resultContainer).text(ui.value);
                        }
                    }
                });
                if (rangeBoolean === 1) {
                    $('#' + $resultContainer).text($this.slider('values', 0) + ' - ' + $this.slider('values', 1));
                }
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 37. Smart Menu Component
    $.GSCore.components.GSSmartMenu = {
        // Base Configuration
        _baseConfig: {
            fixMoment: 300,
            togglerSelector: '.u-smart-nav__toggler',
            navbarSelector: '.navbar',
            menuToggleClass: 'u-smart-nav--opened',
            menuVisibleClass: 'u-smart-nav--shown',
            afterOpen: function () {
            },
            afterClose: function () {
            }
        },
        // Page Collection
        _pageCollection: $(),
        // Init Function
        init: function (collection, config) {
            if (!collection || !collection.length) {
                return $();
            }
            var self = this;
            config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
            if (!this.eventInitalized) {
                $(window).on('scroll.HSSmartMenu', function () {
                    if ($(document).height() > $(window).height()) {
                        var $w = $(this);
                        self._pageCollection.each(function (i, el) {
                            var $this = $(el),
                                SmartMenu = $this.data('HSSmartMenu');
                            if (!SmartMenu) {
                                return;
                            }
                            if ($w.scrollTop() >= SmartMenu.getFixMoment() && SmartMenu.isDefaultState()) {
                                SmartMenu.show();
                            } else if ($w.scrollTop() < SmartMenu.getFixMoment() && !SmartMenu.isDefaultState()) {
                                SmartMenu.hide();
                            }
                        });
                    }
                });
                this.eventInitalized = true;
            }
            collection.each(function (i, el) {
                var $this = $(el);
                if ($this.data('GSSmartMenu')) {
                    return;
                }
                $this.data('GSSmartMenu', new HSSmartMenu($this, $.extend(config, $this.data())));
                self._pageCollection = self._pageCollection.add($this);
            });
            $(window).trigger('scroll.GSSmartMenu');
            if ($(document).height() <= $(window).height()) {
                self._pageCollection.each(function (i, el) {
                    var $this = $(el),
                        SmartMenu = $this.data('GSSmartMenu');
                    if (!SmartMenu) {
                        return;
                    }
                    if (SmartMenu.isDefaultState()) SmartMenu.show();
                });
            }
            $(document).on('keyup.GSSmartMenu', function (e) {
                if (e.keyCode !== 27) {
                    return false;
                }
                self._pageCollection.each(function (i, el) {
                    var $this = $(el),
                        SmartMenu = $this.data('GSSmartMenu');
                    if (SmartMenu.toggler.length && SmartMenu.toggler.find('.is-active').length) {
                        SmartMenu.toggler.find('.is-active').removeClass('is-active');
                    }
                    SmartMenu.hideMenu();
                });
            });
            return collection;
        }
    };

    function GSSmartMenu(element, config) {

        if (!element || !element.length || !config || !$.isPlainObject(config)) {
            return;
        }
        var self = this;
        this.element = element;
        this.config = config;
        this.defaultState = true;
        this.toggler = this.element.find(this.config.togglerSelector);
        if (this.toggler.length) {
            this.toggler.on('click.GSSmartMenu', function (e) {

                if (!self.element.hasClass(self.config.menuToggleClass)) {
                    self.openMenu();
                } else {
                    self.hideMenu();
                }
                e.preventDefault();
            });
        }
    }

    GSSmartMenu.prototype.openMenu = function () {
        var toggler = this.toggler ? this.toggler.find('.is-active') : $();
        this.element.addClass(this.config.menuToggleClass);
        if (this.toggler && toggler.length && !toggler.hasClass('is-active')) toggler.addClass('is-active');

    };
    GSSmartMenu.prototype.hideMenu = function () {
        this.element.removeClass(this.config.menuToggleClass);
    };
    GSSmartMenu.prototype.show = function () {

        this.element.addClass(this.config.menuVisibleClass);

        this.defaultState = false;
        return this;
    };
    GSSmartMenu.prototype.hide = function () {

        this.element.removeClass(this.config.menuVisibleClass);

        this.defaultState = true;
        return this;
    };
    GSSmartMenu.prototype.isDefaultState = function () {
        return this.defaultState;
    };
    GSSmartMenu.prototype.getFixMoment = function () {
        return this.config.fixMoment;
    };
    // 38. Step Form Component
    $.GSCore.components.GSStepForm = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
                return;
            }
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initStepForm();
            return this.pageCollection;
        },
        // Init Step Form Function
        initStepForm: function () {
            // Variables
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el),
                    progressID = $this.data('progress-id'),
                    $progressItems = $(progressID).find('> *'),
                    stepsID = $this.data('steps-id'),
                    $stepsItems = $(stepsID).find('> *'),
                    $stepsActiveItem = $(stepsID).find('> .active');
                $stepsItems.not('.active').hide();
                $progressItems.eq($stepsActiveItem.index()).addClass('active');
                $('[data-next-step]').on('click', function (e) {
                    if ((!$(el).valid())) {
                        return false;
                    }
                    e.preventDefault();
                    var $this = $(this), nextID = $this.data('next-step');
                    $progressItems.removeClass('active');
                    $progressItems.eq($(nextID).index() - 1).addClass('g-checked');
                    $progressItems.eq($(nextID).index()).addClass('active');
                    $stepsItems.hide().removeClass('active');
                    $(nextID).fadeIn(400).addClass('active');
                });
                // Actions
                collection = collection.add($this);
            });
        }
    };
    // 39. Sticky Blocks Component
    $.GSCore.components.GSStickyBlock = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
                return;
            }
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initStickyBlock();
            return this.pageCollection;
        },
        // Init Sticky Blocks Function
        initStickyBlock: function () {
            // Variables
            var $self = this, config = $self.config, collection = $self.pageCollection, windW = $(window).width();
            this.collection.each(function (i, el) {
                // Variables
                var $stickyBlock = $(el),
                    isResponsive = Boolean($stickyBlock.data('responsive')),
                    stickyBlockClasses = $stickyBlock.attr('class').replace($self.config.itemSelector.substring(1), ''),
                    stickyBlockH = $stickyBlock.outerHeight(),
                    stickyBlockW = $stickyBlock.outerWidth(),
                    stickyBlockParentW = $stickyBlock.parent().width(),
                    stickyBlockOffsetTop = $stickyBlock.offset().top,
                    stickyBlockOffsetLeft = $stickyBlock.offset().left,
                    startPoint = $.isNumeric($stickyBlock.data('start-point')) ? $stickyBlock.data('start-point') : $($stickyBlock.data('start-point')).offset().top,
                    endPoint = $.isNumeric($stickyBlock.data('end-point')) ? $stickyBlock.data('end-point') : $($stickyBlock.data('end-point')).offset().top,
                    hasStickyHeader = $stickyBlock.data('has-sticky-header');
                // Break Function
                if (!$stickyBlock.length) {
                    return;
                }
                if (stickyBlockH > (endPoint - startPoint)) {
                    return;
                }
                $self.resolutionCheck($stickyBlock);
                if ($stickyBlock.hasClass('g-sticky-block--sm') && windW <= 576) {
                    $stickyBlock.addClass('die-sticky');
                    $self.resolutionCheck($stickyBlock);
                } else if ($stickyBlock.hasClass('g-sticky-block--md') && windW <= 768) {
                    $stickyBlock.addClass('die-sticky');
                    $self.resolutionCheck($stickyBlock);
                } else if ($stickyBlock.hasClass('g-sticky-block--lg') && windW <= 992) {
                    $stickyBlock.addClass('die-sticky');
                    $self.resolutionCheck($stickyBlock);
                } else if ($stickyBlock.hasClass('g-sticky-block--xl') && windW <= 1200) {
                    $stickyBlock.addClass('die-sticky');
                    $self.resolutionCheck($stickyBlock);
                } else {
                    $stickyBlock.removeClass('die-sticky');
                }
                $(window).on('resize', function () {
                    var windW = $(window).width();
                    if ($stickyBlock.hasClass('g-sticky-block--sm') && windW <= 576) {
                        $stickyBlock.addClass('die-sticky');
                        $self.resolutionCheck($stickyBlock);
                    } else if ($stickyBlock.hasClass('g-sticky-block--md') && windW <= 768) {
                        $stickyBlock.addClass('die-sticky');
                        $self.resolutionCheck($stickyBlock);
                    } else if ($stickyBlock.hasClass('g-sticky-block--lg') && windW <= 992) {
                        $stickyBlock.addClass('die-sticky');
                        $self.resolutionCheck($stickyBlock);
                    } else if ($stickyBlock.hasClass('g-sticky-block--xl') && windW <= 1200) {
                        $stickyBlock.addClass('die-sticky');
                        $self.resolutionCheck($stickyBlock);
                    } else {
                        $stickyBlock
                            .removeClass('die-sticky')
                            .css({
                                'top': '',
                                'left': ''
                            });
                    }
                    if (isResponsive === true) {
                        setTimeout(function () {
                            var offsetTop = $(this).scrollTop(),
                                headerH = $('header').outerHeight();
                            stickyBlockH = $stickyBlock.outerHeight(),
                                stickyBlockParentW = $stickyBlock.parent().width(),
                                stickyBlockOffsetTop = $stickyBlock.parent().offset().top,
                                stickyBlockOffsetLeft = $stickyBlock.parent().offset().left,
                                startPoint = $.isNumeric($stickyBlock.data('start-point')) ? $stickyBlock.data('start-point') : $($stickyBlock.data('start-point')).offset().top,
                                endPoint = $.isNumeric($stickyBlock.data('end-point')) ? $stickyBlock.data('end-point') : $($stickyBlock.data('end-point')).offset().top;
                            if (hasStickyHeader === true) {
                                $stickyBlock
                                    .not('.die-sticky')
                                    .css({
                                        'top': offsetTop + headerH >= (endPoint - stickyBlockH) ? endPoint - stickyBlockH - stickyBlockOffsetTop : headerH,
                                        'left': stickyBlockOffsetLeft,
                                        'width': stickyBlockParentW
                                    });
                            } else {
                                $stickyBlock
                                    .not('.die-sticky')
                                    .css({
                                        'top': offsetTop >= (endPoint - stickyBlockH) ? endPoint - stickyBlockH - stickyBlockOffsetTop : 0,
                                        'left': stickyBlockOffsetLeft,
                                        'width': stickyBlockParentW
                                    });
                            }
                        }, 400);
                    }
                });

                if (isResponsive === false) {
                    // Add "shadow" element
                    var offsetTop = $(this).scrollTop();
                    $self.addShadow($stickyBlock, offsetTop, stickyBlockH, stickyBlockW, i, stickyBlockClasses, startPoint, endPoint, hasStickyHeader);
                    $self.addSticky($stickyBlock, offsetTop, stickyBlockH, stickyBlockW, stickyBlockOffsetLeft, startPoint, endPoint, hasStickyHeader);
                } else {
                    // Add Responsive Sticky State
                    var offsetTop = $(this).scrollTop();
                    $self.addSticky($stickyBlock, offsetTop, 'auto', stickyBlockParentW, stickyBlockOffsetLeft, startPoint, endPoint, hasStickyHeader);
                }
                $(window).on('scroll', function () {
                    var offsetTop = $(this).scrollTop();
                    if (isResponsive === false) {
                        $self.addShadow($stickyBlock, offsetTop, stickyBlockH, stickyBlockW, i, stickyBlockClasses, startPoint, endPoint, hasStickyHeader);
                        $self.addSticky($stickyBlock, offsetTop, stickyBlockH, stickyBlockW, stickyBlockOffsetLeft, startPoint, endPoint, hasStickyHeader);
                    } else {
                        $self.addSticky($stickyBlock, offsetTop, 'auto', stickyBlockParentW, stickyBlockOffsetLeft, startPoint, endPoint, hasStickyHeader);
                    }
                    // Remove sticky state
                    $self.removeSticky($stickyBlock, offsetTop, startPoint, hasStickyHeader);

                    if (endPoint) {
                        // Add Absolute State
                        $self.addAbsolute($stickyBlock, stickyBlockH, i, stickyBlockOffsetTop, offsetTop, endPoint, hasStickyHeader);
                    }
                });
                $(window).trigger('scroll');
                collection = collection.add($stickyBlock);
            });
        },
        // Add Sticky
        addSticky: function (target, offsetTop, targetH, targetW, offsetLeft, startPoint, endPoint, hasStickyHeader) {
            if (hasStickyHeader === true) {
                var headerH = $('header').outerHeight();
                if (offsetTop + headerH >= startPoint && offsetTop + headerH < endPoint) {
                    target
                        .not('.die-sticky')
                        .removeClass('g-pos-rel')
                        .css({
                            'top': '',
                            'left': '',
                            'width': '',
                            'height': ''
                        })
                        .addClass('g-pos-fix g-m-reset')
                        .css({
                            'top': headerH,
                            'left': offsetLeft,
                            'width': targetW,
                            'height': targetH
                        });
                }
            } else {
                if (offsetTop >= startPoint && offsetTop < endPoint) {
                    target
                        .not('.die-sticky')
                        .removeClass('g-pos-rel')
                        .css({
                            'top': '',
                            'left': '',
                            'width': '',
                            'height': ''
                        })
                        .addClass('g-pos-fix g-m-reset')
                        .css({
                            'top': 0,
                            'left': offsetLeft,
                            'width': targetW,
                            'height': targetH
                        });
                }
            }
        },
        // Remove Sticky
        removeSticky: function (target, offsetTop, startPoint, hasStickyHeader) {
            if (hasStickyHeader === true) {
                var headerH = $('header').outerHeight();
                if (offsetTop + headerH <= startPoint) {
                    target
                        .not('.die-sticky')
                        .removeClass('g-pos-fix g-m-reset')
                        .css({
                            'left': ''
                        });
                }
            } else {
                if (offsetTop <= startPoint) {
                    target
                        .not('.die-sticky')
                        .removeClass('g-pos-fix g-m-reset')
                        .css({
                            'left': ''
                        });
                }
            }
        },
        // Add Absolute
        addAbsolute: function (target, targetH, targetI, targetOffsetTop, offsetTop, endPoint, hasStickyHeader) {
            if (target.hasClass('g-pos-rel')) {
                return;
            }
            if (hasStickyHeader === true) {
                var headerH = $('header').outerHeight();
                if (offsetTop + headerH >= endPoint - targetH) {
                    target
                        .not('.die-sticky')
                        .removeClass('g-pos-fix g-m-reset')
                        .addClass('g-pos-rel')
                        .css({
                            'top': endPoint - targetH - targetOffsetTop,
                            'left': ''
                        });
                }
            } else {
                if (offsetTop >= endPoint - targetH) {
                    target
                        .not('.die-sticky')
                        .removeClass('g-pos-fix g-m-reset')
                        .addClass('g-pos-rel')
                        .css({
                            'top': endPoint - targetH - targetOffsetTop,
                            'left': ''
                        });
                }
            }
        },
        // Add Shadow
        addShadow: function (target, offsetTop, targetH, targetW, targetI, targetClasses, startPoint, endPoint, hasStickyHeader) {
            if (hasStickyHeader === true) {
                var headerH = $('header').outerHeight();
                if (offsetTop + headerH > startPoint && offsetTop + headerH < (endPoint - targetH)) {
                    if ($('#shadow' + targetI).length) return;
                    target
                        .not('.die-sticky')
                        .before('<div id="shadow' + targetI + '" class="' + targetClasses + '" style="height: ' + targetH + 'px; width: ' + targetW + 'px"></div>');
                } else {
                    if (!$('#shadow' + targetI).length) return;
                    $('#shadow' + targetI).remove();
                }
            } else {
                if (offsetTop > startPoint && offsetTop < (endPoint - targetH)) {
                    if ($('#shadow' + targetI).length) return;
                    target
                        .not('.die-sticky')
                        .before('<div id="shadow' + targetI + '" class="' + targetClasses + '" style="height: ' + targetH + 'px; width: ' + targetW + 'px"></div>');
                } else {
                    if (!$('#shadow' + targetI).length) return;
                    $('#shadow' + targetI).remove();
                }
            }
        },
        // Resolution Check
        resolutionCheck: function (target) {
            target
                .removeClass('g-pos-fix g-m-reset')
                .css({
                    'top': '',
                    'left': '',
                    'width': '',
                    'height': ''
                });
        }
    };
    // 40. Tabs Component
    $.GSCore.components.GSTabs = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
                return;
            }
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initTabs();
            return this.pageCollection;
        },
        // Init Tabs Function
        initTabs: function () {
            // Variables
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var windW = $(window).width(),
                    // Tabs
                    $tabs = $(el),
                    $tabsItem = $tabs.find('.nav-item'),
                    tabsType = $tabs.data('tabs-mobile-type'), //[slide-up-down], [accordion], [hide-extra-items]
                    controlClasses = $tabs.data('btn-classes'),
                    context = $tabs.parent(),
                    // Tabs Content
                    $tabsContent = $('#' + $tabs.data('target')),
                    $tabsContentItem = $tabsContent.find('.tab-pane');
                if (windW < 767) {
                    $('body').on('click', function () {
                        if (tabsType) {
                            $tabs.slideUp(200);
                        } else {
                            $tabs.find('.nav-inner').slideUp(200);
                        }
                    });
                } else {
                    $('body').off('click');
                }
                if (windW > 767 && tabsType) {
                    $tabs.removeAttr('style');
                    $tabsContentItem.removeAttr('style');
                    context.off('click', '.js-tabs-mobile-control');
                    context.off('click', '[role="tab"]');
                    if (tabsType === 'accordion') {
                        $tabsContent.find('.js-tabs-mobile-control').remove();
                    } else {
                        context.find('.js-tabs-mobile-control').remove();
                    }
                    return;
                }
                if (windW < 768 && tabsType === 'accordion') {
                    $self.accordionEffect($tabsContent, $tabsItem, $tabsContentItem, controlClasses);
                } else if (windW < 768 && tabsType === 'slide-up-down') {
                    $self.slideUpDownEffect(context, $tabs, controlClasses);
                }
                // Actions
                collection = collection.add($tabs);
            });
        },
        slideUpDownEffect: function (context, menu, btnClasses) {
            if (context.find('.js-tabs-mobile-control').length) {
                return;
            }
            // Create Control
            var activeItemHTML = menu.find('.active').html();
            $(menu).before('<a class="js-tabs-mobile-control ' + btnClasses + '" href="#">' + activeItemHTML + '</a>');
            //  Click Control
            context.on('click', '.js-tabs-mobile-control', function (e) {
                e.stopPropagation();
                e.preventDefault();
                $(menu).slideToggle(200);
            });
            context.on('click', '[role="tab"]', function (e) {
                e.preventDefault();
                var thisHTML = $(this).html(), $targetControl = $(this).closest('ul').prev('.js-tabs-mobile-control');
                $targetControl.html(thisHTML);
                $(menu).slideUp(200);
            });
        },
        accordionEffect: function (context, menuItem, menu, btnClasses) {
            if (context.find('.js-tabs-mobile-control').length) {
                return;
            }
            // Create Control
            $(menu).before('<a class="js-tabs-mobile-control ' + btnClasses + '" href="#"></a>');
            menuItem.each(function () {
                var thisIndex = $(this).index(), thisHTML = $(this).find('[role="tab"]').html();
                if ($(this).find('[role="tab"]').hasClass('active')) {
                    $(menu[thisIndex]).prev().addClass('active');
                }
                $(menu[thisIndex]).prev().html(thisHTML);
            });
            // Click Control
            context.on('click', '.js-tabs-mobile-control', function (e) {
                e.preventDefault();
                if ($(this).hasClass('active')) {
                    return;
                }
                var contextID = context.attr('id');
                context.find('.js-tabs-mobile-control').removeClass('active');
                $('[data-target="' + contextID + '"]').find('.nav-link').removeClass('active');
                var $target = $(this).next(), targetID = $target.attr('id');
                if ($target.hasClass('fade')) {
                    $(this).addClass('active');
                    $('[href="#' + targetID + '"]').addClass('active');
                    $(menu)
                        .slideUp(200);
                    $target
                        .slideDown(200, function () {
                            context.find('[role="tabpanel"]').removeClass('show active');
                            $target.addClass('show active');
                        });
                } else {
                    $(this).addClass('active');
                    $(menu).slideUp(200);
                    $target.slideDown(200);
                }
            });
        }
    };
    // 41. Validation Component
    $.GSCore.components.GSValidation = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
                return;
            }
            this.config = config && $.isPlainObject(config) ?
                $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initValidation(this.config);
            return this.pageCollection;
        },
        // Init Validation Function
        initValidation: function (config) {
            // Variables
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                // Variables
                var $this = $(el);
                if ($this.hasClass('js-step-form')) {
                    $.validator.setDefaults({
                        ignore: ':hidden:not(.active select)'
                    });
                } else {
                    $.validator.setDefaults({
                        ignore: ':hidden:not(select)'
                    });
                }
                $.validator.setDefaults({
                    errorPlacement: config ? false : $self.errorPlacement,
                    highlight: $self.highlight,
                    unhighlight: $self.unHighlight
                });
                $this.validate(config);
                $('select').change(function () {
                    $(this).valid();
                });
                // Actions
                collection = collection.add($this);
            });
        },
        // Error Placement
        errorPlacement: function (error, element) {
            var $this = $(element), errorMsgClasses = $this.data('msg-classes');
            error.addClass(errorMsgClasses);
            error.appendTo(element.parents('.form-group'));
        },
        // Highlight
        highlight: function (element) {
            var $this = $(element), errorClass = $this.data('error-class');
            $this.parents('.form-group').addClass(errorClass);
        },
        // unHighlight
        unHighlight: function (element) {
            var $this = $(element), errorClass = $this.data('error-class'), successClass = $this.data('success-class');
            $this.parents('.form-group').removeClass(errorClass).addClass(successClass);
        }
    };
    // 42. Audio & Video Component
    $.GSCore.components.GSVideoAudio = {
        // Base Configuration
        _baseConfig: {},
        // Page Collection
        pageCollection: $(),
        // Init Function
        init: function (selector, config) {
            this.collection = selector && $(selector).length ? $(selector) : $();
            if (!$(selector).length) {
                return;
            }
            this.config = config && $.isPlainObject(config) ? $.extend({}, this._baseConfig, config) : this._baseConfig;
            this.config.itemSelector = selector;
            this.initVideoAudio();
            return this.pageCollection;
        },
        // Init Audion & Video Function
        initVideoAudio: function () {
            var $self = this, collection = $self.pageCollection;
            // Actions
            this.collection.each(function (i, el) {
                var $videoAudio = el;
                // Add object to collection
                collection = collection.add($videoAudio);
            });
        }
    };
    if (window.location.href.indexOf('submitted=true') !== -1) {
        $('.submitted').show();
    }
})(jQuery);

