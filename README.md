## Preview

Preview link: https://sava4.github.io/step-project-oop.github.io/ 

## How to start

1. Clone the repository
```sh
git clone https://github.com/Sava4/step-project-oop.github.io.git
```
2. Install the dependencies
```sh
npm install
```
3. Build the assets once
```sh
npm run deploy
```
4. Start the development server
```sh
npm start
```
4. Modify files and see results with live reload
Deafault address: http://localhost:3000

## What's included

The `npm` dependencies included in `package.json` are:

* <code>[bulma](https://github.com/jgthms/bulma)</code>
* <code>[node-sass](https://github.com/sass/node-sass)</code> to compile your own Sass file
* <code>[postcss-cli](https://github.com/postcss/postcss-cli)</code> and <code>[autoprefixer](https://github.com/postcss/autoprefixer)</code> to add support for older browsers
* <code>[babel-cli](https://babeljs.io/docs/usage/cli/)</code>, <code>[babel-preset-env](https://github.com/babel/babel-preset-env)</code> and <code>[babel-preset-es2015-ie](https://github.com/jmcriffey/babel-preset-es2015-ie)</code> for compiling ES6 JavaScript files
* <code>[copyfiles](https://www.npmjs.com/package/copyfiles)</code>,
* <code>[chokidar-cli](https://github.com/kimmobrunfeldt/chokidar-cli)</code>.

## Other included npm scripts 

```sh
Lifecycle scripts included in oop-step-project:
  start
    npm-run-all --parallel html-watch css-watch js-watch browser

available via `npm run-script`:
  css-deploy
    npm run css-build && npm run css-postcss
  css-build
    node-sass src/scss/main.scss dist/main.css
  css-postcss
    postcss --use autoprefixer --output dist/main.css dist/main.css
  css-watch
    npm run css-build -- --watch
  deploy
    npm run css-deploy && npm run js-build && npm run html-build
  gh-pages
    npm run deploy && cd dist && git add . && git commit -am 'deploy' && git push origin gh-pages
  html-build
    cd src/html && copy index.html ../../dist/
  js-build
    babel src/js --out-dir dist
  js-watch
    npm run js-build -- --watch
  html-watch
    watch 'npm run html-build' src/html
  browser
    cd dist && browser-sync start --server --files index.html main.css main.js
```

## Based on Start package for [Bulma](http://bulma.io)

Tiny npm package that includes the `npm` **dependencies** you need to **build your own website** with Bulma.

<a href="http://bulma.io"><img src="https://raw.githubusercontent.com/jgthms/bulma-start/master/bulma-start.png" alt="Bulma: a Flexbox CSS framework" style="max-width:100%;" width="600" height="315"></a>
