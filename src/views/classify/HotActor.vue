<template>
  <div class="hotActor" v-title="'人气女优'">
    <Header title="人气女优"></Header>
    <div class="search">
      <div>
        <input
          type="text"
          placeholder="搜姓名查找"
          v-model="parameter.keyword"
        />
        <i class="iconfont" @click="search">&#xe631;</i>
      </div>
    </div>
    <div class="actorList">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <ul>
            <li v-for="(item, i) in hotActorList" :key="i">
              <div>
                <i class="imgBox">
                  <img :src="item.coverImg" alt="" />
                </i>
              </div>
              <div>
                <h1>{{ item.title }}</h1>
                <p>
                  {{ item.description }}
                </p>
                <p>
                  <span>作品数量：</span><b>{{ item.countMovie }}</b>
                </p>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { albumList } from "../../api";
export default {
  name: "HotActor",
  data() {
    return {
      loading: false,
      isLoading: true,
      finished: false,
      hotActorList: [],
      parameter: {
        keyword: "",
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
      albumList(this.parameter).then(res => {
        if (res.code) {
          this.hotActorList = res.data;
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
      albumList(this.parameter).then(res => {
        if (res.code) {
          this.hotActorList = res.data;
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
      albumList(this.parameter).then(res => {
        if (res.data.length) {
          this.hotActorList = this.hotActorList.concat(res.data);
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
.hotActor {
  min-height: 100%;
  overflow: hidden;
  background-color: #2f3247;
  .header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9;
  }
  .search {
    position: fixed;
    left: 0;
    top: 100px;
    z-index: 9;
    width: 100%;
    background-color: #2f3247;
    > div {
      width: 536px;
      height: 65px;
      line-height: 65px;
      border-radius: 65px;
      margin: 30px auto;
      font-size: 28px;
      border: 2px solid #3a3b4d; /*no*/
      position: relative;
      i {
        color: #999999;
        font-size: 32px;
        position: absolute;
        width: 84px;
        height: 65px;
        right: 0;
        top: 0;
        background-color: #3a3b4d;
        border-radius: 30px;
        text-align: center;
      }
      input {
        border: none;
        height: 45px;
        text-align: center;
        width: 420px;
        color: #fff;
        background-color: #2f3247;
        margin-left: 10px;
        padding-left: 20px;
        &::placeholder {
          color: #999999;
        }
      }
    }
  }
  .actorList {
    margin-top: 225px;
    .van-pull-refresh {
      min-height: calc(100vh - 225px);
    }
    ul {
      li {
        display: flex;
        width: 698px;
        height: 178px;
        background-color: #3a3b4d;
        margin: 40px auto;
        border-radius: 100px 15px 15px 100px;
        > div {
          &:first-child {
            flex: 0 0 auto;
            width: 285px;
            position: relative;
            .imgBox {
              width: 200px;
              height: 200px;
              position: absolute;
              top: -15px;
              z-index: 1;
              left: 0;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          &:last-child {
            h1 {
              color: #fff;
              font-size: 30px;
              margin-top: 15px;
              margin-bottom: 5px;
            }
            p {
              &:nth-child(2) {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #999;
                padding-right: 90px;
              }
              &:nth-child(3) {
                margin: 10px 0 10px 0;
                text-align: right;
                padding-right: 80px;
                color: #999;
                b {
                  color: #fe6d10;
                  font-weight: normal;
                  font-size: 28px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
