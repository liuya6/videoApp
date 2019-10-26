<template>
  <div class="login flex" v-title="'登录'">
    <Header title="登录"></Header>
    <div class="content">
      <div class="main">
        <div class="logo"><span>Logo</span>黄瓜视频</div>
        <ul>
          <li class="inputBox flexS">
            <i class="iconfont">&#xe6bf;</i>
            <input type="text" placeholder="手机号" v-model="username" />
          </li>
          <li class="inputBox flexS">
            <i class="iconfont">&#xe6bf;</i>
            <input
              :type="showPwd ? 'text' : 'password'"
              placeholder="密码"
              v-model="password"
            />
            <i
              class="iconfont eye"
              :class="{ showP: showPwd }"
              @click="ifShowPwd"
              >&#xe6bf;</i
            >
          </li>
          <li>
            <i class="iconfont">&#xe6bf;</i>
            <input
              type="text"
              placeholder="请输入验证码"
              v-model="verifyCode"
              @keyup.enter="goLogin"
            />
            <div class="yanZ" @click="changeCodeImg">
              <img :src="codeImg" alt="点击重新获取" />
            </div>
          </li>
        </ul>
        <div class="forget">忘记密码？</div>
        <div class="button" @click="goLogin">登录</div>
      </div>
    </div>
    <div class="bottom">
      <img src="../../assets/images/loginBg.png" alt />
      <div class="register">
        <div @click="$router.push({ name: 'register' })">注册账号</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from "../../api/index";
import { Base64 } from "js-base64";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      verifyCode: "",
      codeImg: "/index/auth/captcha",
      showPwd: false
    };
  },
  created() {
    this.username = this.$cookies.get("username")
      ? Base64.decode(this.$cookies.get("username"))
      : "";
    if (this.$cookies.get("password")) {
      this.password = Base64.decode(this.$cookies.get("password"));
    }
  },
  methods: {
    ...mapActions(["getUserMy"]),
    goLogin() {
      if (!this.username) {
        return this.$toast("用户名不能为空");
      }
      if (!this.password) {
        return this.$toast("密码不能为空");
      }
      if (!this.verifyCode) {
        return this.$toast("请输入验证码");
      }
      this.$cookies.set("username", Base64.encode(this.username), "7d");
      this.$cookies.set("password", Base64.encode(this.password), "7d");
      Login({
        username: this.username,
        password: this.password,
        verifyCode: this.verifyCode
      }).then(res => {
        if (res.code) {
          console.log(res.data, "goLogin()");
          this.$store.commit("SET_USER_INFO", 1);
          this.getUserMy();
          this.$router.replace({
            path: this.$route.query.redirect || "/home"
          });
        } else {
          this.changeCodeImg();
        }
        this.$toast(res.msg);
      });
    },
    changeCodeImg() {
      this.verifyCode = "";
      this.codeImg = "/index/auth/captcha?" + Math.random();
    },
    ifShowPwd() {
      this.showPwd = !this.showPwd;
    }
  }
};
</script>

<style scoped lang="less">
.login {
  background: url("/images/loginbg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  font-size: 36px;
  .header {
    color: #fff;
    background: transparent;
  }
  .content {
    .main {
      margin: 80px 40px 0 50px;
      .logo {
        color: #fff;
        font-size: 60px;
        margin-bottom: 100px;
        span {
          font-size: 46px;
          margin-right: 14px;
        }
      }
      ul {
        li {
          margin-bottom: 50px;
          border-bottom: 4px solid rgba(255, 255, 255, 0.3);
          padding: 10px;
          position: relative;
          i {
            font-size: 45px;
            color: #fff;
          }
          input {
            background: none;
            border: 0;
            color: #fff;
            height: 60px;
            line-height: 60px;
            font-size: 34px;
            margin-left: 23px;
            width: 470px;
          }
          input::-webkit-input-placeholder {
            color: #ffddab;
          }
          .eye {
            position: absolute;
            right: 20px;
            color: #000;
            display: block;
          }
          .yanZ {
            width: 192px;
            height: 64px;
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translate(0, -50%);
            color: #fff;
            font-size: 27px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .showP {
            color: #fff;
          }
        }
      }
      .forget {
        text-align: right;
        color: #ffddab;
      }
      .button {
        margin: 100px 0;
        padding: 30px 0;
        text-align: center;
        background: #fff;
        color: #ff860e;
        border-radius: 60px;
      }
    }
  }
  .bottom {
    width: 100%;
    img {
      width: 100%;
    }
    .register {
      width: 100%;
      height: 74px;
      background: #3a3b4d;
      color: #fff;
      div {
        position: absolute;
        z-index: 1;
        left: 304px;
        bottom: 40px;
      }
    }
  }
}
</style>
