<template>
  <div id="app">
    <!-- 级联 -->
    <area-cascader key="1" v-model="value" :level="3" @change="onChange"/>
    <area-cascader key="2" v-model="value6" :level="3" :data-source="dataSource" @change="onChange"/>
    <el-button size="small" @click="value = value2">广东省广州市荔湾区</el-button><el-button size="small" @click="value = value1">广东省深圳市南山区</el-button>
    <div style="width:600px;margin:10px auto;">
      <area-select key="3" v-model="value3" @change="onChange" :level="1"/>
      <br>
      <area-select key="4" v-model="value4" :level="2"/>
      <br>
      <area-select key="5" v-model="value5" @change="onChange" :level="3"/>
      <br>
      <area-select key="6" v-model="value7" @change="onChange" :level="3" :data-source="dataSource"/>
    </div>
  </div>
</template>

<script>
import Cascader from './components/cascader'
import Selector from './components/select'
import areaData from './data/area-long.json'
export default {
  name: 'App',
  components: {
    Cascader,
    Selector
  },
  data () {
    return {
      dataSource: areaData,
      value: ['710000', '710200', '710202'],
      value3: ['440000'],
      value4: [],
      value5: [],
      value6: [],
      value7: [],
      value1: ['440000', '440300', '440305'],
      value2: ['440000', '440100', '440103']
    }
  },
  methods: {
    onChange (val, text) {
      console.log(val, text)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
