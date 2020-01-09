require('raf/polyfill')

const enzyme = require('enzyme')
const configure = enzyme.configure

const Adapter = require('enzyme-adapter-react-16')
configure({adapter: new Adapter()})

global.shallow = enzyme.shallow
global.render = enzyme.render
global.mount = enzyme.mount
global.jsdom = function jsdom(html) {
  if (typeof document === 'undefined') {
    // eslint-disable-next-line global-require
    const _jsdom = require('jsdom').jsdom
    global.document = _jsdom(html || '')
    global.window = global.document.defaultView
    global.navigator = {
      userAgent: 'JSDOM'
    }
  }
}
