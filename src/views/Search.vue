<template>
<div>
  <div class='search' v-if='loading === 1'>
    <div class='banner shadow'>
      <img class='banner-img' :src='getUrl()' alt='Travel Guide' title='Travel Guide'/>
      <h1 class='banner-text' v-text='getTitle()'></h1>
    </div>
    <div class='mode'>
      <span class="mode-btn bdrs-sm" v-for="item in Object.keys(modeLib)" :key="item"
        :class='{active: mode === item}' @click="setMode(item)">
        <router-link :to='getLink(item)' replace>{{modeLib[item]}}</router-link>
      </span>
    </div>
    <div :class="'card-' + mode">
      <router-link :to="`/D/${item[mode + 'ID']}/`" class='card bdrs-sm'
        v-for='item in result' :key='`${item[mode + "ID"]}`'>
        <div class='card-box'>
          <img
            class='card-img'
            :src='item.Picture.PictureUrl1'
            :alt='item.Picture.PictureDescription1 || item.Name'
            onerror='this.style.display="none"'
          />
        </div>
        <div class='card-content'>
          <h2 class='card-title' v-text='item[`${mode}Name`]'></h2>
          <p class='card-text' v-if='item.Date'>
            <i class='icofont-calendar'></i>
            <span v-text='" " + item.Date'></span>
          </p>
          <p class='card-text' v-if='!item.Date && item.StartTime'>
            <i class='icofont-calendar'></i>
            <span v-text='" " + item.StartTime + " ~ "'></span>
            <span v-text='item.EndTime'></span>
          </p>
          <p class='card-text' v-if='item.OpenTime'>
            <i class='icofont-clock-time'></i>
            <span v-text='" " + item.OpenTime.split("；")[0]'></span>
          </p>
          <p class='card-text' v-if='item.TicketInfo'>
            <i class='icofont-ticket'></i>
            <span v-text='" " + item.TicketInfo'></span>
          </p>
          <p class='card-text' v-if='item.Address'>
            <i class='icofont-location-pin'></i>
            <span v-text='" " + item.Location' v-if='item.Location'></span>
            <span v-text='" " + item.Address'></span>
          </p>
          <p class='card-text' v-if='item.Class || item.Class1 || item.Class2 || item.Class3'>
            <i class='icofont-tags'></i>
            <span class='card-tag bdrs-sm' v-text='item.Class' v-if='item.Class'></span>
            <span class='card-tag bdrs-sm' v-text='item.Class1' v-if='item.Class1'></span>
            <span class='card-tag bdrs-sm' v-text='item.Class2' v-if='item.Class2'></span>
            <span class='card-tag bdrs-sm' v-text='item.Class3' v-if='item.Class3'></span>
          </p>
        </div>
      </router-link>
    </div>
    <button :class='["loadBtn fz-md bdrs-sm", { hide: loadBtn }]' @click='loadData'>載入更多</button>
  </div>
  <div class='search' v-if='loading === 0'>
    <div class='banner shadow'>
      <img
        class='banner-loading'
        src='../assets/images/banner_Home.png'
        alt='Travel Guide'
        title='Travel Guide'
      />
    </div>
    <div class='mode'></div>
    <Loading :loadMode='mode' :amount='parseInt(6)' />
  </div>
  <div class='search' v-if='loading === -1'>
    <div class='banner shadow'>
      <img
        class='banner-img'
        :src='getUrl()'
        alt='Travel Guide'
        title='Travel Guide'
      />
    </div>
    <Error />
  </div>
</div>
</template>

<script>
import { getTravelInfo, getNearbyInfo, dataRegular } from '../api.js'
import { cityLib, modeLib } from '../lib.js'
import Loading from '../components/Loading.vue'
import Error from '../components/Error.vue'

import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Search',
  props: { city: String },
  components: { Loading, Error },
  data () {
    return {
      loading: 0,
      loadBtn: true,
      result: []
    }
  },
  computed: {
    ...mapState(['mode']),
    modeLib () {
      return modeLib
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    ...mapMutations(['SET_MODE']),
    cityName (city) {
      return cityLib[city].name
    },
    cityFilter (region) {
      return Object.keys(cityLib).filter((item) => cityLib[item].region === region)
    },
    getLink (mode) {
      return this.$route.params.city ? `/${mode}/${this.$route.params.city}/${this.$route.params.keyword || ''}`
        : `/${mode}/${this.$route.params.lat}/${this.$route.params.lon}`
    },
    getUrl () {
      return require(`@/assets/images/banner_${this.mode}.png`)
    },
    getTitle () {
      if (this.$route.params.keyword) return this.$route.params.keyword.split(',').join(' ')
      else if (this.$route.params.city) return this.$route.params.city.replace(/[A-Z]/g, ' $&')
      else return this.mode
    },
    setMode (m) {
      this.SET_MODE(m)
    },
    loadData () {
      this.loadBtn = true
      let pageIdx = 1
      const load = this.city
        ? getTravelInfo(this.mode, this.city, pageIdx, this.$route.params.keyword)
        : getNearbyInfo(this.mode, this.$route.params.lat, this.$route.params.lon, pageIdx)
      // load.then((res) => {
      //   if (res.length === 0) throw new Error()
      //   if (res.length === 18) this.loadBtn = false
      //   return dataRegular(res)
      // }).then((data) => {
      //   this.result.push(...data)
      //   pageIdx += 1
      //   setTimeout(() => (this.loading = 1), 500)
      //   if (pageIdx === 2) window.scrollTo({ top: 0, behavior: 'smooth' })
      // }).catch(() => (this.loading = -1))
      let data = dataRegular(load)
      this.result.push(...data)
      pageIdx += 1
      setTimeout(() => (this.loading = 1), 500)
      if (pageIdx === 2) window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/scss/_variables.scss';

.search {
  padding: Min(2rem, 4vw);
}
.banner {
  position: relative;
  width: 100%;
  height: Min(300px, 40vw);
  background-color: $c_light;
  border-radius: 1rem;
  overflow: hidden;
  &-img {
    width: 100%;
    height: 100%;
    object-position: center left;
    object-fit: cover;
  }
  &-loading {
    width: 100%;
    height: 100%;
    object-position: center right;
    object-fit: contain;
  }
  &-text {
    position: absolute;
    top: 70%;
    left: 1em;
    color: $c_light;
    font-size: Min(4rem, 5vw);
    font-weight: bold;
    text-shadow: 0 0 1rem #00000099;
    transform: translateY(-50%);
  }
}
.mode {
  margin: 1.5rem 0;
  @include pad {
    text-align: center;
  }
  &-btn {
    display: inline-block;
    margin: 0 Min(0.5rem, 1.5vw);
    padding: 0.3rem 0.8rem;
    color: $c_main;
    border: 1px solid $c_main;
    cursor: pointer;
    a{
      text-decoration: none;
    }
    &.active {
      color: $c_light;
      background-color: $c_main;
    }
  }
}
.loadBtn {
  display: block;
  margin: 0 auto;
  padding: 0.5rem 4rem;
  color: $c_main;
  border: none;
  outline: none;
  transition: color 0.5s, background-color 0.5s;
  cursor: pointer;
  &.hide {
    opacity: 0;
  }
  &:hover {
    color: $c_light;
    background-color: $c_main;
  }
}
</style>
