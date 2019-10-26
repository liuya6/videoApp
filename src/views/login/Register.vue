<template>
  <div class="register" v-title="'注册'">
    <Header title="注册"></Header>
    <ul>
      <!-- <li class="inputBox flexS">
        <i class="iconfont">&#xe6bf;</i>
        <input
          type="text"
          placeholder="输入邀请码可增加观影次数"
          v-model="code"
        />
      </li>-->
      <li class="inputBox flexS">
        <i class="iconfont">&#xe6bf;</i>
        <input type="text" placeholder="用户名" v-model="username" />
      </li>
      <!-- <li class="inputBox flexS">
        <i class="iconfont">&#xe6bf;</i>
        <input type="text" placeholder="手机号" v-model="phone" />
      </li> -->
      <!-- <li class="inputBox flexS">
        <i class="iconfont">&#xe6bf;</i>
        <input type="text" placeholder="请输入验证码" v-model="phone" />
        <div class="number" @click="countdown">{{ num }}</div>
      </li>-->

      <li class="inputBox flexS">
        <i class="iconfont">&#xe6bf;</i>
        <input
          :type="showPwd ? 'text' : 'password'"
          placeholder="请输入密码"
          v-model="password"
        />
        <i class="iconfont eye" @click="ifShowPwd" :class="{ showP: showPwd }"
          >&#xe6bf;</i
        >
      </li>
      <li class="inputBox flexS">
        <i class="iconfont">&#xe6bf;</i>
        <input
          :type="showConfirm ? 'text' : 'password'"
          placeholder="请再次确认密码"
          v-model="password_confirm"
        />
        <i
          class="iconfont eye"
          @click="ifShowConfirm"
          :class="{ showP: showConfirm }"
          >&#xe6bf;</i
        >
      </li>
      <li class="inputBox flexS">
        <i class="iconfont">&#xe6bf;</i>
        <input
          type="text"
          placeholder="请输入邀请码(选填)"
          v-model="inviteCode"
        />
      </li>
      <li>
        <i class="iconfont">&#xe6bf;</i>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="verifyCode"
          @keyup.enter="goRegister"
        />
        <div class="yanZ" @click="changeCodeImg">
          <img :src="codeImg" alt="点击重新获取" />
        </div>
      </li>
      <div class="button" @click="goRegister">注册</div>
      <!-- <div class="tip">
        点击“下一步”，即同意
        <span>《用户注册协议》</span>
      </div> -->
      <p @click="$router.replace({ name: 'login' })">已有账号？立即登录</p>
    </ul>
  </div>
</template>

<script>
import { register } from "../../api/index";
export default {
  name: "Register",
  data() {
    return {
      code: "",
      username: "",
      phone: "",
      password: "",
      password_confirm: "",
      inviteCode: "",
      verifyCode: "",
      num: "获取验证码",
      showPwd: false,
      showConfirm: false,
      codeImg: "/index/auth/captcha"
    };
  },
  methods: {
    countdown() {
      this.num = 3;
      let that = this;
      function setTime() {
        console.log(that.num, 111111111);
        if (that.num > 0) {
          that.num--;
        } else {
          that.num = "获取验证码";
          return;
        }
        setTimeout(() => {
          setTime();
        }, 1000);
      }
      setTime();
    },
    goRegister() {
      // if (!this.phone) {
      //   return this.$toast("手机号不能为空");
      // } else {
      //   if (!/^1[023456789]\d{9}$/.test(this.phone)) {
      //     return this.$toast("请输入正确的手机号");
      //   }
      // }
      if (!this.verifyCode) {
        return this.$toast("请输入验证码");
      }
      if (!this.password) {
        return this.$toast("密码不能为空");
      } else {
        if (
          !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,12}$/.test(this.password)
        ) {
          return this.$toast("请按要求填写密码（6~12个包含字母和数字的组合）");
        }
      }
      register({
        username: this.username,
        // mobile: this.phone,
        password: this.password,
        password_confirm: this.password_confirm,
        verifyCode: this.verifyCode,
        inviteCode: this.inviteCode
      }).then(res => {
        console.log(res, "res");
        if (res.code) {
          this.$store.commit("SET_USER_INFO", res.data);
          this.$router.replace({
            path: "/home"
          });
        } else {
          this.changeCodeImg();
        }
        this.$toast(res.msg);
      });
    },
    ifShowPwd() {
      this.showPwd = !this.showPwd;
    },
    ifShowConfirm() {
      this.showConfirm = !this.showConfirm;
    },
    changeCodeImg() {
      this.verifyCode = "";
      this.codeImg = "/index/auth/captcha?" + Math.random();
    }
  }
};
</script>

<style scoped lang="less">
.register {
  background: #3a3b4d;
  min-height: 100%;
}
.header {
  color: #fff;
}
ul {
  padding: 60px 40px 0 40px;
  font-size: 36px;
  li {
    margin-bottom: 40px;
    border-bottom: 2px solid #fff;
    padding: 18px;
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
      color: #7c7d80;
    }
    .eye {
      position: absolute;
      right: 20px;
      color: #7c7d80;
    }
    .number {
      right: 20px;
      position: absolute;
      color: #ff860e;
      font-size: 32px;
      padding: 10px 30px;
      border: 2px solid #fff;
      border-radius: 60px;
    }
    .showP {
      color: #fff;
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
  }
  .button {
    margin-top: 100px;
    padding: 28px 0;
    text-align: center;
    background: #fff;
    color: #ff860e;
    border-radius: 60px;
  }
  .tip {
    color: #fff;
    font-size: 28px;
    text-align: center;
    margin-top: 40px;
    span {
      color: #ff860e;
    }
  }
  p {
    color: #fff;
    position: absolute;
    font-size: 36px;
    bottom: 20px;
    padding-left: 180px;
  }
}
</style>
