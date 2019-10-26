<template>
  <div class="set flex">
    <Header title="推广分享获取永久免费观影"></Header>
    <div class="content">
      <div class="main">
        <div class="title">扫码下载XX视频APP</div>
        <p>您的推荐码</p>
        <div class="code">ASHKLOP</div>
      </div>
      <div class="flexS">
        <div class="button b1 flexC">
          保存二维码
          <div>观影+1</div>
        </div>
        <div class="button flexC">复制推广链接</div>
      </div>
      <p class="p1 flexC">看片前请保存官网，被封后可在官网下载新的APP官网</p>
      <p class="p2 flexC">www.baidu.com</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "quickCode",
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
    }
  }
};
</script>

<style scoped lang="less">
.content {
  .main {
    width: 452px;
    height: 685px;
    border-radius: 10px;
    background-image: linear-gradient(#f9f4f4, #f9f4f4),
      linear-gradient(#258dc1, #258dc1);
    margin-left: 149px;
    margin-top: 100px;
    .title {
      margin-left: 64px;
      padding-top: 40px;
      font-size: 36px;
      color: #d9ac73;
    }
    p {
      font-size: 28px;
      color: #7d8090;
      text-align: center;
      padding: 20px 0;
    }
    .code {
      font-size: 66px;
      color: #7d8090;
      text-align: center;
    }
  }
  .flexS {
    margin-top: 40px;
  }
  .button {
    background-image: linear-gradient(0deg, #b68c42 1%, #d9ac73 100%),
      linear-gradient(#258dc1, #258dc1);
    border-radius: 10px;
    width: 314px;
    height: 98px;
    color: #fff;
    font-size: 36px;
    margin-left: 40px;
  }
  .b1 {
    position: relative;
    overflow: hidden;
    div {
      position: absolute;
      left: -28px;
      top: 18px;
      transform: rotate(-45deg);
      font-size: 21px;
      color: #b68c42;
      background: #f6e5cf;
      padding: 0 20px;
    }
  }
  .p1,
  .p2 {
    font-size: 28px;
    color: #7d8090;
  }
  .p1 {
    margin-top: 90px;
  }
  .p2 {
    margin-top: 40px;
  }
}
</style>
