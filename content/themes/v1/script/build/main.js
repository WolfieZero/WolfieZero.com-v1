/*! WolfieZero.com - v1.1.0 - 2014-02-09 *//*!
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
"use strict";!function(a){a.fn.fitText=function(b,c){var d=b||1,e=a.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},c);return this.each(function(){var b=a(this),c=function(){b.css("font-size",Math.max(Math.min(b.width()/(10*d),parseFloat(e.maxFontSize)),parseFloat(e.minFontSize)))};c(),a(window).on("resize.fittext orientationchange.fittext",c)})}}(jQuery);var s,WolfieZero={settings:{},init:function(){s=this.settings,this.fitText()},fitText:function(){$(".site__title--home").fitText(.8)}};$(document).ready(function(){WolfieZero.init()});