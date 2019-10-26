<template>
  <div class="select">
    <div
      class="select-top"
      :class="{ haveMovie: movieArr }"
      v-if="classifyList.length"
    >
      <van-button
        v-for="(item, i) in classifyList"
        :key="i"
        :class="{ on: i == classifyListIndex }"
        @click="changeTab(i, item)"
        >{{ item.name }}</van-button
      >
      <van-button @click="clear">
        <i class="iconfont">&#xe6b5;</i>重置
      </van-button>
    </div>
    <div v-if="movieArr" class="movieList">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ul>
            <li
              v-for="(item, i) in movieArr"
              :key="i"
              @click="
                $router.push({ name: 'playing', query: { movieId: item.id } })
              "
            >
              <div>
                <img :src="item.coverImg" alt="" />
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
                <h3>{{ item.title }}</h3>
                <div class="tab" @touchmove="stopPro">
                  <van-button
                    v-for="(child, j) in item.tags.slice(0, 4)"
                    :key="j"
                    @click.stop="filters(child)"
                    >{{ child.name }}</van-button
                  >
                </div>
              </div>
              <div>{{ item.countPlay }}次播放</div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
    <div v-else class="childSelect">
      <dl>
        <dd
          v-for="(item, j) in childList"
          :key="j"
          @click="changeType(item.id)"
        >
          <div
            v-show="
              parameter.tagId.length > 1
                ? toNum(parameter.tagId.split(',')[j]) === toNum(item.id)
                : toNum(parameter.tagId) === toNum(item.id)
            "
          >
            <img src="/images/on.png" alt="" />
          </div>
          <span>{{ item.name }}</span>
        </dd>
      </dl>
      <!--      <van-button @click="movieArr = '1'">确定</van-button>-->
    </div>
  </div>
</template>

<script>
import { channelTagType, channelTagMovie } from "../../api";
import { scrollToView } from "../../commonjs/animate";
export default {
  name: "Select",
  data() {
    return {
      classifyList: [],
      classifyListIndex: 0,
      topStatus: "",
      movieArr: [],
      isLoading: true,
      loading: false,
      finished: false,
      parameter: {
        tagId: 0,
        page: 1,
        pageSize: 15
      }
    };
  },
  created() {
    this.initial();
  },
  activated() {
    this.initial();
  },
  computed: {
    childList() {
      return this.classifyList[this.classifyListIndex].tagList;
    },
    el() {
      return window.document.documentElement;
    }
  },
  methods: {
    initData() {
      channelTagType().then(res => {
        console.log(res, "标签筛选tab");
        if (res.code) {
          this.classifyList = res.data.list;
          if (!this.$route.params.id) {
            this.parameter.tagId = this.classifyList[
              this.classifyListIndex
            ].tagIds;
          }
        }
      });
    },
    changeTab(index, item) {
      console.log(item);
      this.classifyListIndex = index;
      sessionStorage.setItem("classifyListIndex", index);
      this.parameter.page = 1;
      this.parameter.tagId = item.tagIds || "0";
      this.finished = false;
      scrollToView(this.el, 0, 400);
      this.initMovie();
    },
    changeType(id) {
      this.$router.replace({
        name: "classify",
        params: { mode: "Select", id: id }
      });
      this.parameter.page = 1;
      this.parameter.tagId = id;
      this.finished = false;
      scrollToView(this.el, 0, 400);
      this.initMovie();
    },
    initMovie() {
      channelTagMovie(this.parameter).then(res => {
        console.log(res, "movie");
        if (res.code) {
          this.movieArr = res.data.list;
          if (this.movieArr.length) {
            if (this.movieArr.length >= this.parameter.pageSize) {
              this.finished = false;
            } else {
              this.finished = true;
            }
          } else {
            this.finished = true;
          }
        }
      });
    },
    onRefresh() {
      this.parameter.page = 1;
      channelTagMovie(this.parameter).then(res => {
        if (res.code) {
          this.movieArr = res.data.list;
          this.isLoading = false;
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
      channelTagMovie(this.parameter).then(res => {
        if (res.data.list.length) {
          this.movieArr = this.movieArr.concat(res.data.list);
          this.loading = false;
        } else {
          this.loading = false;
          this.finished = true;
        }
      });
    },
    clear() {
      if (this.childList.length) {
        this.movieArr = "";
      }
    },
    stopPro(e) {
      e = window.event || e;
      e.stopPropagation();
    },
    initial() {
      this.classifyListIndex = sessionStorage.getItem("classifyListIndex") || 0;
      this.parameter.page = 1;
      let id = this.$route.params.id;
      if (id) {
        this.parameter.tagId = this.toNum(id);
      }
      scrollToView(this.el, 0, 400);
      this.initMovie();
      if (!this.classifyList.length) {
        this.initData();
      }
    },
    filters(item) {
      this.classifyListIndex = 0;
      sessionStorage.setItem("classifyListIndex", this.classifyListIndex);
      this.changeType(this.toNum(item.tagId));
    }
  }
};
</script>

<style scoped lang="less">
.select {
  width: 100%;
  background-color: #fff;
  padding-bottom: 100px;
  overflow: hidden;
  .select-top {
    position: fixed;
    left: 0;
    top: 103px;
    z-index: 2;
    background-color: #fff;
    box-shadow: 0 1px 10px 0 rgba(4, 0, 0, 0.2);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
    .van-button {
      width: 167px;
      height: 66px;
      text-align: center;
      line-height: 66px;
      border-radius: 33px;
      box-sizing: border-box;
      border: 1px solid #eaeaea; /*no*/
      font-size: 34px;
      margin-top: 26px;
      color: #3a3b4d;
      white-space: nowrap;
      &.on {
        background-color: #414453 !important;
        color: #fff !important;
      }
      &:last-child {
        background-color: #e0e0e0;
        i {
          font-size: 34px;
        }
      }
    }
  }
  .childSelect {
    position: fixed;
    width: 100%;
    top: 310px;
    dl {
      overflow: hidden;
      box-shadow: 0 10px 10px 0 rgba(4, 0, 0, 0.2);
      dd {
        color: #999999;
        float: left;
        width: 320px;
        height: 80px;
        line-height: 80px;
        font-size: 32px;
        overflow: hidden;
        padding-left: 40px;
        div {
          width: 29px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 15px;
          margin-bottom: 10px;
          img {
            width: 100%;
          }
        }
      }
    }
    .van-button {
      display: block;
      width: 436px;
      height: 88px;
      background: linear-gradient(#eb623f, #f7d185);
      text-align: center;
      line-height: 88px;
      font-size: 34px;
      color: #fff;
      margin: 37px auto 50px;
      border-radius: 44px;
    }
  }
  .movieList {
    padding: 20px 20px 0 20px;
    margin-top: 205px;
    ul {
      li {
        overflow: hidden;
        position: relative;
        margin-bottom: 20px;
        > div {
          &:first-child {
            width: 284px;
            height: 191px;
            float: left;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .vipMovie {
              position: absolute;
              width: 80px;
              height: 80px;
              right: -20px;
              top: -18px;
              z-index: 1;
            }
          }
          &:nth-child(2) {
            overflow: hidden;
            padding-left: 20px;
            h3 {
              font-size: 36px;
              color: #3a3b4d;
              margin-bottom: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
          }
          &:nth-child(3) {
            overflow: hidden;
            position: absolute;
            bottom: 0;
            left: 304px;
            color: #999999;
            font-size: 28px;
          }
        }
      }
    }
  }
}
</style>
