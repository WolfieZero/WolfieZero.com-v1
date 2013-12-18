<?php

// Always display
get_template_part('layout/header');

// Possible conditionals
if( !is_home() ) get_template_part('layout/header', 'default');