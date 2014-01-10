/*global $*/
"use strict";

// ============================================================================
// Main JavaScript
// ============================================================================


var s,

WolfieZero = {

    settings: {},

    init: function() {
        s = this.settings;
        this.fitText();
    },

    fitText: function() {
        $( ".site__title--home" ).fitText( 0.8 );
    }

};


// ----------------------------------------------------------------------------
// Load when ready
// ----------------------------------------------------------------------------

$(document).ready( function () {
    WolfieZero.init();
} );