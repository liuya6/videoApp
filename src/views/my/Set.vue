<template>
  <div class="set flex" v-title="'个人设置'">
    <Header title="设置"></Header>
    <div class="content">
      <div class="li flexB space" @click="[(txChange = true), (avatarId = '')]">
        <p>头像</p>
        <div class="flexB">
          <img v-if="userInfo" :src="userInfo.avatar" alt />
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
            <span>{{ item.value }}</span>
            <i v-if="i != 3" class="iconfont">&#xe6b4;</i>
          </div>
        </li>
      </ul>
      <div class="loginOut">
        <van-button @click="LoginOut">
          <i class="iconfont">&#xe6b7;</i>
          <span>退出登录</span>
        </van-button>
      </div>
    </div>
    <div class="alerWrap" v-show="show">
      <div class="alert">
        <div class="top flexS">{{ "修改" + activeItem }}</div>
        <div class="middle" v-if="activeItem == '性别'">
          <van-radio-group v-model="radio" class="flexC">
            <van-radio name="1" checked-color="#07c160">男</van-radio>
            <van-radio name="2" checked-color="#07c160">女</van-radio>
          </van-radio-group>
        </div>
        <div class="middle" v-else>
          <input
            type="text"
            :placeholder="'请输入' + activeItem"
            v-model="value"
          />
          <p class="tip" v-show="activeItem == '昵称'">
            1-7个字符，支持中文，英文，数字和下划线
          </p>
        </div>
        <div class="bottom flexC">
          <div @click="cancel" class="flexC">取消</div>
          <div @click="confirm(activeItem, activeIndex)" class="flexC">
            确认
          </div>
        </div>
      </div>
    </div>

    <van-popup v-model="txChange" class="txPopup">
      <div>
        <div class="title">选择头像</div>
        <van-swipe
          :autoplay="0"
          @change="handleChange"
          :show-indicators="false"
        >
          <van-swipe-item v-for="(item, i) in txList" :key="i">
            <ul>
              <li
                v-for="(child, j) in item"
                :key="j"
                :class="{ on: avatarId == child.id }"
                @click="avatarId = child.id"
              >
                <img v-lazy="child.avatar" alt />
              </li>
            </ul>
          </van-swipe-item>
        </van-swipe>
        <div class="page">{{ current }}/{{ txList.length }}</div>
        <div class="btn" @click="changeUserAvatar">
          <van-button>确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { userSet, setting } from "../../api";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "set",
  data() {
    return {
      img: "../../assets/images/user.png",
      List: [
        { title: "昵称", value: "" },
        { title: "邮箱", value: "" },
        { title: "性别", value: "" }
        // { title: "修改手机号", value: "" }
      ],
      activeItem: "",
      activeIndex: "",
      nickname: "",
      email: "",
      gender: "",
      mobile: "",
      show: false,
      value: "",
      radio: "1",
      query: [],
      renderList: [],
      txChange: false,
      avatarId: "",
      current: 1
    };
  },
  created() {
    this.List[0].value = this.userInfo.nickname;
    this.List[1].value = this.userInfo.email;
    this.List[2].value = this.userInfo.gender == 2 ? "女" : "男";
    // this.List[3].value = this.userInfo.mobile;
  },
  computed: {
    ...mapGetters(["userInfo", "setting"]),
    txList() {
      let showNum = 9;
      let num = 0;
      let txList = [];
      console.log(this.setting.avatarList, "this.setting.avatarList");
      for (let i = 0; i < this.setting.avatarList.length / showNum; i++) {
        txList[i] = [];
        let count = 0;
        for (let j = num; j < this.setting.avatarList.length; j++) {
          count++;
          txList[i].push(this.setting.avatarList[j]);
          if (count === showNum) {
            num += showNum;
            break;
          }
        }
      }
      console.log(txList, "txList");

      return txList;
    }
  },
  methods: {
    ...mapMutations(["CLEAR_USER_INFO"]),
    easyType(title) {
      if (title == "昵称") {
        this.value = this.userInfo.nickname;
      } else if (title == "邮箱") {
        this.value = this.userInfo.email;
      } else if (title == "性别") {
        return (this.radio = this.userInfo.gender.toString());
      }
      // else if (title == "修改手机号") {
      //   return this.userInfo.mobile;
      // }
    },
    change(title, i) {
      if (title == "修改手机号") return;
      this.easyType(title);
      this.activeItem = title;
      this.activeIndex = i;
      this.show = true;
    },
    cancel() {
      this.show = false;
    },
    confirm(activeItem, i) {
      if (activeItem == "昵称") {
        if (!this.value) {
          return this.$toast("昵称不能为空");
        }
        this.query.nickname = this.value;
      } else if (activeItem == "邮箱") {
        if (!this.value) {
          return this.$toast("邮箱不能为空");
        }
        this.query.email = this.value;
      } else if (activeItem == "性别") {
        if (!this.radio) {
          return this.$toast("性别不能为空");
        }
        this.query.gender = this.radio;
      } else if (activeItem == "修改手机号") {
        if (!this.mobile) {
          return this.$toast("手机号不能为空");
        }
        this.query.mobile = this.mobile;
      }
      // console.log(this.radio,'this.radio')
      // return
      userSet(this.query).then(res => {
        if (res.code) {
          console.log(res.data, "userSet");
          if (activeItem == "性别") {
            this.List[i].value = this.radio == 2 ? "女" : "男";
          } else {
            this.List[i].value = this.value;
          }
        }
        this.$toast(res.msg);
      });
      this.show = false;
      this.query = [];
    },
    LoginOut() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定退出账号吗?"
        })
        .then(() => {
          this.CLEAR_USER_INFO();
          this.$router.replace({
            name: "login",
            query: {
              redirect: "/"
            }
          });
          loginOut().then(res => {
            console.log(res, "loginOut");
            sessionStorage.clear();
            this.$toast(res.data);
          });
        })
        .catch(() => {
          console.log("取消");
        });
    },

    changeUserAvatar() {
      console.log(this.avatarId, "this.avatarId");
      if (this.avatarId) {
        userSet({ avatar: this.avatarId }).then(res => {
          this.$toast(res.msg);
          if (res.code) {
            this.txChange = false;
            this.$store.dispatch("getUserMy");
          }
        });
      } else {
        this.txChange = false;
      }
    },
    handleChange(i) {
      this.current = i + 1;
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
    border-radius: 50%;
  }
  .li {
    height: 92px;
    padding: 6px 20px;
    background: #2f3247;
    border-bottom: 2px solid #1d1f30;
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
  .loginOut {
    margin: 60px auto 100px;
    width: 690px;
    height: 90px;
    text-align: center;
    i {
      font-size: 35px;
      display: inline-block;
      vertical-align: top;
      margin-right: 5px;
    }
    .van-button {
      // border-radius: 14px;
      background: #4a4e6e;
      border: 0;
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: 28px;
      line-height: 90px;
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
      .van-radio-group {
        padding: 20px 0;
        .van-radio {
          padding: 0 30px;
          font-size: 40px;
        }
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

.txPopup {
  width: 510px;
  text-align: center;
  border-radius: 10px;
  .title {
    font-size: 32px;
    padding-top: 30px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-left: 25px;
    padding-bottom: 10px;
    li {
      flex: 0 0 auto;
      width: 150px;
      height: 150px;
      box-sizing: border-box;
      border: 2px solid transparent; /*no*/
      margin: 2px;
      &.on {
        border-color: #fea24d;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .btn {
    margin-top: 10px;
    border-top: 1px solid #f0f0f0; /*no*/
    .van-button {
      border-top: 1px solid #f0f0f0;
      width: 100%;
      font-size: 30px;
      color: #108ee9;
    }
  }
}
</style>
