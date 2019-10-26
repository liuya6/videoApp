<template>
  <div class="playing flex" v-title="'正在播放'">
    <i class="iconfont topBack" @click="back">&#xe629;</i>
    <div class="videoWrap">
      <div v-if="videoPlugin.sources[0].src">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="videoPlugin"
          @play="onPlayerPlay($event)"
        ></video-player>
      </div>
      <div v-else class="loading">
        <img src="../../assets/images/loading.svg" alt="" />
      </div>
    </div>
    <div class="content1">
      <div class="content-top">
        <div class="main">
          <h3>{{ movie.title }}</h3>
          <div class="info flexB">
            <p>
              <span>{{ timestampToString(movie.createTime) }}</span>
              <span style="margin-left: 10px;"
                >{{ movie.countPlay }}次观看</span
              >
            </p>
            <div @click="toComment">
              <i class="iconfont">&#xe6c9;</i>
              {{ movie.countComment }}热评
            </div>
          </div>
          <div class="introduction flexB">
            <p :class="ifExpand ? 'long' : null">{{ movie.description }}</p>
            <i
              @click="expand"
              class="iconfont"
              :class="ifExpand ? 'rotate' : null"
              >&#xe6ca;</i
            >
          </div>
          <ul class="flexB">
            <li @click="dianzan()">
              <div>
                <i
                  class="iconfont rotate"
                  :style="{ color: movie.isLike ? 'red' : null }"
                  >&#xe6ac;</i
                >
              </div>
              <p>{{ movie.countLike }}</p>
            </li>
            <li @click="diancai()">
              <div>
                <i
                  class="iconfont"
                  :style="{ color: movie.isDisLike ? 'red' : null }"
                  >&#xe6ac;</i
                >
              </div>
              <p>{{ movie.countDislike }}</p>
            </li>
            <li @click="collection()">
              <div>
                <i
                  class="iconfont"
                  :style="{ color: movie.isCollection ? 'red' : null }"
                  >&#xe6c1;</i
                >
              </div>
              <p>收藏</p>
            </li>
            <li @click="share()">
              <div>
                <i class="iconfont">&#xe6cb;</i>
              </div>
              <p>分享</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="filmBox">
        <p>猜你喜欢</p>
        <ul>
          <li
            v-for="(item, i) in guessYouLike"
            :key="i"
            @click="toYouLike(item)"
          >
            <div>
              <img :src="item.coverImg" alt />
              <div class="vipMovie" v-show="item.access == '1'">
                <img
                  src="../../assets/images/vipMovie.png"
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
            </div>
            <div>
              <p>{{ item.title }}</p>
              <div class="tab">
                <van-button
                  v-for="(l, i) in item.tags"
                  :key="i"
                  @click.stop="goSelect(l)"
                  >{{ l.name }}</van-button
                >
              </div>
              <div class="times">{{ item.countPlay }}次播放</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="comment">
        <div class="topWrap">
          <div class="commentTop flexB">
            <div class="commentLeft">
              全部评论
              <span>{{ movie.countComment }}条</span>
            </div>
            <div class="commentRight flexC">
              <span
                class="flexC"
                v-for="(item, i) in tabList"
                :key="i"
                :class="{ active: activeIndex == i }"
                @click="changeTab(i)"
                >{{ item.title }}</span
              >
            </div>
          </div>
          <div class="inputWrap flexB" @click.stop>
            <img :src="avatarImg" alt v-show="!ifShowBtn" />
            <textarea
              placeholder="快来说说你的感受吧！"
              @focus="ifShowBtn = true"
              v-model="sendMsg"
              :class="{ blur: !ifShowBtn }"
            />
            <div class="btn" v-show="ifShowBtn" @click="send">发送</div>
          </div>
        </div>
        <ul class="listUl" v-if="commentList">
          <li v-for="(item, i) in commentList" :key="i">
            <div class="flexB">
              <div class="flexS">
                <img :src="item.avatar" alt />
                <div class="info">
                  <p>{{ item.nickname }}</p>
                  <!-- <span>{{ item.createTime | howLong }}前</span> -->
                  <span>{{ item.commentDate }}</span>
                </div>
              </div>
              <div>
                <span style="color: #999999">{{ item.countLike }}</span>
                <i
                  class="iconfont rotate"
                  @click="zan(item, i)"
                  :style="{ color: item.isLike ? 'red' : '#707070' }"
                  >&#xe6ac;</i
                >
              </div>
            </div>
            <p v-html="character(item.content)"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  videoDetail,
  commentAPI,
  videoCommentAPI,
  commentLike,
  movieLike,
  movieCollection,
  play,
  getVideoUrl
} from "../../api";

