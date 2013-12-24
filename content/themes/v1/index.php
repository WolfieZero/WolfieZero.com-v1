<?php

// ============================================================================
// Home
// ============================================================================

get_header(); ?>

<header class="site-header site-header--home">
    <div class="container">

        <div class="img-logo"><?php bloginfo( 'name' ); ?></div>

        <div class="blurb">
            <h1>WolfieZero.com</h1>
            <p>I'm Neil Sweeney; a snappy 20-something that hails from Hampshire, UK. I work as a front-end developer and analyst when I'm told to, but I try to avoid that to play video games and play with animals.</p>
            <p class="social">
                <a href="http://twitter.com/WolfieZero" rel="external" class="social__ico--twitter-bg">
                    <i class="fa fa-twitter social__ico--twitter">Twitter</i></a>
                <a href="http://github.com/WolfieZero" rel="extenal" class="social__ico--github-bg">
                    <i class="fa fa-github social__ico--github">Github</i></a>
                <a href="http://www.flickr.com/photos/wolfiezero/" rel="external" class="social__ico--flickr-bg">
                    <i class="fa fa-flickr social__ico--flickr">Flickr</i></a>
                <a href="http://uk.linkedin.com/in/neilsweeney/" rel="external" class="social__ico--linkedin-bg">
                    <i class="fa fa-linkedin social__ico--linkedin">LinkedIn</i></a>
                <a href="https://www.youtube.com/user/WolfieZero" rel="external" class="social__ico--youtube-bg">
                    <i class="fa fa-youtube social__ico--youtube">YouTube</i></a>
                <a href="http://codeschool.com/user/28884" rel="external" class="social__ico--codeschool-bg">
                    <i class="fa fa-code social__ico--codeschool">Code School</i></a>
            </p>
        </div>

    </div>
</header>

<section class="articles"><?php

    get_template_part( 'partial/loop', 'post' );

?></section>

<?php get_footer(); ?>