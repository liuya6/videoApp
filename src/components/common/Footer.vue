<template>
  <div class="footer">
    <ul>
      <li
        v-for="(item, i) in FooterArr"
        :key="i"
        @click="changeRouter(item.name)"
      >
        <div>
          <img
            :src="
              require(`../../assets/images/${item.name}_${
                active === item.name ? 'on' : 'off'
              }.png`)
            "
            alt=""
          />
        </div>
        <p :class="{ on: active === item.name }">{{ item.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
const FooterArr = [
  { name: "home", text: "首页" },
  { name: "classify", text: "频道" },
  { name: "find", text: "发现" },
  { name: "my", text: "我的" }
];
export default {
  name: "Footer",
  data() {
    return {
      FooterArr
    };
  },
  computed: {
    active() {
      return this.$router.currentRoute.name;
    }
  },
  methods: {
    changeRouter(routerName) {
      let obj = null;
      if (routerName === "classify") {
        let modes = "Recommend";
        if (sessionStorage.getItem("classifyMode")) {
          modes = sessionStorage.getItem("classifyMode");
        }
        obj = {
          params: {
            mode: modes
          }
        };
      }
      this.$router.push({ name: routerName, ...obj });
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  height: 102px;
  font-size: 23px;
  ul {
    height: 100%;
    overflow: hidden;
    background: #414453;
    border-radius: 40px 40px 0 0;
    box-shadow: 0px -1px 10px 0px rgba(4, 0, 0, 0.4);
    li {
      float: left;
      width: 25%;
      text-align: center;
      color: #9c9fae;
      div {
        width: 47px;
        display: inline-block;
        height: 65px;
        line-height: 65px;
        img {
          display: inline-block;
          width: 100%;
          vertical-align: middle;
        }
      }
      p {
        &.on {
          color: #fff;
        }
      }
    }
  }
}
</style>
