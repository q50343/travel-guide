<template>
  <div class="header">
    <div class="df-between header-main">
      <router-link to="/" class="header-logo"></router-link>
    </div>
    <div class="select df-center" @click="openCity = !openCity">
      <span class="select-input" v-text="`${cityName(city)}｜${modeName}`"></span>
      <button :class="['select-btn', { down: !openCity }]">
        <i class="icofont-circled-up"></i>
      </button>
    </div>
    <div :class="['drowdown df-around bdrs-xl',{ shadow: openCity },{ show: openCity }]">
      <h3 class="fz-md drowdown-title">選擇區域</h3>
      <span :class="['drowdown-item bdrs-sm', { active: city === 'Taiwan' }]"  @click="setCity('Taiwan')">臺灣</span>
      <div class="tabs">
        <input type="radio" id="tabs1" class="tabs-radio" name="tabs" checked />
        <input type="radio" id="tabs2" class="tabs-radio" name="tabs" />
        <input type="radio" id="tabs3" class="tabs-radio" name="tabs" />
        <input type="radio" id="tabs4" class="tabs-radio" name="tabs" />
        <ul class="tabs-cnt">
          <li class="tabs-cnt-item df-around" :key="region" v-for="region in regions">
            <span
              :class="['drowdown-item bdrs-sm',{ active: item === city }]"
              v-for="item in cityFilter(region)" :key="item"
              v-text="cityName(item)" @click="setCity(item)">
            </span>
          </li>
        </ul>
        <div class="tabs-ctl df-around">
          <label for="tabs1" class="tabs-ctl-item">北部</label>
          <label for="tabs2" class="tabs-ctl-item">中部</label>
          <label for="tabs3" class="tabs-ctl-item">南部</label>
          <label for="tabs4" class="tabs-ctl-item">東部&離島</label>
        </div>
      </div>
      <hr class="drowdown-hr" />
      <h3 class="fz-md drowdown-title">選擇類型</h3>
      <div class="drowdown-mode df-around">
        <span v-for="item in Object.keys(modeLib)" :key="item"
          :class="['drowdown-item bdrs-sm',{ active: searchMode === item }]"
          @click="searchMode = item">
          {{modeLib[item]}}
        </span>
      </div>
      <button class="drowdown-btn fz-sm bdrs-sm" @click="openCity = !openCity"> OK! </button>
    </div>
    <div class="textbox df-center">
      <input
        type="text"
        class="textbox-input"
        placeholder="多筆資料用空格格開(選填)"
        v-model="keyword"
        @keypress.enter="goSearch()"
      />
      <button class="textbox-btn" @click="goSearch()">
        <i class="icofont-search-1"></i>
      </button>
    </div>
    <button class="searchBtn fz-md bdrs-sm" @click="goSearch()">
      <i class="icofont-search-1"></i>
      <span> 開始搜尋</span>
    </button>
  </div>
</template>

<script>
import { cityLib, modeLib } from '../lib.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Header',
  props: { city: String, setCity: Function },
  data () {
    return {
      openCity: false,
      searchMode: 'ScenicSpot',
      regions: ['North', 'Central', 'South', 'East', 'Outer'],
      keyword: ''
    }
  },
  computed: {
    ...mapState(['mode']),
    modeName () {
      return modeLib[this.searchMode]
    },
    modeLib () {
      return modeLib
    }
  },
  methods: {
    ...mapMutations(['SET_MODE']),
    cityName (city) {
      return cityLib[city].name
    },
    cityFilter (region) {
      return Object.keys(cityLib).filter((item) => cityLib[item].region === region)
    },
    goSearch () {
      this.SET_MODE(this.searchMode)
      this.key = this.keyword.split(' ').join()
      this.$router.push({
        name: 'Search',
        params: { mode: this.mode, city: this.city, keyword: this.key }
      })
    }

  }
}
</script>

