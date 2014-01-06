<?php

// Always display
get_template_part('layout/header');

// Possible conditionals
if( !is_front_page() ) get_template_part('layout/header', 'default');