/*! WolfieZero.com - v1.0.0 - 2014-01-08 *//*global jQuery */
/*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
!function($) {
    $.fn.fitText = function(kompressor, options) {
        // Setup options
        var compressor = kompressor || 1, settings = $.extend({
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY
        }, options);
        return this.each(function() {
            // Store the object
            var $this = $(this), resizer = function() {
                $this.css("font-size", Math.max(Math.min($this.width() / (10 * compressor), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };
            // Call once to set.
            resizer(), // Call on resize. Opera debounces their resize by default.
            $(window).on("resize.fittext orientationchange.fittext", resizer);
        });
    };
}(jQuery), /*! WolfieZero.com - v1.0.0 - 2014-01-08 */
/*global jQuery */
/*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
!function($) {
    $.fn.fitText = function(kompressor, options) {
        // Setup options
        var compressor = kompressor || 1, settings = $.extend({
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY
        }, options);
        return this.each(function() {
            // Store the object
            var $this = $(this), resizer = function() {
                $this.css("font-size", Math.max(Math.min($this.width() / (10 * compressor), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };
            // Call once to set.
            resizer(), // Call on resize. Opera debounces their resize by default.
            $(window).on("resize.fittext orientationchange.fittext", resizer);
        });
    };
}(jQuery), /*! WolfieZero.com - v1.0.0 - 2014-01-08 */
/*global jQuery */
/*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
!function($) {
    $.fn.fitText = function(kompressor, options) {
        // Setup options
        var compressor = kompressor || 1, settings = $.extend({
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY
        }, options);
        return this.each(function() {
            // Store the object
            var $this = $(this), resizer = function() {
                $this.css("font-size", Math.max(Math.min($this.width() / (10 * compressor), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };
            // Call once to set.
            resizer(), // Call on resize. Opera debounces their resize by default.
            $(window).on("resize.fittext orientationchange.fittext", resizer);
        });
    };
}(jQuery), /*! WolfieZero.com - v1.0.0 - 2014-01-08 */
/*global jQuery */
/*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
!function($) {
    $.fn.fitText = function(kompressor, options) {
        // Setup options
        var compressor = kompressor || 1, settings = $.extend({
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY
        }, options);
        return this.each(function() {
            // Store the object
            var $this = $(this), resizer = function() {
                $this.css("font-size", Math.max(Math.min($this.width() / (10 * compressor), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };
            // Call once to set.
            resizer(), // Call on resize. Opera debounces their resize by default.
            $(window).on("resize.fittext orientationchange.fittext", resizer);
        });
    };
}(jQuery), /*! WolfieZero.com - v1.0.0 - 2014-01-08 */
/*global jQuery */
/*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
!function($) {
    $.fn.fitText = function(kompressor, options) {
        // Setup options
        var compressor = kompressor || 1, settings = $.extend({
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY
        }, options);
        return this.each(function() {
            // Store the object
            var $this = $(this), resizer = function() {
                $this.css("font-size", Math.max(Math.min($this.width() / (10 * compressor), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };
            // Call once to set.
            resizer(), // Call on resize. Opera debounces their resize by default.
            $(window).on("resize.fittext orientationchange.fittext", resizer);
        });
    };
}(jQuery), /*! WolfieZero.com - v1.0.0 - 2014-01-08 */
/*global jQuery */
/*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
!function($) {
    $.fn.fitText = function(kompressor, options) {
        // Setup options
        var compressor = kompressor || 1, settings = $.extend({
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY
        }, options);
        return this.each(function() {
            // Store the object
            var $this = $(this), resizer = function() {
                $this.css("font-size", Math.max(Math.min($this.width() / (10 * compressor), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };
            // Call once to set.
            resizer(), // Call on resize. Opera debounces their resize by default.
            $(window).on("resize.fittext orientationchange.fittext", resizer);
        });
    };
}(jQuery);

var s, WolfieZero = {
    settings: {},
    init: function() {
        s = this.settings, this.fitText();
    },
    fitText: function() {
        $(".site__title--home").fitText();
    }
};

$(document).ready(function() {
    WolfieZero.init();
});