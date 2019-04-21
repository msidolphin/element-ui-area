<template>
    <el-row :gutter="gutter" class="china-area-selector">
        <el-col :span="span" v-for="(option, index) in options" :key="index">
            <el-select v-model="model[index]"
                :size="size"
                :placeholder="placeholderList[index]"
                @change="__onAreaChange(model[index], index + 1)">
                <el-option v-for="area in option" :label="area.label" :value="area.value" :key="area.key"></el-option>
            </el-select>
        </el-col>
    </el-row>
</template>

<script>
import Mixins from './mixins'
import areaData from 'area-data'
const dataSource = JSON.parse(JSON.stringify(areaData.pcaa))
// 数据源不支持街道
const PLACEHOLDER = ['请选择省', '请选择市', '请选择区县', '请选择街道']
const CN = '86'
const COMPONENT_NAME = 'area-select'
export default {
    name: COMPONENT_NAME,
    props: {
        placeholder: {
            type: Array,
            default: () => []
        },
        gutter: {
            type: Number,
            default: 10
        }
    },
    mixins: [Mixins],
    computed: {
        span () {
            return 24 / this.level
        }
    },
    data () {
        return {
            init: false,
            placeholderList: PLACEHOLDER
        }
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler (val) {
                if (val) {
                    if (val.length > this.level) this.model = val.slice(0, this.level)
                    else this.model = val
                    this.__initOptionsByValue()
                }
            }
        }
    },
    methods: {
        __initData () {
            for (let i = 0; i < this.level; ++i) {
                if (!this.model[i]) this.$set(this.model, i, '')
                this.$set(this.options, i, [])
            }
            this.init = true
        },
        __initOptionsByValue () {
            if (!this.init) {
                this.__initData()
                this.__initProvinces()
            }
            for (let i = 0; i < this.model.length; ++i) {
                this.__initOption(this.model[i], i + 1)
            }
            this.__change()
        },
        __initProvinces () {
            // 获取省级
            let provinces = []
            Object.keys(dataSource[CN]).forEach(code => {
                provinces.push({
                    label: dataSource[CN][code],
                    value: code
                })
            })
            this.options[0] = provinces
        },
        __initOption (code, level) {
            if (level >= this.level) return
            let index = level - 1
            let childs = dataSource[code]
            if (childs) {
                let newChilds = []
                Object.keys(childs).forEach($code => {
                    newChilds.push({
                        label: childs[$code],
                        value: $code
                    })
                })
                this.$set(this.options, level, newChilds)
            }
        },
        __onAreaChange (code, level) {
            if (!code) return
            this.__initOption(code, level)
            // 清空选择项
            this.__clearSelected(level - 1)
            this.$emit('input', this.model)
            this.__change()
        },
        __clearSelected (level) {
            for (let i = level + 1; i < this.level; ++i) {
                if (this.model[i] !== undefined) {
                    this.model[i] = ''
                }
            }
        },
        __getTextArray (values) {
            let text = []
            values.forEach((value, index) => {
                let $index = this.options[index].findIndex(option => option.value === value)
                if ($index !== -1) text.push(this.options[index][$index].label)
                else text.push('')
            })
            this.text = text
            return text
        },
        __change () {
            this.$emit('change', this.model, this.__getTextArray(this.model))
        }
    }
}
</script>

<style>
.china-area-selector .el-select{
    width: 100%;
}
</style>
