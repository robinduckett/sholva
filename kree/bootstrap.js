var path = require('path');
var fs = require('fs');

var include_package = module.exports.include_package = function(dir, mod) {
  var pkg = path.join(dir, mod, 'package.json');
  var is_pkg = path.existsSync(pkg);
  
  if (is_pkg) {
    var support_dir = path.join(dir, mod, 'support');
    
    if (path.existsSync(support_dir)) {
      fs.readdirSync(support_dir).forEach(function(support_mod) {
        if (fs.statSync(path.join(support_dir, support_mod)).isDirectory()) {
          include_package(support_dir, support_mod);
        }
      });
    }
    
    var pkg_json = JSON.parse(fs.readFileSync(pkg));
    
    if (pkg_json.main) {
      if (pkg_json.main.search('index') > -1) {
        require.paths.unshift(path.dirname(path.join(dir, mod)));
      } else {
        require.paths.unshift(path.dirname(path.join(dir, mod, pkg_json.main)));
      }
    } else {
      require.paths.unshift(path.dirname(path.join(dir, mod)));
    }
  }
};

var resolveroot = path.resolve('./');
var libs = path.join(resolveroot, 'kree', 'libs');
var lib_dir = fs.readdirSync(libs)

lib_dir.forEach(function(library) {
  if (fs.statSync(path.join(libs, library)).isDirectory()) {
    include_package(libs, library);
  }
});