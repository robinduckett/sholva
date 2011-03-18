var path = require('path');
var fs = require('fs');

var libs = path.join('.', 'kree', 'libs');
var files = fs.readdirSync(libs);

for (var f in files) {
  require.paths.unshift(path.join(libs, files[f], 'lib'));
}

console.log(require.paths);
