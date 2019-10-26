<template>
  <div class="recommend">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="recommendContent">
        <div class="top">
          <h3>必看专题</h3>
          <ul class="topContent" @touchmove="stopPro">
            <li v-for="(item, i) in recommendList.recommendTopic" :key="i">
              <div
                @click="
                  $router.push({
                    name: 'special',
                    params: { topicId: item.id }
                  })
                "
              >
                <div>
                  <img :src="item.coverImg" alt="" />
                </div>
                <div>
                  <p>{{ item.title }}</p>
                  <span>上新时间:{{ timestampToString(item.updateTime) }}</span>
                </div>
              </div>
              <div class="text">
                {{ item.description }}
              </div>
              <div>
                <van-button
                  @click="
                    $router.push({
                      name: 'special',
                      params: { topicId: item.id }
                    })
                  "
                >
                  立即选片
                </van-button>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="swiper"
          v-if="recommendList.adBanner && recommendList.adBanner.length"
        >
          <swiper :options="swiperOption">
            <swiper-slide
              v-for="(image, index) in recommendList.adBanner"
              :key="index"
            >
              <img :src="image.imgUrl" />
            </swiper-slide>
          </swiper>
        </div>
        <div class="hot">
          <div class="hot-top">
            <h3>热门专题</h3>
            <span @click="$router.push({ name: 'moreTopic' })"
              >更多<i class="iconfont">&#xe6b4;</i></span
            >
          </div>
          <ul class="hot-content">
            <li
              v-for="(item, i) in recommendList.hotTopic"
              :key="i"
              @click="
                $router.push({ name: 'special', params: { topicId: item.id } })
              "
            >
              <div>
                <img :src="item.coverImg" alt="" />
              </div>
              <p>{{ item.title }}</p>
            </li>
          </ul>
        </div>
        <div class="separate"></div>
        <div class="prestige">
          <div class="prestige-top">
            <h3>人气女优</h3>
            <span @click="$router.push({ name: 'hotActor' })"
              >更多<i class="iconfont">&#xe6b4;</i></span
            >
          </div>
          <div class="prestige-content">
            <dl v-for="(item, i) in recommendList.album" :key="i">
              <dt
                @click="
                  $router.push({
                    name: 'special',
                    params: { topicId: item.id }
                  })
                "
              >
                <div>
                  <img :src="item.coverImg" alt="" />
                </div>
                <div>
                  <span>{{ item.title }}</span>
                  <p>
                    {{ item.description }}
                  </p>
                </div>
              </dt>
              <dd @touchmove="stopPro">
                <div
                  v-for="(child, j) in item.movieList"
                  :key="j"
                  @click="
                    $router.push({
                      name: 'playing',
                      query: { movieId: child.id }
                    })
                  "
                >
                  <div>
                    <img :src="child.coverImg" alt="" />
                  </div>
                  <p>{{ child.title }}</p>
                  <div class="vipMovie" v-show="item.access == '1'">
                    <img
                      src="../../assets/images/vipMovie.png"
                      width="100%"
                      height="100%"
                      alt=""
                    />
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { channelTopic } from "../../api";

export default {
  name: "recommend",
  data() {
    return {
      topStatus: "",
      isLoading: true,
      recommendList: [],
      swiperOption: {
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 3000,
          waitForTransition: true
        },
        loop: true
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      channelTopic().then(res => {
        console.log(res);
        if (res.code) {
          this.recommendList = res.data;
        }
      });
    },
    onRefresh() {
      channelTopic().then(res => {
        if (res.code) {
          this.recommendList = res.data;
          this.isLoading = false;
          this.$toast("刷新成功");
        }
      });
    },
    stopPro(e) {
      e = window.event || e;
      e.stopPropagation();
    }
  }
};
</script>

