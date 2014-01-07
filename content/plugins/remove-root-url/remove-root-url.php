<?php
/**
 * ============================================================================
 * Remove Root URL
 * ============================================================================
 *
 * @package     WordPress
 * @subpackage  Remove Root URL
 * @author      Neil Sweeney <neil@wolfiezero.com>
 *
 * ----------------------------------------------------------------------------
 *
 * @wordpress-plugin
 * Plugin Name:  Remove Root URL
 * Description:  Removes the local domain from URLs
 * Version:      1.0.0
 * Author:       Neil Sweeney <neil@wolfiezero.com>
 * Author URI:   http://wolfiezero.com/
 * License:      GPLv2 or later
 * License URI:  http://www.gnu.org/licenses/gpl-2.0.html
 */


// ----------------------------------------------------------------------------
// Accessed Directly
// ----------------------------------------------------------------------------

if( !defined( 'WPINC' ) ) die;


// ----------------------------------------------------------------------------
// Requires
// ----------------------------------------------------------------------------

require 'class-remove-root-url.php';


// ----------------------------------------------------------------------------
// Enqueue Scripts
// ----------------------------------------------------------------------------

add_action( 'pre_get_posts', array( 'RemoveRootURL', 'relative_attachment_urls' ) );

if( !is_admin() && !in_array( $GLOBALS['pagenow'], array( 'wp-login.php', 'wp-register.php' ) ) ) {

    add_filter( 'bloginfo_url', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'theme_root_uri', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'stylesheet_directory_uri', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'template_directory_uri', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'script_loader_src', array( 'RemoveRootURL', 'fix_duplicate_subfolder_urls' ) );
    add_filter( 'style_loader_src', array( 'RemoveRootURL', 'fix_duplicate_subfolder_urls' ) );
    add_filter( 'plugins_url', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'the_permalink', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'wp_list_pages', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'wp_list_categories', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'wp_nav_menu', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'the_content_more_link', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'the_tags', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'get_pagenum_link', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'get_comment_link', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'month_link', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'day_link', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'year_link', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'tag_link', array( 'RemoveRootURL', 'relative_url' ) );
    add_filter( 'the_author_posts_link', array( 'RemoveRootURL', 'relative_url' ) );

}