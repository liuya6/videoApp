<template>
  <div class="header">
    <i class="iconfont" @click="ifBack(close)">{{
      noLeft ? null : "&#xe6b4;"
    }}</i>
    <div class="title">{{ title }}</div>
    <div :class="noRight ? null : 'right'" @click="$emit('rightClick')">
      <p>{{ right }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["noLeft", "title", "right", "noRight", "rightClick", "close"],
  data() {
    return {};
  },
  methods: {
    ifBack(close) {
      if (close) {
        close();
      } else {
        this.back();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  padding: 0 20px;
  height: 100px;
  line-height: 100px;
  font-size: 40px;
  background: #3a3b4d;
  color: #7d8090;
  position: relative;
  text-align: center;
  i {
    position: absolute;
    left: 20px;
    transform: rotateY(180deg);
    font-size: 60px;
  }
  .right {
    position: absolute;
    top: 0;
    right: 20px;
    min-width: 60px;
    font-size: 32px;
  }
}
</style>
