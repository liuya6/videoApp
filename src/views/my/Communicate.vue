<template>
  <div class="set flex">
    <Header title="设置"></Header>
    <div class="content">
      <div class="li flexB space">
        <p>头像</p>
        <div class="flexB">
          <img :src="img" alt />
          <i class="iconfont">&#xe6b4;</i>
        </div>
      </div>
      <ul>
        <li
          class="li flexB"
          v-for="(item, i) in List"
          @click="change(item.title, i)"
          :key="i"
        >
          <p>{{ item.title }}</p>
          <div class="flexB">
            <span>{{ item.info }}</span>
            <i v-if="i != 2" class="iconfont">&#xe6b4;</i>
          </div>
        </li>
      </ul>
    </div>
    <div class="alerWrap" v-show="show">
      <div class="alert">
        <div class="top flexS">
          {{ list1[1] == 3 ? list1[0] : "修改" + list1[0] }}
        </div>
        <div class="middle">
          <input type="text" placeholder="请输入" v-model="value" />
          <p class="tip" v-show="list1[1] == 0">
            1-7个字符，支持中文，英文，数字和下划线
          </p>
        </div>
        <div class="bottom flexC">
          <div @click="cancel" class="flexC">取消</div>
          <div @click="confirm" class="flexC">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return {
      img: "../../assets/images/user.png",
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
    },
    change(l, i) {
      if (i == 2) return;
      this.list1.push(l, i);
      console.log(this.list1, "list1");
      this.show = true;
    },
    cancel() {
      this.show = false;
      this.list1 = [];
    },
    confirm() {
      this.show = false;
      this.list1 = [];
    }
  }
};
</script>

<style scoped lang="less">
.content {
  background: #1d1f30;
  .space {
    margin: 20px 0;
  }
  img {
    width: 92px;
  }
  .li {
    height: 92px;
    padding: 6px 20px;
    background: #2f3247;
    border-bottom: 1px solid #1d1f30;
    p {
      color: #fff;
      font-size: 34px;
    }
    span {
      font-size: 28px;
      color: #999999;
      margin-right: 10px;
    }
    i {
      font-size: 38px;
      color: #999999;
    }
  }
}
.alerWrap {
  position: fixed;
  width: 100%;
  height: 100%;
  .alert {
    position: absolute;
    left: 40px;
    top: 340px;
    width: 670px;
    height: 439px;
    .top {
      height: 115px;
      padding-left: 40px;
      background: #1d1f30;
      font-size: 36px;
      color: #d9ac73;
      //   background-image:-webkit-linear-gradient(#b68c42, #d9ac73);
      // -webkit-background-clip:text;
      // -webkit-text-fill-color:transparent;
    }
    .middle {
      // height: 210px;
      padding: 40px;
      background: #fff;
      input {
        padding-left: 40px;
        width: 550px;
        height: 93px;
        font-size: 36px;
        border-radius: 50px;
        border: 2px solid #dcdcdc;
      }
    }
    .bottom {
      height: 114px;
      background: #fff;
      border-top: 1px solid #dcdcdc;
      div {
        width: 50%;
        height: 100%;
        font-size: 36px;
      }
      div:first-child {
        border-right: 1px solid #dcdcdc;
      }
    }
    .tip {
      color: #999999;
      font-size: 28px;
      padding-top: 26px;
      text-align: center;
    }
  }
}
</style>
