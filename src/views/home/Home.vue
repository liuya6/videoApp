<template>
  <div class="home" v-title="''">
    <div class="top">
      <div class="left" @click="$router.push({ name: 'search' })">
        <span>
          <img src="/images/search.png" alt />
        </span>
        <input type="text" placeholder="输入关键词查找片源" readonly />
      </div>
      <div class="right">
        <!--        <i class="iconfont">&#xe6ae;</i>-->
        <!--        <i class="iconfont">&#xe6af;</i>-->
        <i class="iconfont" @click="$router.push({ name: 'history' })"
          >&#xe6b3;</i
        >
      </div>
    </div>
    <div class="homeContent">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="slider-container">
          <div class="slider-content">
            <div
              class="slider"
              v-for="(item, i) in banner"
              :key="i"
              :class="[
                { active: activeIndex === i },
                {
                  prev:
                    activeIndex - 1 < 0
                      ? banner.length - 1 === i
                      : activeIndex - 1 === i
                },
                {
                  next:
                    activeIndex + 1 >= banner.length
                      ? i === 0
                      : activeIndex + 1 === i
                }
              ]"
            >
              <img :src="item.imgUrl" alt />
            </div>
            <ul class="sliderCode">
              <li
                v-for="j in banner.length"
                :key="j"
                :class="{ active: activeIndex == j - 1 }"
              ></li>
            </ul>
          </div>
        </div>
        <div class="classify">
          <ul>
            <li
              v-for="(item, i) in channel"
              :key="i"
              @click="
                $router.push({
                  name: 'allmovie',
                  params: { channelId: item.id, orderby: 'all' }
                })
              "
            >
              <div
                :style="`background: linear-gradient(${classifyList[i].bg})`"
              >
                <img :src="item.icon" alt />
              </div>
              <p>{{ item.title }}</p>
            </li>
          </ul>
        </div>
        <div class="new-movie">
          <div class="new-movie-top">
            <span>最新片源</span>
            <span
              @click="
                $router.push({
                  name: 'allmovie',
                  params: { channelId: '0', orderby: 'new' }
                })
              "
            >
              更多
              <i class="iconfont">&#xe6b4;</i>
            </span>
          </div>
          <ul>
            <li
              v-for="(item, i) in newList"
              :key="i"
              @click="
                $router.push({ name: 'playing', query: { movieId: item.id } })
              "
            >
              <div>
                <img :src="item.coverImg" alt />
              </div>
              <p>{{ item.title }}</p>
              <div class="vipMovie" v-show="item.access == '1'">
                <img
                  src="../../assets/images/vipMovie.png"
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
            </li>
          </ul>
        </div>
        <div class="separate"></div>
        <div class="hot-movie">
          <div class="hot-movie-top">重磅热播</div>
          <ul>
            <li
              v-for="(item, i) in hot"
              :key="i"
              @click="
                $router.push({ name: 'playing', query: { movieId: item.id } })
              "
            >
              <div>
                <img :src="item.coverImg" alt />
              </div>
              <p>{{ item.title }}</p>
              <div class="vipMovie" v-show="item.access == '1'">
                <img
                  src="../../assets/images/vipMovie.png"
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
            </li>
          </ul>
          <div class="hot-movie-btm">
            <van-button
              @click="
                $router.push({
                  name: 'allmovie',
                  params: { channelId: '0', orderby: 'play' }
                })
              "
            >
              更多热播
              <i class="iconfont">&#xe6b4;</i>
            </van-button>
            <van-button @click="changeHots">
              换一换
              <i class="iconfont">&#xe6b5;</i>
            </van-button>
          </div>
        </div>
        <div class="separate"></div>
        <div class="like-movie">
          <div class="like-movie-top">猜你喜欢</div>
          <ul>
            <li
              v-for="(item, i) in guessYouLike"
              :key="i"
              @click="
                $router.push({ name: 'playing', query: { movieId: item.id } })
              "
            >
              <div>
                <img :src="item.coverImg" alt />
              </div>
              <p>{{ item.title }}</p>
              <div class="vipMovie" v-show="item.access == '1'">
                <img
                  src="../../assets/images/vipMovie.png"
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
            </li>
          </ul>
        </div>
        <!--        <div class="separate"></div>-->
        <!--        <div class="china-movie">-->
        <!--          <div class="china-movie-top">中文字幕</div>-->
        <!--          <ul>-->
        <!--            <li v-for="i in 6" :key="i">-->
        <!--              <div>-->
        <!--                <img src="/images/banner-1.jpg" alt />-->
        <!--              </div>-->
        <!--              <p>代号“画家”为首的啊阿斯顿撒旦撒旦</p>-->
        <!--            </li>-->
        <!--          </ul>-->
        <!--        </div>-->
      </van-pull-refresh>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
