<template>
    <el-cascader
        :options="options"
        v-model="model"
        :size="size"
        :disabled="disabled"
        :no-match-text="noMatchText"
        :no-data-text="noDataText"
        :clearable="clearable"
        :placeholder="placeholder"
        @active-item-change="__onActiveItemChange"
        @blur="__onBlur"
        @focus="__onFocus">
    </el-cascader>
</template>

<script>
import Mixins from './mixins'
import areaData from './area.json'
const dataSource = JSON.parse(JSON.stringify(areaData))
const CN = '86'
const COMPONENT_NAME = 'area-cascader'
/**
 * {
 *  value: 100000
 *  label: 北京市
 * }
 */

export default {
  name: COMPONENT_NAME,
  mixins: [Mixins],
  props: {
    placeholder: {
      type: String,
      default: '请选择地区'
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler (val) {
        if (val) {
          // 这里element-ui(2.7.2)有一个bug，默认值的层级错误会导致第一次选中值错误的问题，解决截取默认值
          if (val.length > this.level) this.model = val.slice(0, this.level)
          else this.model = val
          this.__initOptionsByValue()
        }
      }
    },
    model: {
      deep: true,
      handler (val) {
        if (val) {
          this.$emit('input', val)
        }
      }
    }
  },
  methods: {
    __initOptionsByValue () {
      this.__initProvinces()
      if (this.model.length) {
        for (let i = 0; i < this.model.length; ++i) {
          this.__setChildren(this.model[i], i + 1)
        }
      }
      if (this.immediate && this.model && this.model.length) this.__change(this.model)
    },
    __initProvinces () {
      if (this.options.length) return
      // 获取省级
      Object.keys(dataSource[CN]).forEach(code => {
        if (this.level > 1) {
          this.options.push({
            label: dataSource[CN][code],
            value: code,
            children: []
          })
        } else {
          this.options.push({
            label: dataSource[CN][code],
            value: code
          })
        }
      })
    },
    __getTextArray (values) {
      let text = []
      values.forEach(code => {
        let area = this.__getAreaItemByCode(this.options, code)
        // 优化下？
        if (area) text.push(area.label)
      })
      this.text = text
      return text
    },
    /**
         * @description 获取需要加载的code
         */
    __getNeedLoadedCode (val) {
      if (!val) return ''
      return [
        val[val.length - 1],
        val.length
      ]
    },
    __getAreaItemByCode (areas = [], code) {
      if (!code) return null
      for (let i = 0; i < areas.length; ++i) {
        let area = areas[i]
        if (area.value === code) return area
        else if (area.children) {
          let ret = this.__getAreaItemByCode(area.children, code)
          if (ret) return ret
        }
      }
      return null
    },
    __setChildren ($code, level) {
      // if ($code) return
      let area = this.__getAreaItemByCode(this.options, $code)
      if (level >= this.level) return
      if (!area) throw new Error(`找不到对应的地区编号: ${$code}`)
      if (!area.children) return
      if (area.children && area.children.length) return
      // console.log(dataSource[$code])
      let childs = dataSource[$code]
      if (!childs) throw new Error('数据源暂不支持该层级的数据')
      Object.keys(childs).forEach(code => {
        if (level + 1 < this.level) {
          area.children.push({
            label: childs[code],
            value: code,
            children: []
          })
        } else {
          area.children.push({
            label: childs[code],
            value: code
          })
        }
      })
    },
    __onActiveItemChange (val) {
      this.$nextTick(() => {
        let [$code, level] = this.__getNeedLoadedCode(val)
        this.__setChildren($code, level)
      })
    },
    __change (val) {
      this.$emit('change', val, this.__getTextArray(val))
    }
  }
}
</script>
