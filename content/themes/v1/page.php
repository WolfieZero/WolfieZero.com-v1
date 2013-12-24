<?php

// ============================================================================
// Page
// ============================================================================

the_post();
get_header();
?>

<article>

    <header class="single--header">
        <div class="pad">
            <h1><?php the_title(); ?></h1>
        </div>
    </header>

    <div class="single--content">
        <div class="pad">
            <?php the_content(); ?>
        </div>
    </div>

</article>

<?php get_footer(); ?>