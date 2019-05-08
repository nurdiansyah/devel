const path = require('path')
const stringifyRequest = require('loader-utils').stringifyRequest

module.exports = function loader() {}
module.exports.pitch = function pitch(remainingRequest) {
  if (this.cacheable) {
    this.cacheable()
  }

  const insertCssPath = path.join(__dirname, './insert-css.js')
  return `
    var content = require(${stringifyRequest(this, `!${remainingRequest}`)});
    var insertCss = require(${stringifyRequest(this, `!${insertCssPath}`)});
    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    } else {
      content[0][0] = module.id;
    }
    
    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    module.exports._id = module.id
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(${stringifyRequest(
        this,
        `!!${remainingRequest}`
      )}, function() {
        content = require(${stringifyRequest(this, `!!${remainingRequest}`)});
        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }
        removeCss = insertCss(module.id ,content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  `
}
