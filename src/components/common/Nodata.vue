<template>
  <div class="notData">
    <div class="content_box">
      <div>
        <p>
          <img src="/images/noData.png" alt="记录为空" />
        </p>
        <h4>暂无记录</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nodata",
  //   props: ["noLeft",],
  data() {
    return {};
  }
};
</script>
<style scoped lang="less">
.notData {
  // width: 100%;
  .content_box {
    margin-top: 300px;
    div {
      p {
        text-align: center;
        img {
          width: 280px;
          height: 100%;
          display: inline-block;
        }
      }
      h4 {
        white-space: normal;
        color: #666;
        font-size: 30px;
        line-height: 80px;
        font-weight: bold;
        text-align: center;
      }
      p {
        font-size: 28px;
        color: #bebebe;
      }
    }
  }
}
</style>
