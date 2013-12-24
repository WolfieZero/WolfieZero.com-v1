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
    wp_enqueue_style( 'main', get_template_directory_uri() . '/style/css/main.css' );

    //wp_enqueue_style( 'foundation', get_template_directory_uri() . '/bower_components/foundation/js/foundation.min.js' );

    //wp_enqueue_style( 'jquery', get_template_directory_uri() . '/bower_components/jquery/jquery.min.js' );

    //wp_enqueue_style( 'app', get_template_directory_uri() . '/js/app.js' );

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
