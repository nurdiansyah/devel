require('raf/polyfill')

global.jsdom = function jsdom(html) {
  if (typeof document === 'undefined') {
    const _jsdom = require('jsdom').jsdom
    global.document = _jsdom(html || '')
    global.window = global.document.defaultView
    global.navigator = {
      userAgent: 'JSDOM'
    }
  }
}