<style scoped lang="less">
.recommend {
  background-color: #2f3247;
  width: 100%;
  min-height: 100vh;
  .recommendContent {
    padding-bottom: 100px;
    .top {
      h3 {
        font-size: 36px;
        color: #fff;
        padding-left: 40px;
        margin-top: 20px;
        margin-bottom: 18px;
      }
      ul {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        margin: 0 20px;
        li {
          flex: 0 0 auto;
          width: 521px;
          background-color: #414453;
          color: #fff;
          border-radius: 10px;
          margin-left: 20px;
          padding-bottom: 14px;
          overflow: hidden;
          &:first-child {
            margin-left: 0;
          }
          div {
            overflow: hidden;
            &:first-child {
              overflow: hidden;
              div:first-child {
                width: 100px;
                height: 100px;
                float: left;
                margin: 20px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              div:last-child {
                float: left;
                p {
                  margin-top: 32px;
                  font-size: 34px;
                }
                span {
                  margin-top: 11px;
                  color: #999999;
                  font-size: 26px;
                }
              }
            }
            &.text {
              padding-left: 20px;
              padding-bottom: 20px;
              font-size: 28px;
              border-bottom: 1px solid #2f3247;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            &:nth-child(3) {
              .van-button {
                float: right;
                margin-top: 14px;
                margin-right: 20px;
                width: 177px;
                height: 54px;
                background: linear-gradient(#f7d185, #eb623f);
                border-radius: 27px;
                text-align: center;
                line-height: 0;
                color: #414453;
                font-size: 32px;
                white-space: nowrap;
                border: 0;
              }
            }
          }
        }
      }
    }
    .swiper {
      width: 710px;
      height: 296px;
      margin: 20px auto 0;
      border-radius: 15px;
      overflow: hidden;
      .swiper-container {
        height: 296px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .hot {
      margin-top: 36px;
      .hot-top {
        overflow: hidden;
        margin-bottom: 13px;
        h3 {
          font-size: 32px;
          color: #ffffff;
          padding-left: 40px;
          float: left;
        }
        span {
          float: right;
          margin-right: 20px;
          font-size: 28px;
          color: #666666;
          i {
            font-size: 28px;
          }
        }
      }
      .hot-content {
        display: flex;
        flex-wrap: wrap;
        padding: 0 40px;
        li {
          font-size: 0;
          margin: 20px 0 0 26px;
          &:nth-of-type(4n + 1) {
            margin-left: 0;
          }
          div {
            width: 146px;
            height: 146px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            font-size: 28px;
            color: #999999;
            margin-bottom: 40px;
            margin-top: 22px;
            text-align: center;
          }
        }
      }
    }
    .separate {
      height: 20px;
      background-color: #1d1f30;
    }
    .prestige {
      .prestige-top {
        overflow: hidden;
        border-bottom: 1px solid #0e111f;
        margin: 40px 20px 0 40px;
        padding-bottom: 20px;
        h3 {
          font-size: 32px;
          color: #ffffff;
          float: left;
        }
        span {
          float: right;
          font-size: 28px;
          color: #666666;
          i {
            font-size: 28px;
          }
        }
      }
      .prestige-content {
        dl {
          dt {
            overflow: hidden;
            div {
              float: left;
              &:first-child {
                width: 146px;
                height: 146px;
                border-radius: 50%;
                overflow: hidden;
                margin: 20px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              &:last-child {
                width: 516px;
                overflow: hidden;
                span {
                  display: inline-block;
                  color: #fff;
                  font-size: 36px;
                  margin-top: 30px;
                }
                p {
                  color: #848487;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  margin-top: 15px;
                  font-size: 28px;
                }
              }
            }
          }
          dd {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: scroll;
            margin: 0 20px;
            & > div {
              margin-left: 20px;
              width: 320px;
              position: relative;
              &:first-child {
                margin-left: 0;
              }
              .vipMovie {
                position: absolute;
                width: 80px;
                height: 80px;
                right: -18px;
                top: -17px;
                z-index: 1;
              }
              /*&:last-child {*/
              /*  padding-right: 20px;*/
              /*}*/
              div {
                width: 320px;
                height: 200px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              p {
                color: #9d9fae;
                font-size: 28px;
                margin: 20px 0;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
}
</style>
