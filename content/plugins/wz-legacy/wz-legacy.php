<?php
/**
 * ============================================================================
 * WolfieZero.com: Legacy
 * ============================================================================
 *
 * @package     WolfieZero.com
 * @subpackage  Plugin: WolfieZero.com: Legacy
 * @author      Neil Sweeney <neil@wolfiezero.com>
 *
 * ----------------------------------------------------------------------------
 *
 * @wordpress-plugin
 * Plugin Name:  WolfieZero.com: Legacy
 * Description:  Add airport post type and access API data
 * Author:       Neil Sweeney <neil@wolfiezero.com>
 * Author URI:   http://wolfiezero.com/
 * License:      GPLv2 or later
 * License URI:  http://www.gnu.org/licenses/gpl-2.0.html
 */


// ----------------------------------------------------------------------------
// Accessed Directly
// ----------------------------------------------------------------------------

if ( ! defined( 'WPINC' ) ) die;


// ----------------------------------------------------------------------------
// Requires
// ----------------------------------------------------------------------------

require 'class-wz-legacy.php';


// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------

add_action( 'plugins_loaded', array( 'WZ_Legacy', 'get_instance' ) );
