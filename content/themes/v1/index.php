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
                    <i class="social__ico--twitter"></i> Twitter</a>
                <a href="http://github.com/WolfieZero" rel="extenal" class="social__ico--github-bg">
                    <i class="social__ico--github"></i> Github</a>
                <a href="http://www.flickr.com/photos/wolfiezero/" rel="external" class="social__ico--flickr-bg">
                    <i class="social__ico--flickr"></i> Flickr</a>
                <a href="http://uk.linkedin.com/in/neilsweeney/" rel="external" class="social__ico--linkedin-bg">
                    <i class="social__ico--linkedin"></i> LinkedIn</a>
                <a href="http://www.last.fm/user/WolfieZero" rel="external" class="social__ico--lastfm-bg">
                    <i class="social__ico--lastfm"></i> last.fm</a>
                <a href="http://about.me/WolfieZero" rel="external" class="social__ico--aboutme-bg">
                    <i class="social__ico--aboutme"></i> about.me</a>
            </p>
        </div>

    </div>
</header>

<section class="articles"><?php

    get_template_part( 'partial/loop', 'post' );

?></section>

<?php get_footer(); ?>