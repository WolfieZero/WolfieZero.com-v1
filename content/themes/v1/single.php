<?php

// ============================================================================
// Post
// ============================================================================

the_post();
get_header();
?>

<article class="single">

    <header class="single-header">
        <div class="pad">
            <h1><?php the_title(); ?></h1>
        </div>
    </header>

    <div class="single-content">
        <div class="pad">
            <?php the_content(); ?>
        </div>
    </div>

    <footer class="single-footer">
        <div class="pad">
            Published <?php the_date(); ?>
        </div>
    </footer>

    <section class="single-comments">
        <div class="pad"><?php
            comments_template();
        ?></div>
    </section>

</article>

<?php get_footer(); ?>