<?php

/**
 * @package     WolfieZero.com
 * @subpackage  Plugin: WolfieZero.com: Legacy
 * @author      Neil Sweeney <neil@wolfiezero.com>
 */
class RemoveRootURL {

    public static function relative_url($input) {
        $output = preg_replace_callback(
            '!(https?://[^/|"]+)([^"]+)?!',
            create_function(
                '$matches',
                // if full URL is site_url, return a slash for relative root
                'if (isset($matches[0]) && $matches[0] === site_url()) { return "/";' .
                // if domain is equal to site_url, then make URL relative
                '} elseif (isset($matches[0]) && strpos($matches[0], site_url()) !== false) { return $matches[2];' .
                // if domain is not equal to site_url, do not make external link relative
                '} else { return $matches[0]; };'
            ),
            $input
        );
        return $output;
    }

    // workaround to remove the duplicate subfolder in the src of JS/CSS tags
    // example: /subfolder/subfolder/css/style.css
    public static function fix_duplicate_subfolder_urls($input) {
        $output = self::relative_url($input);
        preg_match_all('!([^/]+)/([^/]+)!', $output, $matches);
        if (isset($matches[1]) && isset($matches[2])) {
            if ($matches[1][0] === $matches[2][0]) {
                $output = substr($output, strlen($matches[1][0]) + 1);
            }
        }
        return $output;
    }

    // remove root relative URLs on any attachments in the feed
    public static function relative_attachment_urls() {
        if( function_exists( 'roots_get_theme_options' ) ){
            $roots_options = roots_get_theme_options();
            if (!is_feed() && $roots_options['root_relative_urls']) {
                add_filter('wp_get_attachment_url', array( $this, 'relative_url' ) );
                add_filter('wp_get_attachment_link', array( $this, 'relative_attachment_urls' ) );
            }
        }
    }

}