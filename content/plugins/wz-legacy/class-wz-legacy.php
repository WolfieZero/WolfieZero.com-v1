<?php

/**
 * @package     WolfieZero.com
 * @subpackage  Plugin: WolfieZero.com: Legacy
 * @author      Neil Sweeney <neil@wolfiezero.com>
 */
class WZ_Legacy {


    /**
     * Instance of this class.
     *
     * @var  object
     */
    protected static $instance = null;


    /**
     * Initialize the plugin by setting localization and loading public scripts
     * and styles.
     */
    private function __construct() {

        // Define custom functionality.
        // Refer To http://codex.wordpress.org/Plugin_API#Hooks.2C_Actions_and_Filters

        add_filter( 'the_content', array( $this, 'check_for_youtube' ) );

        add_action( 'wp', array( $this, 'redirect_old_blog_uri' ) );

    }


    /**
     * Return an instance of this class
     *
     * @return  object
     */
    public static function get_instance() {

        // If the single instance hasn't been set, set it now.
        if( null == self::$instance ) {
            self::$instance = new self;
        }

        return self::$instance;

    }


    /**
     * Original site contained a custom field for YouTube fields so we need to
     * grab that field and echo it to the post content
     *
     * @param   string  $content  Post content
     *
     * @return  null
     */
    public static function check_for_youtube( $content ) {

        global $post;

        $yt_id = get_post_meta( $post->ID, 'ytID', true );

        if( $yt_id ) {
            echo '<div class="video  video--widescreen">';
                echo '<iframe id="ytplayer" style="border:0;" width="742" height="417" src="https://www.youtube.com/embed/' . $yt_id . '?modestbranding=1&amp;showinfo=0&amp;autohide=1" allowfullscreen></iframe>';
            echo '</div>';
        }

        echo $content;

    }


    /**
     * Takes the old URI format /(integer)/(string)/ and transforms it into the
     * new blog format
     *
     * @return  null
     */
    public static function redirect_old_blog_uri() {

        global $wp_query;

        if( $wp_query->is_404 ) {

            $uri = explode( '/', $_SERVER['REQUEST_URI'] );

            if( isset( $uri[1] ) && (int)$uri[1] > 0 ) {
                $wp_query->is_404 = false;
                wp_redirect( '/blog/' . $uri[2], 301 );
                exit;
            }

        }

    }


}