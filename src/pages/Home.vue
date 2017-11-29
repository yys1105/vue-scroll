<script>
  import Scroll from '../components/common/Scroll'
  import BScroll from 'better-scroll'

  export default {
    name: 'home',
    components: {
      Scroll
    },
    data() {
      return {
        data: [],
        pulldown: true,
        pullup: true
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        this.$httpGet('/list',{}).then((res) => {
          this.data = res.data.list.concat(this.data)
        })
      },
      moreload(){
        this.$httpGet('/list',{}).then((res) => {
          this.data = res.data.list.concat(this.data)
        })
      }
    }
  }
</script>

<template>
  <scroll class="wrapper"
          :data="data"
          :pulldown="pulldown"
          :pullup="pullup"
          @pulldown="loadData"
          @scrollToEnd="moreload">
    <ul class="content">
      <li v-for="item in data" class="li-style">{{item.name}}</li>
    </ul>
    <div class="loading-wrapper"></div>
  </scroll>
</template>

<style lang="stylus" scoped>
  .wrapper
    height 100%
  .li-style
    height 60px
</style>
