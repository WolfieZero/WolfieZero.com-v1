
<header class="site-header">
    <div class="container">

        <div class="img-logo img-logo--small"></div>

        <p class="site__title  site__title--small"><a href="/"><?php bloginfo( 'name' ); ?></a></p>

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