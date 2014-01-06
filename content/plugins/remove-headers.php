<?php
/**
 * ============================================================================
 * Remove Headers
 * ============================================================================
 *
 * @package     WordPress
 * @subpackage  Remove Headers
 * @author      Neil Sweeney <neil@wolfiezero.com>
 *
 * ----------------------------------------------------------------------------
 *
 * @wordpress-plugin
 * Plugin Name:  Remove Headers
 * Description:  Removes certain headers set by WordPress for security
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
// Headers to Remove
// ----------------------------------------------------------------------------

remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'index_rel_link' );
remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
remove_action( 'wp_head', 'noindex', 1 );

if( function_exists( 'header_remove' ) )
    header_remove( 'x-powered-by' );