import packageJson from '../../package.json'
import Cascader from './cascader'
import Select from './select'

const mixin = (Vue, options = {}) => {
  Vue.prototype.$ELEMENT_UI_AREA_COMPONENT = {
    dataSource: options.dataSource
  }
}

Cascader.install = (Vue, options = {}) => {
  let prefix = options.prefix ? options.prefix : ''
  Vue.component(`${prefix ? prefix + '-' : ''}${Cascader.name}`, Cascader)
  mixin(Vue, options)
}

Select.install = (Vue, options = {}) => {
  let prefix = options.prefix ? options.prefix : ''
  Vue.component(`${prefix ? prefix + '-' : ''}${Select.name}`, Select)
  mixin(Vue, options)
}

const components = {
  Cascader,
  Select
}

function install (Vue, options = {}) {
  let prefix = options.prefix ? options.prefix : ''
  for (let name in components) {
    let componentName = name
    if (components[name].name) {
      componentName = components[name].name
    }
    Vue.component(`${prefix ? prefix + '-' : ''}${componentName}`, components[name])
  }
  Vue.prototype.$ELEMENT_UI_AREA_COMPONENT = {
    dataSource: options.dataSource
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: packageJson.version,
  install,
  Cascader,
  Select
}

export {
  Cascader,
  Select
}
