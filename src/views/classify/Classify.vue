<template>
  <div class="classify" v-title="'频道'">
    <van-tabs
      v-model="active"
      @change="changeTab"
      title-active-color="#eb623f"
      color="#eb623f"
      sticky
      swipeable
    >
      <van-tab
        v-for="(item, i) in tabList"
        :key="i"
        :title="item.title"
        :name="item.type"
      >
        <component :is="item.type"></component>
      </van-tab>
    </van-tabs>
    <Footer></Footer>
  </div>
</template>

<script>
const tabList = [
  { title: "专栏推荐", type: "Recommend" },
  { title: "标签筛选", type: "Select" }
];
export default {
  name: "Classify",
  data() {
    return {
      tabList,
      active: "Recommend"
    };
  },
  activated() {
    console.log(this.$route.params);
    this.active = this.$route.params.mode;
  },
  methods: {
    changeTab(type) {
      sessionStorage.setItem("classifyMode", type);
      this.$router.replace({
        name: "classify",
        params: { mode: type, id: this.$route.params.id }
      });
    }
  }
};
</script>

<style scoped lang="less">
.classify {
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
  }
}
</style>
