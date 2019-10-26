<template>
  <div class="search flex" @keydown.enter="search" v-title="'搜索'">
    <div class="search-top">
      <div class="left">
        <span>
          <img src="/images/search.png" alt="" />
        </span>
        <input
          type="text"
          placeholder="输入关键词查找片源"
          v-model="parameter.keyword"
        />
        <i
          class="iconfont"
          v-show="parameter.keyword"
          @click="
            [
              (parameter.keyword = ''),
              !movieArr.length
                ? (searchShowFlag = true)
                : (searchShowFlag = false),
              (noData = false)
            ]
          "
          >&#xe6b0;</i
        >
      </div>
      <div class="right" @click="back">
        取消
      </div>
    </div>
    <div v-if="movieArr.length" class="movie-content content">
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
              $router.push({
                name: 'playing',
                query: { movieId: item.id }
              })
            "
          >
            <div>
              <img :src="item.coverImg" alt="" />
            </div>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
            <div>{{ item.countPlay }}次播放</div>
          </li>
        </ul>
      </van-list>
    </div>
    <div v-show="searchShowFlag" class="search-for content">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="(item, i) in searchList" :key="i">
          <van-button
            @click="
              [
                (parameter.keyword = item.keyword),
                initData(),
                (searchShowFlag = false)
              ]
            "
          >
            {{ item.keyword }}
          </van-button>
        </li>
      </ul>
    </div>
    <div v-show="noData" class="noData">
      <div class="content_box">
        <div>
          <p><img src="/images/noData.png" alt="" /></p>
          <h4>暂无记录</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchKeyword, videoIndex } from "../../api";
export default {
  name: "Search",
  data() {
    return {
      searchList: [],
      searchShowFlag: true,
      movieArr: [],
      loading: false,
      finished: false,
      noData: false,
      parameter: {
        channelId: 0,
        keyword: "",
        orderby: "all",
        page: 1,
        pageSize: 15
      }
    };
  },
  created() {
    searchKeyword().then(res => {
      console.log(res);
      if (res.code) {
        this.searchList = res.data.list;
      }
    });
  },
  methods: {
    search() {
      if (!this.parameter.keyword) {
        return this.$toast("请输入关键词");
      }
      this.searchShowFlag = false;
      this.initData();
    },
    initData() {
      videoIndex(this.parameter).then(res => {
        console.log(res);
        if (res.code) {
          this.movieArr = res.data.list;
          if (!this.movieArr.length) {
            this.noData = true;
          } else {
            this.noData = false;
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
.search {
  .search-top {
    height: 103px;
    line-height: 103px;
    background-color: #3a3b4d;
    .left {
      width: 577px;
      height: 70px;
      display: inline-block;
      vertical-align: middle;
      line-height: 70px;
      margin-left: 20px;
      border-radius: 35px;
      background-color: #242737;
      span {
        display: inline-block;
        width: 40px;
        height: 40px;
        overflow: hidden;
        vertical-align: middle;
        margin-left: 20px;
        img {
          width: 100%;
        }
      }
      input {
        width: 430px;
        height: 60px;
        background-color: #242737;
        border: 0;
        font-size: 28px;
        margin-left: 20px;
        vertical-align: middle;
        color: #fff;
      }
      i {
        float: right;
        margin-right: 20px;
        width: 45px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        background: #3a3b4d;
        border-radius: 50%;
        color: #fff;
        font-size: 30px;
        vertical-align: middle;
        margin-top: 12px;
      }
    }
    .right {
      float: right;
      font-size: 40px;
      color: #7d8090;
      margin-right: 35px;
    }
  }
  .search-for {
    h3 {
      font-size: 28px;
      color: #3a3b4d;
      padding: 20px 0 20px 20px;
    }
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        margin-left: 20px;
        margin-bottom: 20px;
        .van-button {
          height: 66px;
          padding: 20px;
          line-height: 0;
          border-radius: 33px;
          color: #3a3b4d;
          background-color: #fdf4e3;
        }
        &:nth-of-type(3n + 1) {
          .van-button {
            background-color: #d8e5fe;
          }
        }
      }
    }
  }
  .movie-content {
    ul {
      li {
        overflow: hidden;
        position: relative;
        padding: 20px;
        border-bottom: 1px solid #c0c0c0;
        div {
          &:first-child {
            width: 284px;
            height: 191px;
            float: left;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &:nth-child(2) {
            overflow: hidden;
            padding-left: 20px;
            h3 {
              font-size: 36px;
              color: #3a3b4d;
              margin-bottom: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            p {
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              color: #999999;
              font-size: 28px;
            }
          }
          &:nth-child(3) {
            overflow: hidden;
            position: absolute;
            bottom: 20px;
            left: 324px;
            color: #999999;
            font-size: 28px;
          }
        }
      }
    }
  }
}
</style>
