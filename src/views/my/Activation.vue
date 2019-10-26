<template>
  <div class="set flex" v-title="'激活码兑换'">
    <Header title="激活码兑换"></Header>
    <div class="content">
      <div class="rule">
        <div class="flexC">规则说明</div>
        <p>兑换后，立即获得对应奖励</p>
      </div>
      <div class="mian flexB">
        <input type="text" placeholder="请输入右边验证码" v-model="value" />
        <div class="flexC">991</div>
      </div>
      <input
        class="input"
        type="text"
        placeholder="请输入12位激活码"
        v-model="value"
      />
      <div @click="exchange(value)" class="button flexC">立即兑换</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "activation",
  data() {
    return {
      list1: [],
      show: false,
      value: ""
    };
  },
  methods: {
    log(l, i) {
      console.log(l, i, "log,l,i");
    },
    exchange(value) {}
  }
};
</script>

<style scoped lang="less">
.content {
  font-size: 34px;
  padding: 40px;
  .rule {
    margin-bottom: 40px;
    width: 670px;
    height: 174px;
    background-color: #eae4d6;
    div {
      width: 197px;
      height: 61px;
      background: #e0cca9;
      color: #f7f7ef;
      margin-left: 237px;
    }
    p {
      color: #666666;
      text-align: center;
      margin-top: 40px;
    }
  }
  .mian {
    padding: 40px 0;
    background: #fff;
    input {
      width: 396px;
      border: 2px solid #dcdcdc;
    }
    div {
      width: 212px;
      height: 88px;
      border-radius: 50px;
      background: #ededed;
      color: #666666;
    }
  }
  input {
    padding-left: 40px;
    height: 88px;
    border-radius: 50px;
    border: 2px solid #dcdcdc;
  }
  .input {
    width: 630px;
  }
  .button {
    border-radius: 50px;
    background-image: linear-gradient(-90deg, #eb623f 0%, #f7d185 100%),
      linear-gradient(#f7f7ef, #f7f7ef);
    width: 670px;
    height: 88px;
    margin-top: 60px;
    color: #fff;
  }
}
</style>