const classifyList = [
  { title: "无码", bg: "#ffcd02,#ffb92f" },
  { title: "各行各业", bg: "#ff9966,#ff5e62" },
  { title: "辣妹大奶", bg: "#00f1cc,#00cfcf" },
  { title: "角色扮演", bg: "#ff66b3,#ff445c" },
  { title: "制服诱惑", bg: "#fcc200,#ffa405" },
  { title: "人妻熟女", bg: "#fd73ea,#de55fe" },
  { title: "美少女", bg: "#00dfff,#00a9fa" },
  { title: "全部", bg: "#c07eff,#9a6aff" }
];
// import { mapGetters, mapActions } from "vuex";
import { indexHome, changeHot } from "../../api";

export default {
  name: "home",
  data() {
    return {
      classifyList,
      loading: true,
      topStatus: "",
      activeIndex: 1,
      banner: [],
      channel: [],
      newList: [],
      hot: [],
      topic: [],
      guessYouLike: []
    };
  },
  created() {
    indexHome().then(res => {
      console.log(res);
      this.banner = res.data.banner;
      this.channel = res.data.channel;
      this.newList = res.data.new;
      this.hot = res.data.hot;
      this.topic = res.data.topic;
      this.guessYouLike = res.data.guessYouLike;
      this.changeBanner();
    });
  },
  methods: {
    changeHots() {
      changeHot().then(res => {
        console.log(res);
        if (res.code) {
          this.hot = res.data.list;
        }
      });
    },
    changeBanner() {
      let Slider = document.getElementsByClassName("slider-container")[0];
      let startX;
      let endX;
      let that = this;
      let MaxLength = this.banner.length;
      console.log(MaxLength, "MaxLength");
      Slider.addEventListener("touchstart", function(e) {
        e = window.event || e;
        startX = e.changedTouches[0].clientX;
        clearInterval(that.bannerTimer);
      });
      Slider.addEventListener("touchend", function(e) {
        e = window.event || e;
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 20) {
          that.activeIndex += 1;
          if (that.activeIndex >= MaxLength) {
            that.activeIndex = 0;
          }
        } else if (startX - endX <= -20) {
          that.activeIndex -= 1;
          if (that.activeIndex < 0) {
            that.activeIndex = MaxLength - 1;
          }
        }
        clearInterval(this.bannerTimer);
        return (this.bannerTimer = setInterval(Carousel, 3000));
      });
      this.bannerTimer = setInterval(Carousel, 3000);
      function Carousel() {
        that.activeIndex++;
        if (that.activeIndex >= MaxLength) {
          that.activeIndex = 0;
        }
      }
    },
    onRefresh() {
      indexHome().then(res => {
        this.banner = res.data.banner;
        this.channel = res.data.channel;
        this.newList = res.data.new;
        this.hot = res.data.hot;
        this.topic = res.data.topic;
        this.loading = false;
        this.$toast("刷新成功");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  background-color: #2f3247;
  .top {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 103px;
    background-color: #3a3b4d;
    box-shadow: 0 1px 0 0 rgba(4, 0, 0, 0.1);
    line-height: 103px;
    overflow: hidden;
    .left {
      width: 436px;
      height: 70px;
      display: inline-block;
      line-height: 70px;
      margin-left: 20px;
      border-radius: 35px;
      background-color: #242737;
      span {
        display: inline-block;
        width: 40px;
        // height: 40px;
        overflow: hidden;
        vertical-align: middle;
        margin-left: 20px;
        img {
          width: 100%;
        }
      }
      input {
        width: 280px;
        // height: 70px;
        // line-height: 70px;
        background-color: #242737;
        border: 0;
        font-size: 28px;
        margin-left: 20px;
        color: #fff;
      }
    }
    .right {
      float: right;
      i {
        margin-right: 40px;
        font-size: 40px;
        color: #fff;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .homeContent {
    margin-top: 100px;
    padding-bottom: 102px;
    .mint-loadmore-top {
      color: #fff;
      .loadingTop {
        height: 106px;
        overflow: hidden;
        font-size: 24px;
        color: #7d8090;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%);
        }
      }
    }
    .slider-container {
      width: 100%;
      height: 333px;
      position: relative;
      margin-top: 30px;
      .slider-content {
        position: relative;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        background-size: inherit;
        overflow: hidden;
        .slider {
          width: 591px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 50%;
          border-radius: 10px;
          overflow: hidden;
          transition: 500ms all ease-in-out;
          transform: translate3d(-50%, 0, 0);
          z-index: 1;
          opacity: 0;
          &.active {
            transform: translate3d(-50%, 0, 100px);
            opacity: 1;
            z-index: 3;
          }
          &.prev {
            transform: translate3d(-145%, 0, -200px) scale(0.85);
            opacity: 1;
            z-index: 1;
          }
          &.next {
            transform: translate3d(45%, 0, -200px) scale(0.85);
            opacity: 1;
            z-index: 2;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .sliderCode {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translate(-50%);
          z-index: 4;
          text-align: center;
          li {
            width: 15px;
            height: 15px;
            background-color: rgba(255, 255, 255, 0.3);
            margin: 0 5px;
            float: left;
            border-radius: 50%;
            &.active {
              background-color: #fff;
            }
          }
        }
      }
    }
    .classify {
      margin-top: 39px;
      ul {
        width: 670px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 118px;
          margin-right: 66px;
          margin-bottom: 40px;
          &:nth-of-type(4n) {
            margin-right: 0;
          }
          div {
            width: 118px;
            height: 118px;
            line-height: 118px;
            text-align: center;
            border-radius: 10px;
            img {
              display: inline-block;
              vertical-align: middle;
              height: 85px;
            }
          }
          p {
            text-align: center;
            color: #9ea1b0;
            font-size: 28px;
            margin-top: 20px;
          }
        }
      }
    }
    .new-movie {
      .new-movie-top {
        padding-left: 40px;
        padding-right: 20px;
        span {
          &:first-child {
            font-size: 32px;
            color: #fff;
          }
          &:last-child {
            color: #666666;
            font-size: 28px;
            float: right;
            i {
              font-size: 28px;
            }
          }
        }
      }
      ul {
        overflow: hidden;
        li {
          float: left;
          width: 348px;
          margin: 20px 0 40px 20px;
          position: relative;
          div {
            width: 348px;
            height: 195px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            color: #9d9fae;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 28px;
            margin-top: 20px;
          }
          .vipMovie {
            position: absolute;
            width: 80px;
            height: 80px;
            right: -18px;
            top: -17px;
            z-index: 10;
          }
        }
      }
    }
    .separate {
      height: 20px;
      background-color: #1d1f30;
    }
    .hot-movie {
      .hot-movie-top {
        padding-left: 40px;
        font-size: 32px;
        color: #fff;
        margin-top: 40px;
      }
      ul {
        overflow: hidden;
        li {
          float: left;
          width: 348px;
          margin: 20px 0 40px 20px;
          position: relative;
          div {
            width: 348px;
            height: 195px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            color: #9d9fae;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 28px;
            margin-top: 20px;
          }
          .vipMovie {
            position: absolute;
            width: 80px;
            height: 80px;
            right: -18px;
            top: -17px;
            z-index: 10;
          }
        }
      }
      .hot-movie-btm {
        margin-bottom: 40px;
        .van-button {
          display: inline-block;
          width: 345px;
          height: 88px;
          background-color: #1d1f30;
          border-radius: 10px;
          text-align: center;
          line-height: 88px;
          font-size: 28px;
          color: #666666;
          margin-left: 20px;
          border: 0;
          &::before {
            background-color: #fff;
          }
          i {
            font-size: 28px;
          }
        }
      }
    }
    .like-movie {
      .like-movie-top {
        padding-left: 40px;
        font-size: 32px;
        color: #fff;
        margin-top: 40px;
      }
      ul {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        li {
          float: left;
          width: 348px;
          margin: 20px 0 40px 20px;
          position: relative;
          div {
            width: 348px;
            height: 195px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            color: #9d9fae;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 28px;
            margin-top: 20px;
          }
          .vipMovie {
            position: absolute;
            width: 80px;
            height: 80px;
            right: -18px;
            top: -17px;
            z-index: 10;
          }
        }
      }
    }
    .china-movie {
      .china-movie-top {
        padding-left: 40px;
        font-size: 32px;
        color: #fff;
        margin-top: 40px;
      }
      ul {
        overflow: hidden;
        li {
          float: left;
          width: 222px;
          margin: 20px 0 40px 20px;
          div {
            height: 309px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            color: #9d9fae;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 28px;
            margin-top: 20px;
          }
        }
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
  }
}
</style>
