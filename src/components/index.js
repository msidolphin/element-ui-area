import packageJson from '../../package.json'
import Cascader from './cascader'
import Select from './select'

Cascader.install = Vue => {
  Vue.component(Cascader.name, Cascader)
}

Select.install = Vue => {
  Vue.component(Select.name, Select)
}

const components = {
  Cascader,
  Select
}

function install (Vue, options = {}) {
  for (let name in components) {
    if (typeof components[name].install === 'function') components[name].install(Vue, options)
    else Vue.component(components[name], options)
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
