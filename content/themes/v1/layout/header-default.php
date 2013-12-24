
<header class="site-header">
    <div class="container">

        <div class="img-logo img-logo--small"><?php bloginfo( 'name' ); ?></div>

        <?php

            if( has_nav_menu( 'header' ) ) {
                wp_nav_menu( array(
                    'theme_location'  => 'header',
                    'container'       => 'nav',
                    'container_class' => 'nav nav-main',
                ) );
            }

        ?>

    </div>
</header>