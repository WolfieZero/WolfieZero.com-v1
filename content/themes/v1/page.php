<?php

// ============================================================================
// Page
// ============================================================================

the_post();

$featured_image_url = '';

if( has_post_thumbnail() ) {
    $thumb_id           = get_post_thumbnail_id();
    $thumb_url          = wp_get_attachment_image_src($thumb_id,'thumbnail-size', true);
    $featured_image_url = $thumb_url[0];
}

get_header();
?>

<article class="single">

    <header class="single-header<?php if( $featured_image_url ) echo '  single-header--featured'; ?>" style="<?php if( $featured_image_url ) echo 'background-image:url(' . $featured_image_url . ');'; ?>">
        <div class="pad">
            <h1 class="single__title<?php if( $featured_image_url ) echo '  single__title--featured'; ?>"><?php the_title(); ?></h1>
        </div>
    </header>

    <div class="single-content">
        <div class="pad">
            <?php the_content(); ?>
        </div>
    </div>

</article>

<?php get_footer(); ?>