<template>
  <div v-title="'我的喜欢'">
    <Header title="我的喜欢"></Header>
    <div class="myLove">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <ul v-if="list.length">
            <li
              v-for="(item, i) in list"
              :key="i"
              @click="
                $router.push({ name: 'playing', query: { movieId: item.id } })
              "
            >
              <img :src="item.coverImg" alt />
              <div>
                <p>{{ item.title }}</p>
                <div class="tab">
                  <span v-for="(l, i) in item.tags" :key="i">{{ l.name }}</span>
                </div>
                <div class="times">{{ item.countPlay }}次播放</div>
              </div>
            </li>
          </ul>
          <Nodata v-else></Nodata>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { collectionAPI } from "../../api";

export default {
  name: "myLove",
  data() {
    return {
      list: [],
      parameter: {
        page: 1,
        pageSize: 10
      },
      show: false,
      value: "",
      isLoading: true,
      loading: false,
      finished: false
    };
  },
  created() {
    collectionAPI(this.parameter).then(res => {
      if (res.code) {
        this.list = res.data.list;
      }
    });
  },
  methods: {
    onRefresh() {
      this.finished = false;
      this.parameter.page = 1;
      collectionAPI(this.parameter).then(res => {
        if (res.code) {
          this.List = res.data.data;
          this.isLoading = false;
          this.$toast("刷新成功");
        } else {
          this.$toast(res.msg);
        }
      });
    },
    onLoad() {
      this.parameter.page++;
      collectionAPI(this.parameter).then(res => {
        if (res.code) {
          console.log(res);
          if (res.data.data) {
            this.List = this.List.concat(res.data.data);
          } else {
            this.finished = true;
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.myLove {
  padding: 16px;
  .van-list {
    min-height: calc(100vh - 132px);
  }
  ul {
    border-bottom: 1px solid #dcdcdc;
    width: 100%;
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
        }
      }
    }
  }
}
</style>
