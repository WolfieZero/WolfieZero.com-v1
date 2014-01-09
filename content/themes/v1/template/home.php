<?php

// ============================================================================
// Template Name: Home
// ============================================================================

the_post();
get_header(); ?>

<header class="site-header site-header--home">
    <div class="container">

        <div class="img-logo"><?php bloginfo( 'name' ); ?></div>

        <div class="blurb">
            <h1 class="site__title  site__title--home">WolfieZero.com</h1>
            <?php the_content(); ?>
            <p class="social">
                <a href="http://twitter.com/WolfieZero" rel="external" class="social__ico--twitter-bg">
                    <i class="fa fa-twitter social__ico--twitter">Twitter</i></a>
                <a href="http://github.com/WolfieZero" rel="external" class="social__ico--github-bg">
                    <i class="fa fa-github-alt social__ico--github">Github</i></a>
                <a href="http://www.flickr.com/photos/wolfiezero/" rel="external" class="social__ico--flickr-bg">
                    <i class="fa fa-flickr social__ico--flickr">Flickr</i></a>
                <a href="http://uk.linkedin.com/in/neilsweeney/" rel="external" class="social__ico--linkedin-bg">
                    <i class="fa fa-linkedin social__ico--linkedin">LinkedIn</i></a>
                <a href="https://www.youtube.com/user/WolfieZero" rel="external" class="social__ico--youtube-bg">
                    <i class="fa fa-youtube social__ico--youtube">YouTube</i></a>
                <a href="http://codeschool.com/user/28884" rel="external" class="social__ico--codeschool-bg">
                    <i class="fa fa-code social__ico--codeschool">Code School</i></a>
                <a href="http://stackexchange.com/users/118762/wolfiezero?tab=accounts" class="social__ico--stack-exchange-bg">
                    <i class="fa fa-stack-exchange social__ico--stack-exchange">Stack Exchange</i></a>
            </p>
        </div>

    </div>
</header>

<div class="nav-home">
    <?php

        if( has_nav_menu( 'header' ) ) {
            wp_nav_menu( array(
                'theme_location'  => 'header',
                'container'       => 'nav',
                'container_class' => 'nav-home__inner',
            ) );
        }

    ?>
</div>

<section class="articles">

    <?php
        wp_reset_query();
        get_template_part( 'partial/loop', 'post' );
    ?>

    <nav class="articles-nav">
        <div class="articles-nav__more">
            <a href="/blog/page/2/">See More</a>
        </div>
    </nav>

</section>

<?php get_footer(); ?>