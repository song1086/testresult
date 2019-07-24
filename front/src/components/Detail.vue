<template>
  <div class="bg">
    <div class="top">
      <!-- <el-form-item label="审批人"> -->
      <el-select
        v-model="value1"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- </el-form-item> -->

      <el-select
        v-model="value2"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker
        v-model="value3"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
    </div>
    <div style="width:95%">
      <el-table
        :data="tableData"
        height="950"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="project_name"
          label="项目"
        >
        </el-table-column>
        <el-table-column
          prop="case_name"
          label="用例名称"
        >
        </el-table-column>
        <el-table-column
          prop="case_descript"
          label="用例描述"
        >
        </el-table-column>
        <el-table-column
          prop="case_start_time"
          label="开始时间"
        >
        </el-table-column>
        <el-table-column
          prop="case_end_time"
          label="结束时间"
        >
        </el-table-column>
        <el-table-column
          prop="case_time"
          label="用时"
        >
        </el-table-column>
        <el-table-column
          prop="case_result"
          label="结果"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      value1: '全部',
      value2: '全部',
      value3: new Date(),
      tableData: []
    }
  },
  mounted () {
    this.getdata(this.value1, this.value2, this.value3)
  },
  watch: {
    value1 (val) {
      this.getdata(val, this.value2, this.value3)
    },
    value2 (val) {
      this.getdata(this.value1, val, this.value3)
    },
    value3 (val) {
      console.log(val)
      this.getdata(this.value1, this.value2, val)
    }
  },
  computed: {
    ...mapState({
      options1: (state) => state.projects,
      options2: (state) => state.types
    })
  },
  methods: {
    getdata (projectname, type, date) {
      const self = this
      const year = date.getFullYear()
      const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
      const day = date.getDate()
      let prourl = ''
      let typeurl = ''
      if (projectname !== '全部') {
        prourl = `&projectname=${projectname}`
      }
      if (type !== '全部') {
        typeurl = `&casetype=${type}`
      }
      let url = `/api/getdata?date=${year}-${month}-${day}${prourl}${typeurl}`
      console.log(url)
      axios.get(url)
        .then(function (response) {
          console.log(response)
          if (response.data.success) {
            self.tableData = response.data.data.map(item => {
              item.case_result = item.case_result ? 'pass' : 'fail'
              item.case_time = item.case_time + 'ms'
              return item
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    tableRowClassName ({ row, rowIndex }) {
      console.log(row.case_result)
      if (row.case_result === 'pass') {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.bg {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
  }
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
