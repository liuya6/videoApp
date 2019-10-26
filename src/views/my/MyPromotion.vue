<template>
  <div class="set flex" v-title="'我的推广'">
    <Header title="我的推广"></Header>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: "myPromotion",
  data() {
    return {
      List: [
        {
          title: "昵称",
          info: "张三"
        },
        {
          title: "性别",
          info: ""
        },
        {
          title: "手机号",
          info: ""
        },
        {
          title: "修改手机号",
          info: ""
        }
      ],
      list1: [],
      show: false,
      value: ""
    };
  },
  methods: {
    log(l, i) {
      console.log(l, i, "log,l,i");
    }
  }
};
</script>

<style scoped lang="less">
.content {
}
</style>