export default {
  name: "playing",
  data() {
    return {
      ifExpand: false,
      like: false,
      activeIndex: 0,
      tabList: [{ title: "热门" }, { title: "最新" }],
      commentList: [],
      hotCommentList: [],
      newCommentList: null,
      ifGetNewComment: true,
      ifGetHot: false,
      ifShowBtn: false,
      sendMsg: "",
      username: "master",
      movie: [],
      guessYouLike: [],
      queryId: "",
      commentParameter: {
        page: 1,
        pageSize: 10,
        movieId: "",
        orderby: "hot"
      },
      videoPlugin: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 为true时，Video.js player将拥有流体大小。按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等
            src: "" //url地址
          }
        ],
        poster: "../../static/images/test.jpg", //封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  created() {
    this.queryId = this.$route.query.movieId;
    console.log(this.queryId, "this.queryId00", this.userInfo, "userInfo");
    this.getVideoDetail();
    this.getComment();
    window.addEventListener("click", this.hideBtn);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.hideBtn);
    // window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    ...mapGetters(["videoDetailList", "userInfo"]),
    avatarImg() {
      return this.userInfo && this.userInfo.avatar
        ? this.userInfo.avatar
        : require("../../assets/images/user.png");
    }
  },
  methods: {
    ...mapActions(["getVideoDetail"]),
    hideBtn() {
      this.ifShowBtn = false;
    },
    async getVideoDetail() {
      let movieUrlKey = "";
      await videoDetail({ movieId: this.queryId }).then(res => {
        if (res.code) {
          console.log(res.data.guessYouLike, "guessYouLike");
          console.log(res.data.movie, "moviemovie");
          this.movie = res.data.movie;
          this.guessYouLike = res.data.guessYouLike.list;
          movieUrlKey = this.movie.url;
          // this.videoPlugin.sources[0].src = this.movie.url;
          this.videoPlugin.poster = this.movie.coverImg;
        } else {
          this.$dialog
            .alert({
              title: "返回",
              message: res.msg
            })
            .then(() => {
              this.back();
            });
        }
      });
      await getVideoUrl({ url: movieUrlKey }).then(res => {
        let blob = window.URL.createObjectURL(res);
        this.videoPlugin.sources[0].src = blob;
      });
    },
    // handleScroll() {
    //   let srcoll =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   console.log(srcoll, "srcoll");
    //   if (srcoll > 400) {
    //     this.getComment();
    //     window.removeEventListener("scroll", this.handleScroll);
    //   }
    // },
    toComment() {
      window.scrollTo(0, 720);
    },
    getComment() {
      this.commentParameter.movieId = this.queryId;
      videoCommentAPI(this.commentParameter).then(res => {
        console.log(res.data, "getComment");
        if (res.code) {
          this.commentList = res.data.list;
          this.hotCommentList = res.data.list;
        }
      });
    },
    getNewComment() {
      this.commentParameter.orderby = "new";
      videoCommentAPI(this.commentParameter).then(res => {
        console.log(res.data, "SET_VIDEODETAIL");
        if (res.code) {
          this.commentList = res.data.list;
          this.newCommentList = res.data.list;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    dianzan() {
      let num = this.movie.isLike ? "unlike" : "like";
      movieLike({ movieId: this.movie.id, isLike: 1, type: num }).then(res => {
        console.log(res.data, "movieLike");
        if (res.code) {
          if (this.movie.isLike) {
            this.movie.countLike--;
          } else {
            this.movie.countLike++;
          }
          this.movie.isLike = !this.movie.isLike;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    diancai() {
      let num = this.movie.isDisLike ? "unlike" : "like";
      movieLike({ movieId: this.movie.id, isLike: 0, type: num }).then(res => {
        console.log(res.data, "movieLike");
        if (res.code) {
          if (this.movie.isDisLike) {
            this.movie.countDislike--;
          } else {
            this.movie.countDislike++;
          }
          this.movie.isDisLike = !this.movie.isDisLike;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    collection() {
      let type = this.movie.isCollection ? "unlike" : "like";
      movieCollection({ type, movieId: this.movie.id }).then(res => {
        if (res.code) {
          this.movie.isCollection = !this.movie.isCollection;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    share() {
      this.$toast("敬请期待");
    },
    toYouLike(item) {
      if (item.id != this.queryId) {
        window.scrollTo(0, 0);
        this.videoPlugin.sources[0].src = null;
        this.$router.replace({ name: "playing", query: { movieId: item.id } });
        this.queryId = item.id;
        this.getVideoDetail();
        this.getComment();
      } else {
        return this.$toast("影片相同");
      }
    },
    expand() {
      this.ifExpand = !this.ifExpand;
    },
    changeTab(index) {
      if (this.activeIndex == index) return;
      this.activeIndex = index;
      if (index == 1) {
        // console.log(this.newCommentList,!!this.newCommentList,'this.newCommentList')
        if (this.ifGetNewComment) {
          this.getNewComment();
          this.ifGetNewComment = false;
        } else {
          // if (this.newCommentList) {
          this.commentList = this.newCommentList.concat();
          // }
        }
      } else {
        if (this.ifGetHot) {
          this.getComment();
          this.ifGetHot = false;
        } else {
          this.commentList = this.hotCommentList.concat();
        }
      }
    },
    zan(item, i) {
      let num = item.isLike ? 0 : 1;
      commentLike({ commentId: item.id, isLike: num }).then(res => {
        console.log(res.data, "commentLikedata");
        if (res.code) {
          if (this.activeIndex == 0) {
            this.hotCommentList[i].isLike = !this.hotCommentList[i].isLike;
            if (item.isLike) {
              this.hotCommentList[i].countLike++;
            } else {
              this.hotCommentList[i].countLike--;
            }
            this.commentList = this.hotCommentList.concat();
            this.ifGetNewComment = true;
          } else {
            this.ifGetHot = true;
            this.newCommentList[i].isLike = !this.newCommentList[i].isLike;
            if (item.isLike) {
              this.newCommentList[i].countLike++;
            } else {
              this.newCommentList[i].countLike--;
            }
            this.commentList = this.newCommentList.concat();
          }
        } else {
          this.$toast(res.msg);
        }
      });
    },
    send() {
      if (!this.sendMsg || this.sendMsg.indexOf(" ") == 0)
        return this.$toast("评论内容不能为空");
      if (this.sendMsg.indexOf(" ") == 0)
        return this.$toast("评论内容不能以空格开头");
      if (!this.userInfo) {
        return this.$dialog
          .confirm({
            title: "提示",
            message: "您还未登录，立即登录？"
          })
          .then(() => {
            return this.$router.push({
              name: "login",
              query: { redirect: this.$route.fullPath }
            });
          });
      }
      commentAPI({
        parentId: 0,
        movieId: this.queryId,
        content: this.sendMsg
      }).then(res => {
        console.log(res.data, "commentAPI");
        if (res.code) {
          this.getComment();
          this.ifGetNewComment = true;
          this.movie.countComment++;
          this.sendMsg = "";
        } else {
          this.$toast(res.msg);
        }
      });
    },
    onPlayerPlay(e) {
      console.log(e);
      if (this.ifShowBtn) {
        this.ifShowBtn = false;
      }
      play({ movieId: this.movie.id }).then(res => {
        console.log(res, "播放统计");
      });
    },
    goSelect(item) {
      console.log(item);
      this.$router.push({
        name: "classify",
        params: { mode: "Select", id: item.tagId }
      });
    }
  }
  // filters: {
  //   howLong(time) {
  //     let now = parseInt(new Date().getTime() / 1000) - time;
  //     let d = parseInt(now / 86400);
  //     let s = now % 60;
  //     if (now > 2592000) {
  //       if (now > 10368000) {
  //         return "三个月";
  //       } else if (now > 5184000) {
  //         return "二个月";
  //       } else {
  //         return "一个月";
  //       }
  //     }
  //     if (86400 < now) {
  //       return d + "天" + parseInt((now % 86400) / 3600) + "小时";
  //     }
  //     if (now > 3600) {
  //       let h = parseInt(now / 3600);
  //       return h + "小时" + (h % 60) + "分钟";
  //     } else {
  //       if (60 <= now) {
  //         let m = parseInt(now / 60);
  //         return m + "分钟" + s + "秒";
  //       } else {
  //         return s + "秒";
  //       }
  //     }
  //   }
  // }
};
</script>

<style scoped lang="less">
.playing {
  font-size: 28px;
  .rotate {
    transform: rotate(180deg);
  }
  .topBack {
    position: fixed;
    font-size: 50px;
    color: rgba(255, 255, 255, 0.8);
    left: 0;
    top: 0;
    z-index: 11;
    padding-top: 18px;
    padding-left: 18px;
  }
  .videoWrap {
    width: 100%;
    height: 424px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: #fff;
    video {
      width: 100%;
      height: 424px;
    }
    .loading {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      img {
        width: 120px;
        height: 120px;
      }
    }
  }
  .content1 {
    margin-top: 450px;
    .content-top {
      .main {
        padding: 0 20px 0 20px;
        border-bottom: 1px solid #c0c0c0;
        h3 {
          font-size: 36px;
          font-weight: bold;
          color: #333333;
          padding-bottom: 20px;
        }
        .info {
          color: #999999;
          margin-bottom: 20px;
          letter-spacing: 2px;
          div {
            margin-right: 40px;
            i {
              font-size: 36px;
            }
          }
        }
        .introduction {
          width: 670px;
          background-image: linear-gradient(#d7dfe7, #d7dfe7),
            linear-gradient(#000000, #000000);
          background-blend-mode: normal, normal;
          border-radius: 10px;
          color: #666666;
          padding: 30px 20px;
          p {
            transition: all 0.6s;
            height: 38px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 558px;
          }
          .long {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            height: 150px;
            white-space: normal;
          }
          i {
            transition: all 0.6s;
            font-size: 36px;
          }
        }
        ul {
          width: 710px;
          margin-top: 16px;
          color: #707070;
          li {
            flex: 1;
            padding: 20px 0;
            i {
              font-size: 46px;
              display: flex;
              justify-content: center;
            }
            p {
              padding-top: 20px;
              font-size: 28px;
              color: #999999;
              text-align: center;
            }
          }

          .blueBack {
            width: 67px;
            height: 66px;
            border-radius: 20px;
            background: #3875da;
            padding: 0 6px 10px 6px;
            margin-left: 42px;
          }
        }
      }
    }
    .filmBox {
      padding: 20px;
      > p {
        font-size: 32px;
        padding: 18px;
      }
      ul {
        border-bottom: 1px solid #dcdcdc;
        width: 710px;
        li {
          display: flex;
          width: 100%;
          margin-bottom: 20px;
          > div {
            padding-left: 16px;
            &:first-child {
              width: 284px;
              height: 190px;
              position: relative;
              padding-left: 0;
              img {
                width: 100%;
                height: 100%;
              }
              .vipMovie {
                position: absolute;
                width: 80px;
                height: 80px;
                right: -19px;
                top: -18px;
                z-index: 1;
              }
            }
            p {
              width: 400px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #3a3b4d;
              font-size: 36px;
              margin-bottom: 20px;
            }
            .tab {
              width: 420px;
              overflow-x: auto;
              white-space: nowrap;
              .van-button {
                display: inline-block;
                height: 50px;
                line-height: 50px;
                padding: 0 20px;
                margin-bottom: 8px;
                font-size: 24px;
                min-width: 48px;
                background: linear-gradient(#e9d3a8, #e9d3a8);
                border-radius: 24px;
                color: #999999;
                margin-right: 15px;
              }
            }
            .times {
              font-size: 28px;
              color: #999999;
              margin-top: 20px;
            }
          }
        }
      }
    }
    .comment {
      font-size: 32px;
      padding-bottom: 40px;
      .topWrap {
        border-bottom: 1px solid #dcdcdc;
        padding: 10px 32px 40px 32px;
        .commentTop {
          padding-bottom: 20px;
          .commentLeft {
            color: #333333;
            span {
              color: #999999;
              font-size: 28px;
            }
          }
          .commentRight {
            span {
              color: #666666;
              height: 30px;
              line-height: 30px;
              padding: 14px 40px;
              border-radius: 60px;
              text-align: center;
              font-size: 32px;
            }
            .active {
              color: #fff;
              background: #000;
            }
          }
        }
        .inputWrap {
          padding-top: 30px;
          img {
            width: 86px;
            height: 86px;
            border-radius: 50%;
          }
          textarea {
            width: 520px;
            padding: 10px 20px;
            height: 66px;
            border-radius: 20px;
            border: 0;
            background: #d7dfe7;
            text-align: left;
            font-size: 28px;
            &.blur {
              line-height: 66px;
              font-size: 32px;
            }
          }
          .btn {
            width: 90px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            background: #aecef4;
            border-radius: 10px;
            color: #fff;
          }
        }
      }
      .listUl {
        padding: 0 40px 40px 40px;
        li {
          border-bottom: 1px solid #dcdcdc;
          padding: 40px 0;
          img {
            width: 86px;
            margin-right: 30px;
          }
          .info {
            div {
              color: #666666;
            }
            span {
              color: #999999;
              font-size: 24px;
            }
          }
          > p {
            color: #666666;
            margin-top: 40px;
          }
          i {
            font-size: 40px;
            display: inline-block;
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>
