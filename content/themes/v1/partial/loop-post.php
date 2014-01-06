
<?php

$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
$args = array (
    'showposts' => 10,
    'paged' => $paged
);
query_posts( $args );


?>
<?php while ( have_posts() ) : the_post(); ?>
    <article class="articles-item">
        <h2><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
        <p class="article__meta"><abbr class="published" title="2012-08-02T00:08:02+00:00"><?php the_date('d M y'); ?></abbr></p>
    </article>

<?php endwhile; ?>
