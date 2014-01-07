<?php

// ============================================================================
// Functions File
// ============================================================================
// All functions that are essental to the design and not the site


// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------

add_action( 'wp_enqueue_scripts', 'enqueue_files' );
add_action( 'init', 'navigation' );


// ----------------------------------------------------------------------------
// Filters
// ----------------------------------------------------------------------------

add_filter( 'style_loader_src', 'remove_enqueued_ver', 10, 2 );
add_filter( 'script_loader_src', 'remove_enqueued_ver', 10, 2 );


// ----------------------------------------------------------------------------
// Functions
// ----------------------------------------------------------------------------


/**
 * Enqueues both style and script files used for the theme
 *
 * @return  null
 */
function enqueue_files() {

    // Mondernizr
    //wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/bower_components/modernizr/modernizr.js' );

    // Fonts
    wp_enqueue_style( 'google-fonts', 'http://fonts.googleapis.com/css?family=Ubuntu:300,400,700' );
    wp_enqueue_style( 'fontawesome', '//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css' );

    // Main Style
    wp_enqueue_style( 'main', get_latest_css_file() );

    // JavaScript
    //wp_enqueue_style( 'jquery', get_template_directory_uri() . '/bower_components/jquery/jquery.min.js' );

}


/**
 * Navigation for the theme
 *
 * @return  null
 */
function navigation() {

    register_nav_menus( array(
        'header' => 'Header'
    ) );

}


/**
 * Removes version numbers from enqued files (supresses query strings)
 *
 * @param   string  $src  Source URL
 *
 * @return  string
 */
function remove_enqueued_ver( $src ) {

    if( strpos( $src, '?ver=' ) || strpos( $src, '&ver=' ) )
        $src = remove_query_arg( 'ver', $src );

    return $src;

}


/**
 * Gets the latest CSS file or the main if dev
 *
 * @return  string
 */
function get_latest_css_file () {

    if( !WP_DEBUG ) {

        $path         = get_template_directory() . '/style/css-build/';
        $file         = '*.css';
        $pathtosearch = $path . $file;
        $dir          = glob( $pathtosearch );

        if( count( $dir ) > 0 ) {
            $css_file = end( explode( '/', end( $dir ) ) );
            return get_template_directory_uri() . '/style/css-build/' . $css_file;
        }

    }

    // if we are in dev or cannot find build file then use the dev file
    return get_template_directory_uri() . '/style/css-dev/main.css';

}