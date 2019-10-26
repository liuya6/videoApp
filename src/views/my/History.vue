<template>
  <div class="history flex" v-title="'历史记录'">
    <div class="history-top">
      <i class="iconfont" @click="back">&#xe629;</i>
      历史记录
    </div>
    <div class="content">
      <van-tabs title-active-color="#4f86c6" @change="changeTab">
        <van-tab v-for="(item, i) in list" :key="i" :title="item.title">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh(i)">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad(i)"
              v-if="historyList.length"
              :immediate-check="false"
            >
              <ul>
                <li
                  v-for="(item, i) in historyList"
                  :key="i"
                  @click="
                    $router.push({
                      name: 'playing',
                      query: { movieId: item.id }
                    })
                  "
                >
                  <img v-if="historyList.length" :src="item.coverImg" alt />
                  <div>
                    <p>{{ item.title }}</p>
                    <div class="tab">
                      <span v-for="(l, i) in item.tags" :key="i">{{
                        l.name
                      }}</span>
                    </div>
                    <div class="times">{{ item.description }}</div>
                  </div>
                </li>
              </ul>
            </van-list>
            <Nodata v-else></Nodata>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { watchingAPI } from "../../api";

export default {
  name: "history",
  data() {
    return {
      list: [
        {
          title: "今日",
          timeType: "1"
        },
        {
          title: "昨日",
          timeType: "2"
        },
        {
          title: "近一周",
          timeType: "3"
        },
        {
          title: "全部",
          timeType: "0"
        }
      ],
      query: {
        timeType: 0
      },
      historyList: [],
      parameterList: [
        {
          page: 1,
          pageSize: 10
        },
        {
          page: 1,
          pageSize: 10
        },
        {
          page: 1,
          pageSize: 10
        },
        {
          page: 1,
          pageSize: 10
        }
      ],
      isLoading: true,
      loading: false,
      finished: false
    };
  },
  created() {
    this.getHistory({
      page: 1,
      pageSize: 10,
      timeType: "1"
    });
  },
  methods: {
    getHistory(e) {
      watchingAPI(e).then(res => {
        if (res.code) {
          console.log(res.data, "watchingAPI");
          this.historyList = res.data.list;
        } else {
          this.loading = false;
          this.$toast(res.msg);
        }
      });
    },
    changeTab(i) {
      this.getHistory(
        Object.assign(
          { timeType: this.list[i].timeType },
          this.parameterList[i]
        )
      );
    },
    onRefresh(i) {
      this.parameterList[i].page = 1;

      this.finished = false;
      watchingAPI({
        timeType: this.list[i].timeType,
        page: 1,
        pageSize: 10
      }).then(res => {
        if (res.code) {
          this.historyList = res.data.list;
          console.log(res.data.list, "res.data.list");
          this.$toast("刷新成功");
        } else {
          this.$toast(res.msg);
          this.loading = false;
        }
        this.isLoading = false;
      });
    },
    onLoad(i) {
      this.parameterList[i].page++;
      watchingAPI(
        Object.assign(
          { timeType: this.list[i].timeType },
          this.parameterList[i]
        )
      ).then(res => {
        if (res.code) {
          this.historyList = this.historyList.concat(res.data.List);
          this.loading = false;
          if (res.data.list.length < this.parameterList[i].pageSize) {
            this.finished = true;
          }
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
.history {
  .van-list {
    min-height: calc(100vh - 200px);
  }
  .history-top {
    height: 103px;
    background-color: #3a3b4d;
    line-height: 103px;
    text-align: center;
    font-size: 40px;
    color: #7d8090;
    position: relative;
    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
  }
  ul {
    // border-bottom: 1px solid #dcdcdc;
    width: 100%;
    margin-top: 20px;
    margin-left: 20px;
    li {
      display: flex;
      width: 100%;
      margin-bottom: 20px;
      img {
        width: 284px;
        height: 190px;
      }
      > div {
        padding-left: 20px;
        width: 420px;
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
          overflow-x: auto;
          white-space: nowrap;

          span {
            display: inline-block;
            padding: 6px 20px;
            background-image: linear-gradient(#e9d3a8, #e9d3a8),
              linear-gradient(#000000, #000000);
            background-blend-mode: normal, normal;
            border-radius: 24px;
            color: #999999;
            font-size: 24px;
            margin-right: 10px;
          }
          span:last-child {
            margin-right: 0;
          }
        }
        .times {
          font-size: 28px;
          color: #999999;
          margin-top: 34px;
          // overflow: hidden;
          overflow-x: auto;
          // text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
