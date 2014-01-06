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
                echo '<iframe id="ytplayer" type="text/html" width="742" height="417.375" src="https://www.youtube.com/embed/' . $yt_id . '?modestbranding=1&showinfo=0&autohide=1" frameborder="0" allowfullscreen></iframe>';
            echo '</div>';
        }

        echo $content;

    }


}