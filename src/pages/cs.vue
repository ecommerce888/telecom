<template>
    <div class="page">cs</div>
</template>

<script>
import { querystring } from "vux";

export default {
  components: {
    querystring
  },
  props: {},
  data() {
    return {};
  },
  watch: {
    //观察Vue实例上的数据变动
  },
  computed: {
    //DOM加载后马上执行能够缓存数据
  },
  methods: {
    //触发事件
  },
  created() {
    //页面渲染前调用
  },
  mounted() {
    //页面渲染完成调用
    console.log(window.location.href)
  }
};
</script>
<style lang="less" scoped>
</style>