import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projects: [ {
      value: '全部',
      label: '全部'
    }],
    types: [{
      value: '全部',
      label: '全部'
    }]
  },
  mutations: {
    pushtype (state, param) {
      console.log('param', param)
      param.forEach(element => {
        state.types.push({
          value: element.case_type,
          label: element.case_type
        })
      })
    },
    pushproject (state, param) {
      console.log('param', param)
      param.forEach(element => {
        state.projects.push({
          value: element.project_name,
          label: element.project_name
        })
      })
    }
  },
  actions: {
    getprjects ({ commit }) {
      axios.get('/api/getproject').then(function (response) {
        if (response.data.success) {
          commit('pushproject', response.data.data)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    gettypes ({ commit }) {
      axios.get('/api/gettype').then(function (response) {
        if (response.data.success) {
          commit('pushtype', response.data.data)
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
})
