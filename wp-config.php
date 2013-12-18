<?php

// ============================================================================
// WP Configs
// ============================================================================


// ----------------------------------------------------------------------------
// Load database info and environment parameters (if wp-local-config.php is
// found then we load those settings instead)
// ----------------------------------------------------------------------------

if ( file_exists( dirname( __FILE__ ) . '/wp-local-config.php' ) ) {
    define( 'WP_LOCAL_DEV', true );
    include dirname( __FILE__ ) . '/wp-local-config.php';
} else {

    // ------------------------------------------------------------------------
    // Database settings
    // ------------------------------------------------------------------------

    define( 'DB_NAME', '' );
    define( 'DB_USER', '' );
    define( 'DB_PASSWORD', '' );
    define( 'DB_HOST', '' );
    define( 'DB_CHARSET', 'utf8' );
    define( 'DB_COLLATE', '' );


    // ------------------------------------------------------------------------
    // Site settings
    // ------------------------------------------------------------------------

    define( 'WP_HOST', $_SERVER['HTTP_HOST'] );
    define( 'WP_LOCAL_DEV', false );


    // ------------------------------------------------------------------------
    // Debug settings
    // ------------------------------------------------------------------------

    define( 'SAVEQUERIES', false );
    define( 'WP_DEBUG', false );
    ini_set( 'display_errors', 0 );


    // ------------------------------------------------------------------------
    // FTP credentals
    // ------------------------------------------------------------------------

    define( 'FTP_HOST', '' );
    define( 'FTP_USER', '' );
    define( 'FTP_PASS', '' );

}


// ----------------------------------------------------------------------------
// Custom directories
// ----------------------------------------------------------------------------

define( 'WP_SITEURL', 'http://' . WP_HOST . '/wp' );
define( 'WP_HOME',    'http://' . WP_HOST . '' );
define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/content' );
define( 'WP_CONTENT_URL', 'http://' . WP_HOST . '/content' );


// ----------------------------------------------------------------------------
// Authentication Unique Keys and Salts
// Grab from: https://api.wordpress.org/secret-key/1.1/salt
// ----------------------------------------------------------------------------
/*
define( 'AUTH_KEY',         'put your unique phrase here' );
define( 'SECURE_AUTH_KEY',  'put your unique phrase here' );
define( 'LOGGED_IN_KEY',    'put your unique phrase here' );
define( 'NONCE_KEY',        'put your unique phrase here' );
define( 'AUTH_SALT',        'put your unique phrase here' );
define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
define( 'LOGGED_IN_SALT',   'put your unique phrase here' );
define( 'NONCE_SALT',       'put your unique phrase here' );
*/

// ----------------------------------------------------------------------------
// Table prefix
// Change this if you have multiple installs in the same database
// ----------------------------------------------------------------------------

$table_prefix  = 'wp_';


// ----------------------------------------------------------------------------
// Language (default is `en_US`)
// ----------------------------------------------------------------------------

define( 'WPLANG', '' );


// ----------------------------------------------------------------------------
// Load Composer autoloader if it's available
// ----------------------------------------------------------------------------

if ( file_exists( __DIR__ . '/../content/vendor/autoload.php' ) ) {
    include __DIR__ . '/../content/vendor/autoload.php';
}


// ----------------------------------------------------------------------------
// Load Memcached config if we have one
// ----------------------------------------------------------------------------

if ( file_exists( dirname( __FILE__ ) . '/memcached.php' ) )
    $memcached_servers = include dirname( __FILE__ ) . '/memcached.php';


// ----------------------------------------------------------------------------
// Bootstrap WordPress
// ----------------------------------------------------------------------------

if ( !defined( 'ABSPATH' ) )
    define( 'ABSPATH', dirname( __FILE__ ) . '/' );

require_once ABSPATH . 'wp-settings.php';
