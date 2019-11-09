# element-ui-area

> 基于Vue和ElementUI的中国行政区划选择器

## 安装

```bash
npm install element-ui-area -S
```

## 使用方式

> 项目依赖于[Element-UI](https://github.com/ElemeFE/element)，您需要先进行引入

### 引入
```javascript
import AreaComponent from 'element-ui-area'
Vue.use(AreaComponent, {})

// or
import {Cascader, Select} from 'element-ui-area'
Vue.use(Cascader, {})
Vue.use(Select, {})
```
#### 配置项
| 属性 | 类型 | 说明 | 默认值 |
| :------ | :------ | :------ | --- |
| dataSource | Object | 数据源 | - |

### 使用

#### Cascader
```vue
<template>
    <area-cascader v-model="value" :level="3" @change="onChange"/>
</template>
<script>
export default {
    data () {
        return {
            value: []
        }
    },
    methods: {
        onChange (val, text) {
            console.log(val)
            console.log(text) // 地区中文
        }
    }
}
</script>
```

#### Select
```vue
<template>
    <div style="width:600px;margin:10px auto;">
      <area-select v-model="value" :level="1"/>
      <area-select v-model="value1" :level="2"/>
      <area-select v-model="value2" :level="3"/>
    </div>
</template>
<script>
export default {
    data () {
        return {
            value: [],
            value1: [],
            value2: []
        }
    }
}
</script>
```

## 配置项

### area-cascader

| 属性 | 类型 | 说明 | 默认值 |
| :------ | :------ | :------ | --- |
| value | String | 绑定值 | [ ] |
| level | Number | 层级，由于数据原因，目前最多只支持三级 | 3 |
| disabled | Boolean | 是否禁用 | false |
| size | String | 尺寸 | small |
| noMatchText | String | 无匹配项时展现的文字 | 无匹配数据 |
| noDataText | String | 无数据时展现的文字 | 无数据 |
| clearable | Boolean | 是否支持清空 | true |
| placeholder | String | 占位符 | 请选择地区 |
| immediate | Boolean | 是否立即触发change事件 | true |
| dataSource | Object | 数据源 | 6位短编码行政区划 |

### area-select

| 属性 | 类型 | 说明 | 默认值 |
| :------ | :------ | :------ | --- |
| value | String | 绑定值 | [ ] |
| level | Number | 层级，由于数据原因，目前最多只支持三级 | 3 |
| disabled | Boolean | 是否禁用 | false |
| size | String | 尺寸 | small |
| gutter | number | 间距 | 10 |
| noMatchText | String | 无匹配项时展现的文字 | 无匹配数据 |
| noDataText | String | 无数据时展现的文字 | 无数据 |
| clearable | Boolean | 是否支持清空 | true |
| placeholder | Array | 占位符 | ['请选择省', '请选择市', '请选择区县', '请选择街道'] |
|filterable | Boolean | 是否支持搜索 | false |
| immediate | Boolean | 是否立即触发change事件 | true |
| dataSource | Object | 数据源 | 6位短编码行政区划 |

## 事件

| 名称 | 说明 | 参数 |
| :------ | :------ | :------ |
| change | 选中值改变事件，初始化时会触发一次 | 改变后的值, 中文名称 |
| blur | 失去焦点 | 事件对象 |
| focus | 聚焦 | 事件对象|

## 数据源格式范例
```json
{
	"86": {
		"110000": "北京市",
	},
	"110000": {
		"110100": "市辖区"
	},
	"110100": {
		"110101": "东城区",
		"110102": "西城区",
		"110105": "朝阳区",
		"110106": "丰台区",
		"110107": "石景山区",
		"110108": "海淀区",
		"110109": "门头沟区",
		"110111": "房山区",
		"110112": "通州区",
		"110113": "顺义区",
		"110114": "昌平区",
		"110115": "大兴区",
		"110116": "怀柔区",
		"110117": "平谷区",
		"110118": "密云区",
		"110119": "延庆区"
    }
}
```