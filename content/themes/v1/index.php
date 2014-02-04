<?php

// ============================================================================
// Home
// ============================================================================

get_header(); ?>

<section class="articles" id="blogs">

    <?php get_template_part( 'partial/loop', 'post' ); ?>

    <nav class="articles-nav">
        <span class="articles-nav__page  alignleft">
            <?php next_posts_link( 'Older posts' ); ?>
        </span>
        <span class="articles-nav__page  alignright">
            <?php previous_posts_link( 'Newer posts' ); ?>
        </span>
    </nav>

</section>

<?php get_footer(); ?>