# grunt-nodemon
> Run [nodemon](https://github.com/remy/nodemon) as a grunt task for easy configuration and integration with the rest of your workflow

[![NPM version](https://badge.fury.io/js/grunt-nodemon.png)](http://badge.fury.io/js/grunt-nodemon)  
[![Dependency Status](https://gemnasium.com/ChrisWren/grunt-nodemon.png)](https://gemnasium.com/ChrisWren/grunt-nodemon)   
[![Travis Status](https://travis-ci.org/ChrisWren/grunt-nodemon.png)](https://travis-ci.org/ChrisWren/grunt-nodemon)
## Getting Started
If you haven't used grunt before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a gruntfile as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:
```shell
npm install grunt-nodemon --save-dev
```

Then add this line to your project's `Gruntfile.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-nodemon');
```

## Documentation

### Usage
The minimal usage of nodemon runs with no options:
```js
nodemon: {
  dev: {}
}
```
When this is run, nodemon will look at the `package.json` file for the `main` property and run its value as a command in node.

Here is a config that uses all of the available options for nodemon:

```js
nodemon: {
  prod: {
    options: {
      file: 'test/server.js',
      args: ['production'],
      ignoredFiles: ['README.md', 'node_modules/**'],
      watchedExtensions: ['js', 'coffee'],
      watchedFolders: ['test', 'tasks'],
      debug: true,
      delayTime: 1,
      env: {
        PORT: '8181'
      },
      cwd: __dirname
    }
  },
  exec: {
    options: {
      exec: 'less'
    }
  }
}
```
#### Running nodemon concurrently
A common use case is to run `nodemon` with other tasks concurrently. This can be achieved with the following config, which uses [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent) to run nodemon and [watch](https://github.com/gruntjs/grunt-contrib-watch) in a single terminal tab: 
```js
concurrent: {
  target: {
    tasks: ['nodemon', 'watch'],
    options: {
      logConcurrentOutput: true
    }
  }
}
```
### Options

#### file
Type: `String`

File that nodemon runs and restarts when changes are detected.

### args
Type: `Array` of `Strings`

List of arguments to be passed to your file.

### ignoredFiles
Type: `Array` of `String globs`

List of ignored files specified by a glob pattern. [Here](https://github.com/remy/nodemon#ignoring-files) is an explanation of how to use the patterns to ignore files. This task will create a `.nodemonignore` file in your repo based on these settings which nodemon reads when it starts.

### watchedExtensions
Type: `Array` of `Strings`

List of file extensions to watch for changes. By default, nodemon watches `.js`, `.coffee`, and `.litcoffee` files.

### watchedFolders
Type: `Array` of `Strings` Default: `'.'`

List of folders to watch for changes if you don't want to watch the root folder and its subdirectories.

### debug
Type: `Boolean`

Optionally launch the node.js debug server.

### debugBreak
Type: `Boolean`

Optionally launch the node.js debug server, automatically setting a breakpoint on the first line (using `--debug-brk`).

### delayTime
Type: `Number`

Delay the restart of nodemon by a number of seconds when compiling a large amount of files so that the app doesn't needlessly restart after each file.

### cwd
Type: `String`

The current working directory to run your file from.

### env
Type: `Object`

Hash of environment variables to pass to your file.

### exec
Type: `String`

You can use nodemon to execute a command outside of node. Use this option to specify a command as a string with the argument being the file parameter above. You can read more on exec [here](https://github.com/remy/nodemon#running-non-node-scripts).

# Changelog

**0.0.8** - Added error logging for incorrectly installed `nodemon`.

**0.0.7** - Added `debugBreak` option.

**0.0.6** - Added `env` option.

**0.0.5** - Added `cwd` option.

**0.0.4** - Added `nodemon` as a proper dependency.

**0.0.3** - Uses local version of `nodemon` for convenience and versioning.

**0.0.2** - Removes `.nodemonignore` if it was previously generated and then the `ignoredFiles` option is removed.

**0.0.1** - Added warning if `nodemon` isn't installed as a global module.

**0.0.0** - Initial release
