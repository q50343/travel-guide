<template>
  <div class="container">
    <header class="head shadow">
      <Header :city="city" :setCity="setCity" />
    </header>
    <div class="box">
      <div
        class="goTop df-center fz-xl bdrs-xl shadow"
        @click="window.scrollTo({ top: 0, behavior: 'smooth' })"
      >
        <i class="icofont-rounded-left"></i>
      </div>
      <router-view
        :mode="mode"
        :city="city"
        :key="$route.fullPath"
      />
      <footer class="foot df-around">
        <p><i class="icoTW-main-island"></i>TAIWAN TRAVEL</p>
        <p>
          UI Design：
          <a
            href="https://www.figma.com/file/fnHynjl6HHHCcqay2C4KVn"
            target="_blank"
          >
            jhen
          </a>
        </p>
        <p>Source：交通部PTX服務平臺</p>
        <img
          src="./assets/images/ptx_logo.png"
          alt="交通部PTX服務平臺"
          class="foot-ptx"
        />
      </footer>
    </div>
  </div>
</template>
<script>
import Header from './components/Header.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  components: { Header },
  data () {
    return {
      city: 'Taiwan'
    }
  },
  computed: {
    ...mapState(['mode'])
  },
  methods: {
    ...mapMutations(['SET_MODE']),
    setCity (c) {
      this.city = c
    },
    changeStyle (color) {
      document.documentElement.style.setProperty('--c-main', color)
      document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
    }
  }
  // watch: {
  //   mode () {
  //     if (this.mode === 'ScenicSpot') this.changeStyle('#3fb195')
  //     if (this.mode === 'Restaurant') this.changeStyle('#ff9999')
  //     if (this.mode === 'Hotel') this.changeStyle('#A79BFD')
  //     if (this.mode === 'Activity') this.changeStyle('#feb155')
  //     console.log(document.querySelector('meta[name="theme-color"]'))
  //   }
  // }
}
</script>

<style lang='scss'>
@import "./assets/scss/_variables.scss";

body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  align-items: flex-start;
}
.head {
  position: sticky;
  top: 0;
  width: 354px;
  height: 100vh;
  padding: 1rem;
  background-color: $c_light;
  box-sizing: border-box;
  overflow: auto;
  overscroll-behavior: contain;
  @include pad {
    position: fixed;
    z-index: 10;
    transform: translateX(-150%);
    transition: transform 0.5s;
  }
  @include mobile {
    width: 100vw;
  }
  &.show {
    @include pad {
      transform: translateX(0%);
    }
  }
}
.box {
  flex: 1;
  box-sizing: border-box;
  .goTop {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: none;
    width: 40px;
    height: 40px;
    color: $c_light;
    background-color: $c_main;
    cursor: pointer;
    transform: rotate(90deg);
    z-index: 1;
  }
  .nav {
    position: sticky;
    top: 0;
    display: none;
    justify-content: space-between;
    align-items: center;
    background-color: $c_light;
    z-index: 5;
    @include pad {
      display: flex;
    }
    &-btn {
      margin: 0 1rem;
      font-size: 1.8rem;
      color: $c_main;
      background-color: $c_secondary-light;
      border: none;
      border-radius: 0.5rem;
      outline: none;
      opacity: 0;
      &.show {
        opacity: 1;
      }
    }
    &-logo {
      display: block;
      width: 100px;
      height: 70px;
      background: url(./assets/images/logo.png) no-repeat center center /
        contain;
    }
  }
  .foot {
    padding: 0.5rem;
    font-size: 1.1rem;
    color: $c_light;
    background-color: $c_main;
    @include mobile {
      & > * {
        width: 100%;
        margin-bottom: 0.5rem;
        text-align: center;
      }
    }
    .icoTW-main-island {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
    &-ptx {
      width: 80px;
    }
  }
}
</style>
