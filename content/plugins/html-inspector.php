<?php
/**
 * ============================================================================
 * HTML Inspector
 * ============================================================================
 *
 * @package     WordPress
 * @subpackage  HTML Inspector
 * @author      Neil Sweeney <neil@wolfiezero.com>
 *
 * ----------------------------------------------------------------------------
 *
 * @wordpress-plugin
 * Plugin Name:  HTML Inspector
 * Description:  See <a href="https://github.com/philipwalton/html-inspector">https://github.com/philipwalton/html-inspector</a>
 * Version:      1.0.0
 * Author:       Neil Sweeney <neil@wolfiezero.com>
 * Author URI:   http://wolfiezero.com/
 * License:      GPLv2 or later
 * License URI:  http://www.gnu.org/licenses/gpl-2.0.html
 */


// ----------------------------------------------------------------------------
// Accessed Directly
// ----------------------------------------------------------------------------

if ( !defined( 'WPINC' ) ) die;


// ----------------------------------------------------------------------------
// Enqueue Script
// ----------------------------------------------------------------------------

add_action( 'wp_enqueue_scripts', function() {
    if( defined( 'WP_DEBUG' ) && WP_DEBUG === true ) {
        // we only allow access if WP_DEBUG is on
        wp_enqueue_script(
            'HTML Inspector',
            'http://cdnjs.cloudflare.com/ajax/libs/html-inspector/0.7.0/html-inspector.js',
            array(),
            '1.0.0',
            true
        );
    }
} );