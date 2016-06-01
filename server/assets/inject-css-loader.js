var path = require('path')
var loaderUtils = require('loader-utils')
var recursive = require('recursive-readdir-sync')

/*
 * options:
 *  - appPath: default assuming webpack.config.js in root folder + ./client
 */
module.exports = function(source) {
  var options = loaderUtils.parseQuery(this.query);
  var appPath = (options.appPath || 'client').replace(/\/$/, '')
  appPath = path.resolve(appPath)

  try {
    var styles = recursive(appPath)
      .filter(function(file) {
        return !/app\.(css|scss)/.test(file) && /\.(css|scss)/.test(file)
      })
      .map(function(file) {
        var stylePath = file.replace(appPath, '.').replace(/\.(css|scss)$/, '')
        return "@import '" + stylePath + "';"
      })

    source += '\n\n' + styles.join('\n')

  } catch(err) {
    if (err.errno === 34) {
      console.error('Path does not exist', err);
    } else {
      throw err;
    }
  }

  return source
}
