<template>
  <div class="set flex" v-title="'vip'">
    <Header
      title="推广"
      right="我的推广"
      @rightClick="$router.push({ name: 'myPromotion' })"
    ></Header>
    <div class="bg"></div>
    <img class="bgimg" src="../../assets/images/bg.png" alt />
    <div class="content">
      <div class="userCard">
        <div class="user1 flexB">
          <img src="../../assets/images/user.png" alt />
          <div>
            <p class="userName">我是张三</p>
            <p class="userCode">我的邀请码：LCP9VM</p>
          </div>
          <i @click="$router.push({ name: 'quickCode' })" class="iconfont"
            >&#xe6be;</i
          >
        </div>
        <div class="user2 flexA">
          <div>
            <p>Leave 1</p>
            <p>入门</p>
          </div>
          <div class="lineBox">
            <div class="line">
              <div
                class="line1"
                :style="{ width: (people / totalPeople) * 46 + '%' }"
              ></div>
            </div>
            <p>距离下一等级还差1人</p>
          </div>
          <div>
            <p>Leave 2</p>
            <p>进阶</p>
          </div>
        </div>
      </div>
      <div class="box box1">
        <div class>
          <div class="times">无限</div>
          <p>今日可观影次数</p>
        </div>
        <div class>
          <div class="times">无限</div>
          <p>今日可观影次数</p>
        </div>
      </div>
      <div class="box box2">
        <div class="titleColor">每日任务</div>
        <p>每日点击广告，当日观影次数+999，次数不累计</p>
      </div>
      <div class="box box3">
        <div class="titleColor">推广任务</div>
        <p>
          推广给好友成功下载APP并打开或注册时好友填
          写你的邀请码，可以永久增加每日观影次数及缓
          存次数。每日缓存次数同推广人数。+999，次数不累计
        </p>
        <div class="task flexS" v-for="(item, i) in taskList" :key="i">
          <img :src="item.img" alt />
          <div>
            <div class="taskTitle">{{ item.title }}</div>
            <p class="taskP">
              推广
              <span>{{ item.info }}</span
              >每日观影次数 <span>{{ item.info1 }}</span
              >，缓存次数
              <span>{{ item.info2 }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="box box4">
        <div class="titleColor">福利任务</div>
        <div>
          <div></div>
          <ul>
            <li v-for="(item, i) in welfareList" :key="i">
              <div class="title">{{ item.title }}</div>
              <div class="main">
                <p>
                  {{ item.p1 }}
                  <span>{{ item.num1 }}</span>
                </p>
                <p>
                  {{ item.p2 }}
                  <span>{{ item.num2 }}</span>
                </p>
                <span>{{ item.span }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="button">立刻推广</div>
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return {
      list1: [],
      people: 1,
      totalPeople: 2,
      taskList: [
        {
          img: "/images/rumen.png",
          title: "入门徽章",
          info: "1",
          info1: "+2",
          info2: "+1"
        },
        {
          img: "/images/jinjie.png",
          title: "进阶徽章",
          info: "3",
          info1: "+5",
          info2: "+3"
        },
        {
          img: "/images/daren.png",
          title: "达人徽章",
          info: "10",
          info1: "+30",
          info2: "+10"
        },
        {
          img: "/images/zhuanjia.png",
          title: "专家徽章",
          info: "30",
          info1: "+50",
          info2: "+30"
        },
        {
          img: "/images/jiaoshou.png",
          title: "教授徽章",
          info: "50",
          info1: "+无限",
          info2: "+50"
        }
      ],
      welfareList: [
        {
          title: "1.用户名注册",
          p1: "用户名注册,每日观影次数",
          num1: "+2",
          p2: "用户名注册并绑定手机号，每日观影次数",
          num2: "+4",
          span: ""
        },
        {
          title: "2.手机号注册",
          p1: "手机号注册,每日观影次数",
          num1: "+4",
          p2: "",
          num2: "",
          span:
            ",(*为防止APP被封丢失您的推广信息，可通过注册账号绑定推广人数，强烈建议注册*)"
        },
        {
          title: "3.填写邀请码",
          p1: "注册并填写好友邀请码，每日观影次数",
          num1: "+2",
          p2: "",
          num2: "",
          span: ""
        },
        {
          title: "4.保存二维码",
          p1: "保存推广二维码，每日观影次数",
          num1: "+1",
          p2: "",
          num2: "",
          span: ""
        }
      ]
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
.set {
  width: 100%;
  overflow: hidden;
}
.bg {
  position: absolute;
  top: 90px;
  z-index: -2;
  width: 100%;
  height: 90px;
  background: #3a3b4d;
}
.bgimg {
  z-index: -1;
  width: 100%;
  position: absolute;
  top: 180px;
}
.content {
  position: relative;
  padding: 30px 40px 100px 40px;
  .userCard {
    margin-top: 10px;
    width: 590px;
    height: 260px;
    padding: 40px;
    font-size: 28px;
    color: #8e5d11;
    margin-bottom: 20px;
    background-image: linear-gradient(0deg, #b68c42 1%, #d9ac73 100%),
      linear-gradient(#f7f7ef, #f7f7ef);
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px #b68c42;
    img {
      width: 124px;
    }
    i {
      font-size: 70px;
    }
    .user1 {
      // margin-bottom: 20px;
      > div {
        width: 340px;
      }
      .userName {
        font-size: 36px;
      }
    }
    .user2 {
      text-align: center;
      .lineBox {
        padding-top: 60px;
        .line {
          width: 345px;
          height: 2px;
          background: #e9c386;
          margin-bottom: 20px;
          .line1 {
            position: absolute;
            height: 2px;
            background: #8e5d11;
          }
        }
      }
    }
  }
  .box {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 0.346667rem 0.013333rem rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
    p {
      color: #999999;
      font-size: 26px;
    }
  }
  .box1 {
    display: flex;
    padding: 25px 0;
    > div {
      width: 50%;
      text-align: center;
    }
    > div:first-child {
      border-right: 1px solid #dcdcdc;
    }
    .times {
      font-size: 60px;
      color: #8e5d11;
    }
  }
  .box2,
  .box3,
  .box4 {
    padding: 34px;
  }
  .box3 {
    .task {
      font-size: 28px;
      padding: 36px 0;
      img {
        margin-right: 10px;
        width: 100px;
      }
      .taskTitle {
        color: #666666;
        margin-bottom: 18px;
      }
      .taskP {
        font-size: 24px;
        color: #999999;
        span {
          color: #8e5d11;
        }
      }
    }
  }
  .box4 {
    font-size: 28px;
    .titleColor {
      margin-bottom: 30px;
    }
    li {
      border-radius: 8px;
      margin-bottom: 20px;
      width: 100%;
      overflow: hidden;
      .title {
        background: #fceedb;
        color: #8e5d11;
        height: 68px;
        line-height: 68px;
      }
      .main {
        background: #f7f7ef;
        padding: 10px;
        p {
          color: #666666;
          padding: 8px;
          span {
            color: #8e5d11;
          }
        }
        > span {
          color: #999999;
        }
      }
    }
  }
  .titleColor {
    font-size: 36px;
    color: #8e5d11;
    margin-bottom: 10px;
  }
}
.button {
  position: absolute;
  bottom: 0;
  font-size: 28px;
  color: #fff;
  background: #3a3b4d;
  width: 750px;
  height: 97px;
  line-height: 97px;
  text-align: center;
}
</style>
