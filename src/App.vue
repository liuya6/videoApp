<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如详情B页面-->
    </router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("settings");
    this.$store.dispatch("checkedLogin");
  },
  computed: {
    ...mapGetters(["webName"])
  },
  watch: {
    $route(newRouter) {
      if (newRouter.meta.keepAlive) {
        let documentTitles = newRouter.meta.DocumentTitle
          ? newRouter.meta.DocumentTitle + "-" + this.webName
          : this.webName;
        document.title = documentTitles;
        console.log(documentTitles + "===>" + newRouter.name);
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
