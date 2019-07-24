<template>
<div>
  <div class="top">
   <el-select v-model="value1" placeholder="请选择">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="value2" placeholder="请选择">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="value3" placeholder="请选择">
    <el-option
      v-for="item in options3"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
  <div style="width:100%;height:500px" ref="echart"></div>
</div>
</template>
<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
import axios from 'axios'
let myChart
export default {
  data () {
    return {
      options1: [{
        value: 1,
        label: '一个月'
      }, {
        value: 2,
        label: '三个月'
      }, {
        value: 3,
        label: '半年'
      }, {
        value: 4,
        label: '一年'
      }],
      value1: 1,
      value2: '全部',
      value3: '全部'
    }
  },
  mounted () {
    const dom = this.$refs.echart
    myChart = echarts.init(dom)
    this.getdata(this.value1, this.value2, this.value3)
  },
  methods: {
    getdata (val1, val2, val3) {
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      const day = new Date().getDate()
      const endtime = `${year}-${month > 9 ? month : '0' + month}-${day}`
      let starttime
      switch (val1) {
        case 1:
          const newmonth = month - 1
          if (newmonth) {
            starttime = `${year}-${newmonth > 9 ? newmonth : '0' + newmonth}-${day}`
          } else {
            starttime = `${year - 1}-12-${day}`
          }
          break
        case 2:
          const newmonth1 = month - 3
          if (newmonth1 > 0) {
            starttime = `${year}-${newmonth1 > 9 ? newmonth1 : '0' + newmonth1}-${day}`
          } else {
            starttime = `${year - 1}-${(newmonth1 + 12) > 9 ? (newmonth1 + 12) : '0' + (newmonth1 + 12)}-${day}`
          }
          break
        case 3:
          const newmonth2 = month - 6
          if (newmonth2 > 0) {
            starttime = `${year}-${newmonth2 > 9 ? newmonth2 : '0' + newmonth2}-${day}`
          } else {
            starttime = `${year - 1}-${(newmonth2 + 12) > 9 ? (newmonth2 + 12) : '0' + (newmonth2 + 12)}-${day}`
          }
          break
        case 4:
          starttime = `${year - 1}-${month > 9 ? month : '0' + month}-${day}`
          break
        default:
          break
      }
      let casetype = ''
      let projectname = ''
      if (val2 !== '全部') {
        projectname = '&project_name=' + val2
      }
      if (val3 !== '全部') {
        casetype = '&case_type=' + val3
      }
      let url = `/api/getcount?start_time=${starttime} 00:00:00&end_time=${endtime} 23:59:59` + casetype + projectname
      console.log(url)
      axios.get(url)
        .then(function (response) {
          if (response.data.success) {
            console.log(response.data.data)
            const x = response.data.data.map(item => item.dateTime)
            const y = response.data.data.map(item => item.countNumber)
            let option = {
              xAxis: {
                type: 'category',
                data: x
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: y,
                type: 'line'
              }] }
            myChart.setOption(option, true)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  watch: {
    value1 (val) {
      this.getdata(val, this.value2, this.value3)
    },
    value2 (val) {
      this.getdata(this.value1, val, this.value3)
    },
    value3 (val) {
      this.getdata(this.value1, this.value2, val)
    }
  },
  computed: {
    ...mapState({
      options2: (state) => state.projects,
      options3: (state) => state.types
    })
  }
}
</script>
<style lang="scss" scoped>
.top{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
