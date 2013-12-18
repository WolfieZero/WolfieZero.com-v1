# Templatie

	style
	├── css
	│	├── 201310171841.css
	│	└── main.css
	└── scss
		├── modules
		│	├── _article.scss
		│	├── _comment.scss
		│	└── _list.scss


Modules

A self-contained componant or item which itself performs a defined task and can
be linked with other such componants to form a larger system. So each componant
should be written to be used at the highest level.


Scaffold

A temporary module that is either supported by an existing module or used on
stand-alone. Shouldn't be made a permant fixure so only use tempurarly then add
to the module correctly.


## Coding Style

### General

- 4 spaces, not tabs

- New code blocks should be indented

			<article>
				<header>
					<h1>...</h1>
				</header>
			</article>

			.selector {
				padding: 0;
			}

### HTML

- Use double quotes `"` rather than single quotes `'` for attribute values

			<img src="..." alt="...">


### CSS

- Shorted hex code for colours (`#000`) unless using `rgba()` for transparency

- Spaces before `{`

			.selector {
				...
			}

- Don't use `#id`, just use `.class` due to specificity ([see here][1])

- Avoid the use of type selectors as they are unessary and have performance
  issues

- Omit the unit type if value is `0`

			margin: 0;
			padding: 2em 0;

- Each selector should be on it's own line

			h1,
			h2,
			.title {
				...
			}

- Don't nest


## Handy Resources

- [CSS `EXPLAIN`][3] - See the speed differences in CSS selectors

[1]: http://j.mp/19RdVK3				 "CSS Specificity: Things You Should Know"
[2]: http://j.mp/19Reof3
[3]: http://josh.github.io/css-explain/ "CSS `EXPLAIN`"