<style lang='scss'>
@import "../assets/scss/_variables.scss";
.header {
  &-main {
    position: relative;
    z-index: 2;
    &::after {
      content: "";
      position: absolute;
      top: -1.5rem;
      left: -1.5rem;
      right: -1.5rem;
      bottom: -4.5rem;
      background-color: $c_light;
      z-index: -1;
    }
  }
  &-logo {
    display: block;
    width: 150px;
    height: 70px;
    background: url(data:image/png;base64,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)
    no-repeat 50% / contain;
    display: block
  }
}
.select,
.textbox {
  flex-wrap: nowrap;
  margin: 1rem 0;
  padding: 0.5rem 0.75rem;
  background-color: $c_secondary-light;
  border: 1px solid $c_secondary;
  border-radius: 0.5rem;
  &-input {
    width: 100%;
    font: 1.25rem $font;
    color: $c_dark;
    background-color: transparent;
    border: none;
    outline: none;
    &::placeholder {
      font: 1.25rem $font;
      color: $c_secondary;
    }
  }
  &-btn {
    font-size: 1.5rem;
    color: $c_main;
    background: transparent;
    text-decoration: none;
    border: none;
    outline: none;
    transform: rotate(360deg);
    transition: transform 0.5s;
    cursor: pointer;
  }
}
.select {
  position: relative;
  margin-top: 1.5rem;
  z-index: 2;
  cursor: pointer;
  &-btn.down {
    transform: rotate(180deg);
  }
}
.drowdown {
  position: absolute;
  top: -700px;
  left: 1.5rem;
  right: 1.5rem;
  justify-content: start;
  padding: 0.5rem;
  background-color: #fff;
  z-index: 1;
  transition: top .5s;
  &.show {
    top: 168px;
    transition: top .5s,box-shadow .5s .5s;
  }
  &-title {
    position: relative;
    width: 100%;
    margin: 0.3rem 0;
    &:after {
      content: "";
      position: absolute;
      bottom: 3px;
      left: 0px;
      width: 4em;
      height: 5px;
      background-color: $c_main;
      z-index: -1;
    }
  }
  &-item {
    display: block;
    margin: 0.2rem Min(0.5rem, 1vw);
    padding: 0.3rem 1.2rem;
    border: 1px solid $c_main;
    transition: color 0.5s, background-color 0.5s;
    cursor: pointer;
    &:hover,
    &.active {
      color: $c_light;
      background-color: $c_main;
    }
  }
  &-mode {
    width: 100%;
    > span {
      margin: 0.3rem 0 0.8rem;
      padding: 0.2rem 0.8rem;
    }
  }
  &-swtich {
    display: none;
    &:checked + label {
      background: $c_main;
      &:after {
        left: calc(100% - 3px);
        transform: translateX(-100%);
      }
    }
  }
  &-swtich-btn {
    position: relative;
    display: block;
    width: 4rem;
    height: 2rem;
    background: $c_secondary-dark;
    border-radius: 0.5rem;
    cursor: pointer;
    &:after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: calc(2rem - 6px);
      height: calc(2rem - 6px);
      background: $c_light;
      border-radius: 0.5rem;
      transition: 0.3s;
    }
  }
  &-btn {
    margin-top: 1rem;
    margin-left: auto;
    color: $c_light;
    padding: 0.5rem 2rem 0.4rem;
    background-color: $c_main;
    border: none;
    outline: none;
    cursor: pointer;
  }
  &-hr {
    width: 100%;
    margin: 0;
    border: 1px solid $c_secondary;
  }
}
.tabs {
  position: relative;
  width: 100%;
  height: 190px;
  overflow: hidden;
  &-radio {
    @for $i from 1 through 4 {
      &:nth-child(#{$i}):checked ~ .tabs-cnt {
        transform: translateX(($i - 1) * -100%);
      }
      &:nth-child(#{$i}):checked ~ .tabs-ctl > .tabs-ctl-item:nth-child(#{$i}) {
        border-bottom-color: $c_main;
        &::after {
          content: "地區";
        }
      }
    }
  }
  &-cnt {
    position: absolute;
    top: 0;
    width: inherit;
    transition: transform 0.5s;
  }
  &-cnt-item {
    position: absolute;
    justify-content: start;
    width: inherit;
    padding-top: 2rem;
    background-color: $c_light;
    @for $i from 1 through 5 {
      &:nth-of-type(#{$i}) {
        left: ($i - 1) * 100%;
      }
    }
  }
  &-ctl {
    position: absolute;
    top: 0.5rem;
    left: 0;
    right: 0;
    &-item {
      border-bottom: 3px solid transparent;
      cursor: pointer;
    }
  }
  input {
    visibility: hidden;
  }
}
.searchBtn {
  display: block;
  width: 100%;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  color: $c_light;
  background-color: $c_main;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
