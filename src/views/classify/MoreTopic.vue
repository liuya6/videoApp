<template>
  <div class="moreTopic" v-title="'热门专题'">
    <Header title="热门专题"></Header>
    <div class="topicContent">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
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
              :style="`background:url(${item.coverImg}) no-repeat`"
              @click="
                $router.push({
                  name: 'special',
                  params: { topicId: item.id }
                })
              "
            >
              <div>
                <h1>{{ item.title }}</h1>
                <p>{{ item.description }}</p>
              </div>
              <div>
                <i class="iconfont">&#xe61d;</i>
                <span>影片数量：</span>
                <span>{{ item.countMovie }}</span>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { topicList } from "../../api";
export default {
  name: "MoreTopic",
  data() {
    return {
      loading: false,
      isLoading: true,
      finished: false,
      topicList: [],
      parameter: {
        page: 1,
        pageSize: 15
      }
    };
  },
  created() {
    this.initData();
    this.$nextTick(() => {
      window.scrollTo(0, 0);
    });
  },
  methods: {
    initData() {
      topicList(this.parameter).then(res => {
        if (res.code) {
          this.topicList = res.data;
        }
        console.log(res);
      });
    },
    search() {
      this.parameter.page = 1;
      this.initData();
    },
    onRefresh() {
      this.parameter.page = 1;
      topicList(this.parameter).then(res => {
        if (res.code) {
          this.topicList = res.data;
          this.isLoading = false;
          this.$toast("刷新成功");
          if (!res.data.length) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        }
      });
    },
    onLoad() {
      this.parameter.page++;
      topicList(this.parameter).then(res => {
        if (res.data.length) {
          this.topicList = this.topicList.concat(res.data);
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
.moreTopic {
  overflow: hidden;
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .topicContent {
    background-color: #2f3247;
    min-height: calc(100vh - 100px);
    margin-top: 100px;
    .van-pull-refresh {
      min-height: calc(100vh - 100px);
    }
    ul {
      li {
        width: 690px;
        height: 318px;
        margin: 30px auto;
        background-color: #3a3b4d;
        box-shadow: 1px 2px 5px 0 rgba(29, 31, 48, 0.45);
        border-radius: 12px;
        position: relative;
        background-size: 100% 100% !important;
        div {
          &:nth-child(1) {
            color: #fff;
            h1 {
              font-size: 35px;
              padding-left: 20px;
              padding-top: 16px;
            }
            p {
              padding-left: 20px;
              margin-top: 12px;
            }
          }
          &:nth-child(2) {
            position: absolute;
            bottom: 20px;
            right: 20px;
            color: #999999;
            i {
              margin-right: 5px;
              font-size: 26px;
            }
          }
        }
      }
    }
  }
}
</style>
