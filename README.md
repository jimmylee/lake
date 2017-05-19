# Lake
> Single page EcmaScript5 web application skeleton.

[AngularJS 1.3](https://angularjs.org/), [LESS](http://lesscss.org/), and [Grunt](http://gruntjs.com/) are powerful tools for single page web application development for 2014. This repository shares the skeleton I use to start front end projects. The assets it builds are perfect for usage with Github's [Electron](https://github.com/atom/electron). It's also a great starting point for a [Parse](https://parse.com) application.

## Prerequisites
* [Node.js](http://nodejs.org/)
* Git installed, use 'git --version' to check.
* Additional commands:

```sh
npm install -g grunt-cli
```

## Setup
```sh
git clone https://github.com/meanJim/lake.git && cd lake && npm install
grunt      # do this in it's own tab.
node .     # do this in it's own tab.
```

## Use in browser
View **localhost:8001** in your browser.

## File Organization
```
root
 |-- build
 |    |-- css
 |    |    +-- styles.js
 |    |-- js
 |    |    |-- client.js
 |    |    +-- client.map
 |    +-- index.html
 |-- client
 |    |-- base
 |    |    |-- angular
 |    |    |    |-- angular-file-name.service.js
 |    |    |    +-- angular-file-name.any-type.js
 |    |    |-- html
 |    |    |    +-- base.template.html
 |    |    |-- styles
 |    |    |    +-- base.styles.less
 |    |    +-- _base.module.js
 |    |-- components
 |    |    |-- component_name
 |    |    |    |-- angular
 |    |    |    |    |-- component_name.controller.js
 |    |    |    |    +-- component_name.directive.js
 |    |    |    |-- html
 |    |    |    |    +-- component_name.partial.html
 |    |    |    |-- styles
 |    |    |    |    +-- component_name.less
 |    |    |    +-- _component_name.module.js
 |    |    |-- _components.module.js
 |    |-- vendor
 |    |    |-- angular
 |    |    |    +-- angular-ui-router.js
 |    |    |-- styles
 |    |    |    |-- lesshat.less
 |    |    |    +-- murtaugh.reset.less
 |    |    +-- _vendor.module.js
 |    |-- client.module.js
 |    +-- routes.config.js
 |-- .gitignore
 |-- gruntfile.js
 |-- package.json
 +-- server.js
```

## Features
* A setup for an EcmaScript5 project.
* A front end codebase without dependency on a database.
* A development CLI command, and a production CLI command provided by [Grunt](http://gruntjs.com/).
* The assets can be included in any project with **any server framework**.
* Minification, cache busting, compressed CSS, and source mapping.
* Because we use Angular, we are using the closest thing to [Web Components](http://webcomponents.org/) in an EcmaScript 5 codebase.
* The ability to watch file changes and rebuild assets immediately.
* A [HTML5 CSS reset](https://github.com/murtaugh/HTML5-Reset) via Tim Murtaugh.
* A clean file & folder organization, where it is suggested that CSS, HTML, and JS are isolated per abstraction of a component.
* Flexibility to name files names however you like within the folder structure.
* Modules to provide a lightweight dependency hierarchy.
* An [UI Router](https://github.com/angular-ui/ui-router) for state and routes.
* [LESS Hat](https://github.com/madebysource/lesshat) for LESS mixins to avoid manually writing vendor prefixes.

## Influencers
* John Papa's [AngularJS styleguide](https://github.com/johnpapa/angularjs-styleguide)
* Addy Osmani's [repos](https://github.com/addyosmani)
* Jacob Thorton's [repos](https://github.com/fat) and CSS/LESS [medium post](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06)
* Dave Mosher's [repos](https://github.com/davemo)
