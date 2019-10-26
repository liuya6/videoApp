<template>
  <div class="find" v-title="'发现'">
    <Header title="发现" noLeft="1" noRight="1"></Header>
    <img
      class="search"
      src="/images/search.png"
      alt
      @click="$router.push({ name: 'search' })"
    />
    <div class="findContent">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <ul>
            <li v-for="(item, i) in List" :key="i">
              <img
                :src="item.coverImg"
                @click="
                  $router.push({ name: 'playing', query: { movieId: item.id } })
                "
                alt
              />
              <div class="info flexB">
                <span>{{ item.countPlay }}次播放</span>
                <i
                  @click="ifLike(item, i)"
                  class="iconfont"
                  :style="{ color: item.isCollection ? 'red' : '#707070' }"
                  >&#xe6c1;</i
                >
              </div>
              <div class="vipMovie" v-show="item.access == '1'">
                <img
                  src="../../assets/images/vipMovie.png"
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
              <div class="blank"></div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { find, movieCollection } from "../../api";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Find",
  data() {
    return {
      List: [],
      isLoading: true,
      loading: false,
      finished: false,
      count: 3,
      parameter: {
        keyword: "",
        page: 1,
        pageSize: 10
      }
    };
  },
  created() {
    console.log(this.findList, this.ifGetFind, "this.findList");
    if (this.ifGetFind) {
      this.initData();
      this.$store.commit("SET_IFGETFIND", false);
    } else {
      this.List = this.findList;
    }
  },
  computed: {
    ...mapGetters(["findList", "userInfo", "ifGetFind"])
  },
  methods: {
    ...mapActions(["getFind"]),
    initData() {
      find(this.parameter).then(res => {
        if (res.code) {
          this.List = res.data.hot;
          this.$store.commit("SET_find", res.data.hot);
        }
        console.log(res.data.hot, res.msg, "findres");
      });
    },
    ifLike(item, i) {
      let type = item.isCollection ? "unlike" : "like";
      movieCollection({ type, movieId: item.id }).then(res => {
        if (res.code) {
          this.List[i].isCollection = !this.List[i].isCollection;
          this.$store.commit("SET_IFGETFIND", true);
        } else {
          this.$toast(res.msg);
        }
        console.log(res, res.msg, "ifLike");
      });
    },
    onRefresh() {
      this.finished = false;
      this.parameter.page = 1;
      find(this.parameter).then(res => {
        if (res.code) {
          this.List = res.data.hot;
          this.$store.commit("SET_find", res.data.hot);
          this.isLoading = false;
          this.$toast("刷新成功");
        } else {
          this.$toast(res.msg);
        }
      });
    },
    onLoad() {
      this.parameter.page++;
      find(this.parameter).then(res => {
        if (res.code) {
          console.log(res);
          if (res.data.hot.length) {
            this.List = this.List.concat(res.data.hot);
            this.loading = false;
          } else {
            this.loading = false;
            this.finished = true;
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.find {
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 99;
  }
  .search {
    position: fixed;
    width: 46px;
    height: 46px;
    right: 20px;
    top: 30px;
    z-index: 2;
  }
  .findContent {
    margin-top: 100px;
    padding-bottom: 102px;
    ul {
      li {
        position: relative;
        > img {
          width: 100%;
          height: 400px;
        }
        .vipMovie {
          position: absolute;
          right: -23px;
          top: -22px;
          z-index: 10;
          width: 100px;
          height: 100px;
        }
      }
      .info {
        padding: 0 40px;
        height: 97px;
        font-size: 28px;
        span {
          color: #999999;
        }
        i {
          font-size: 48px;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
  }
}
</style>
