/*
 * GET users listing.
 */

exports.list = function (req, res) {
  var fs = require('fs');
  res.json(fs.readFileSync('routes/users.json'));
};