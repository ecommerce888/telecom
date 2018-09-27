<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
    <group>
      <x-input title="title" v-model="value" is-type="china-mobile"></x-input>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XInput } from "vux";

export default {
  components: {
    Group,
    Cell,
    XInput,
    
  },
  data() {
    return {
      value: "",
      msg: "Hello World!"
    };
  },
  mounted() {
    //页面渲染完成调用
    
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
