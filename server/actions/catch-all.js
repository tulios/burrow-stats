var path = require('path')
var indexPath = path.resolve('./dist/index.html')

module.exports = function (req, res) {
  res.sendFile(indexPath)
}
