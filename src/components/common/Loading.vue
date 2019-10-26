<template>
  <div class="my-loading">
    <div class="loading" v-show="loadShow">
      <div class="loadingContent">
        <svg
          class="spinner"
          width="65px"
          height="65px"
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            class="path"
            fill="none"
            stroke-width="6"
            stroke-linecap="round"
            cx="33"
            cy="33"
            r="30"
          ></circle>
        </svg>
        <p>{{ msg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      loadShow: false,
      msg: String
    };
  }
};
</script>

<style scoped lang="less">
@offset: 187;
@duration: 1.4s;
.loading {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  .loadingContent {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.6);
    width: 200px;
    height: 200px;
    border-radius: 10px;
    color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    svg {
      width: 100px;
      height: 100px;
    }
    /*svg path,*/
    /*svg rect {*/
    /*  fill: #fff;*/
    /*}*/
    p {
      font-size: 25px;
      margin-top: 20px;
    }
    .spinner {
      animation: rotator @duration linear infinite;
    }
    @keyframes rotator {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(270deg);
      }
    }
    .path {
      stroke-dasharray: @offset;
      stroke-dashoffset: 0;
      transform-origin: center;
      animation: dash @duration ease-in-out infinite,
        colors (@duration*4) ease-in-out infinite;
    }
    @keyframes colors {
      0% {
        stroke: #fff;
      }
      25% {
        stroke: #fff;
      }
      50% {
        stroke: #fff;
      }
      75% {
        stroke: #fff;
      }
      100% {
        stroke: #fff;
      }
    }
    @keyframes dash {
      0% {
        stroke-dashoffset: @offset;
      }
      50% {
        stroke-dashoffset: @offset / 4;
        transform: rotate(135deg);
      }
      100% {
        stroke-dashoffset: @offset;
        transform: rotate(450deg);
      }
    }
  }
}
</style>
