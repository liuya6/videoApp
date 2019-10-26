<template>
  <div class="specialTopic flex" v-title="topic.title || '加载中...'">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
    </div>
    <div class="content">
      <div class="content-top">
        <div
          class="bg"
          :style="`background:url(${topic.coverImg}) no-repeat;`"
        ></div>
        <h3>{{ topic.title }}</h3>
        <p>
          {{ topic.description || "暂无说明" }}
        </p>
      </div>
      <div class="movie-content">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <ul>
            <li
              v-for="(item, i) in topicList"
              :key="i"
              @click="
                $router.push({ name: 'playing', query: { movieId: item.id } })
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
      </div>
    </div>
  </div>
</template>

<script>
import { topic } from "../../api";
export default {
  name: "SpecialTopic",
  data() {
    return {
      topic: "",
      topicList: [],
      loading: false,
      finished: false,
      parameter: {
        topicId: "",
        page: 1,
        pageSize: 20
      }
    };
  },
  created() {
    this.parameter.topicId = this.$route.params.topicId;
    this.initData();
  },
  methods: {
    initData() {
      topic(this.parameter).then(res => {
        console.log(res);
        this.topic = res.data.topic;
        this.topicList = res.data.list;
      });
    },
    onLoad() {
      this.parameter.page++;
      topic(this.parameter).then(res => {
        console.log(res, "aaaaaaaaaaaaaa");
        if (res.data.list.length) {
          this.topicList = this.topicList.concat(res.data.list);
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
.specialTopic {
  .top {
    position: relative;
    i {
      position: absolute;
      font-size: 50px;
      color: rgba(255, 255, 255, 0.8);
      left: 20px;
      top: 20px;
      z-index: 1;
    }
  }
  .content {
    .content-top {
      .bg {
        height: 750px;
        background-size: 100% 100% !important;
        filter: blur(3px);
      }
      h3 {
        font-size: 40px;
        color: #333333;
        padding-left: 40px;
      }
      p {
        color: #666666;
        padding-left: 40px;
        padding-right: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 34px;
      }
    }
    .movie-content {
      ul {
        overflow: hidden;
        li {
          float: left;
          width: 222px;
          margin: 20px 0 40px 20px;
          position: relative;
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
          .vipMovie {
            position: absolute;
            width: 60px;
            height: 60px;
            right: -15px;
            top: -14px;
            z-index: 10;
          }
        }
      }
    }
    .no-more {
      margin-bottom: 37px;
      text-align: center;
      span {
        font-size: 28px;
        color: #1d1f30;
        position: relative;
        &:before {
          content: "";
          height: 1px; /*no*/
          width: 150px;
          background-color: #1d1f30;
          position: absolute;
          left: -170px;
          top: 50%;
        }
        &:after {
          content: "";
          height: 1px; /*no*/
          width: 150px;
          background-color: #1d1f30;
          position: absolute;
          left: 170px;
          top: 50%;
        }
      }
    }
  }
}
</style>
