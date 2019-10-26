<template>
  <div class="allMovie flex" v-title="'全部电影'">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
      全部电影
      <img
        src="/images/search.png"
        alt=""
        @click="$router.push({ name: 'search' })"
      />
    </div>
    <div class="content">
      <div class="classify" v-if="allMovieType.length">
        <div ref="scrollTab">
          <van-button
            v-for="(item, i) in allMovieType"
            :key="i"
            :class="{ on: parameter.channelId == item.id }"
            @click="changeType(item.id)"
            >{{ item.title }}</van-button
          >
        </div>
        <div>
          <van-button
            v-for="(child, j) in childTab"
            :key="j"
            :class="{ on: parameter.orderby == child.type }"
            @click="changeChildType(child.type)"
            >{{ child.title }}</van-button
          >
        </div>
      </div>
      <div class="movieList" id="el">
        <van-pull-refresh v-model="topLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <ul>
              <li
                v-for="(item, i) in movieArr"
                :key="i"
                @click="
                  $router.push({
                    name: 'playing',
                    query: { movieId: item.id }
                  })
                "
              >
                <div>
                  <img :src="item.coverImg" alt="" />
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
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import { videoIndex } from "../../api";
import { mapGetters } from "vuex";
import { scrollToView, scrollTab } from "../../commonjs/animate";
const childTab = [
  { title: "综合", type: "all" },
  { title: "最多播放", type: "play" },
  { title: "最近更新", type: "new" },
  { title: "最多喜欢", type: "like" }
];
export default {
  name: "AllMovie",
  data() {
    return {
      childTab,
      movieArr: [],
      loading: false,
      topLoading: true,
      finished: false,
      parameter: {
        channelId: "",
        keyword: "",
        orderby: "",
        page: 1,
        pageSize: 15
      }
    };
  },
  created() {
    this.parameter.channelId = this.$route.params.channelId;
    this.parameter.orderby = this.$route.params.orderby;
    this.initData();
  },
  computed: {
    ...mapGetters(["allMovieType"]),
    el() {
      return document.getElementById("el");
    }
  },
  methods: {
    changeType(id) {
      if (this.parameter.channelId == id) return false;
      this.$router.replace({
        name: "allmovie",
        params: { channelId: id, orderby: this.$route.params.orderby }
      });
      this.parameter.channelId = id;
      this.parameter.page = 1;
      this.finished = false;
      scrollToView(this.el, 0, 300);
      this.initData();
    },
    changeChildType(type) {
      if (this.parameter.orderby == type) return false;
      if (type) {
        this.$router.replace({
          name: "allmovie",
          params: {
            channelId: this.$route.params.channelId,
            orderby: type
          }
        });
      }
      this.parameter.orderby = type;
      this.parameter.page = 1;
      this.finished = false;
      scrollToView(this.el, 0, 300);
      this.initData();
    },
    initData() {
      videoIndex(this.parameter).then(res => {
        console.log(res);
        if (res.code) {
          this.movieArr = res.data.list;
          if (!res.data.list.length) {
            this.finished = true;
          }
          this.scrollShowTab();
        }
      });
    },
    scrollShowTab() {
      scrollTab(this.$refs.scrollTab, document.querySelectorAll(".on")[0]);
    },
    onRefresh() {
      this.parameter.page = 1;
      videoIndex(this.parameter).then(res => {
        if (res.code) {
          this.movieArr = res.data.list;
          this.topLoading = false;
          this.$toast("刷新成功");
          if (!res.data.list.length) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        }
      });
    },
    onLoad() {
      this.parameter.page++;
      videoIndex(this.parameter).then(res => {
        if (res.data.list.length) {
          this.movieArr = this.movieArr.concat(res.data.list);
          this.loading = false;
        } else {
          this.loading = false;
          this.finished = true;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.allMovie {
  .top {
    height: 103px;
    line-height: 103px;
    position: relative;
    background-color: #3a3b4d;
    text-align: center;
    font-size: 40px;
    color: #7d8090;
    i {
      position: absolute;
      left: 20px;
      color: #666666;
      font-size: 50px;
    }
    img {
      width: 40px;
      height: 40px;
      position: absolute;
      right: 20px;
      top: 35px;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .classify {
      box-shadow: 0 1px 10px 0 rgba(4, 0, 0, 0.2);
      div {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        &:nth-child(2) {
          .van-button {
            margin-top: 0;
          }
        }
        .van-button {
          margin: 20px 0 20px 20px;
          white-space: nowrap;
          height: 54px;
          border-radius: 54px;
          line-height: 0;
          padding: 30px;
          border: solid 1px #eaeaea; /*no*/
          color: #7d8090;
          &.on {
            background-color: #414453;
            color: #fff;
          }
        }
      }
    }
    .movieList {
      flex: 1;
      overflow-y: scroll;
      padding-top: 20px;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 345px;
          margin-left: 20px;
          margin-bottom: 39px;
          position: relative;
          div {
            height: 233px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            margin-top: 20px;
            color: #7d8090;
            font-size: 28px;
            text-align: center;
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
  }
}
</style>
