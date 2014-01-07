
WolfieZero.com
===============================================================================

The complete source for WolfieZero.com... because why not?!

This is a work in progress so if it gets a little "weird" then that's probablly
why. Let me know if you find something saucy.


Installing
-------------------------------------------------------------------------------

To get started, first install [Composer](http://getcomposer.com/) by running
the following.

    $ curl -sS https://getcomposer.org/installer | php

Then run the following remembering to change "folder" to where you want your
WordPress route to be.

    $ php composer.phar update

You will then have all the required WordPress files to start a project.


Configuring
-------------------------------------------------------------------------------

Due to the way this is setup, you will need to alter the `wp-config.php` file.

Open wp-config and edit the empty fields as you see fit; it's best to make this
your priority database file, so what ever you live sites settings are, do it
here. Then if you want a seperate database locally or working on a dev site run
the following

    $ cp wp-local-config-sample.php wp-local-config.php

You will now have a `wp-local-config.php` that will override the
`wp-config.php` file and apply some developer settings.


Author(s)
-------------------------------------------------------------------------------

- Neil Sweeney <neil@wolfiezero.com>


License
-------------------------------------------------------------------------------

[![Creative Commons Attribution-ShareAlike 4.0 International License](http://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)

[WolfieZero.com](https://github.com/WolfieZero/WolfieZero.com) by [Neil Sweeney](http://wolfiezero.com/) is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/)

Based on a work at [https://github.com/WolfieZero/WolfieZero.com](https://github.com/WolfieZero/WolfieZero.com).

See [terms](http://purl.org/dc/terms/).
