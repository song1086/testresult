<template>
  <router-view></router-view>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  beforeMount () {
    this.gettypes()
    this.getprjects()
  },
  methods: {
    ...mapActions([
      'gettypes',
      'getprjects'
    ])
  }
}
</script>
