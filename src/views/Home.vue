<template>
  <div class="header">
    <router-link to="/" class="header-logo"></router-link>
    <div class="select df-center" @click="openCity = !openCity">
      {{cityName(city)}}
      <span class="select-input" v-text="`${cityName(city)}｜${modeName}`"></span>
      <button :class="['select-btn', { down: !openCity }]">
        <i class="icofont-circled-up"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { cityLib, modeLib } from '../lib.js'

export default {
  name: 'Header',
  props: { city: String, setCity: Function },
  data () {
    return {
      openCity: false,
      searchMode: 'ScenicSpot'
    }
  },
  computed: {
    modeName () {
      return modeLib[this.searchMode]
    }
  },
  methods: {
    cityName (city) {
      return cityLib[city].name
    }

  }
}
</script>

<style lang='scss'>
.header-logo {
  width: 150px;
  height: 70px;
  background: url(data:image/png;base64,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)
    no-repeat 50% / contain;
}
.icofont-circled-up:before {
  content: "";
}
.select {
  position: relative;
  margin-top: 1.5rem;
  z-index: 2;
  cursor: pointer;
  .textbox {
    flex-wrap: nowrap;
    margin: 1rem 0;
    padding: 0.5rem 0.75rem;
    background-color: #fafafa;
    border: 1px solid #c8c8c8;
    border-radius: 0.5rem;
  }
}
.select-btn, .textbox-btn {
  font-size: 1.5rem;
  color: var(--c-main);
  background: transparent;
  text-decoration: none;
  border: none;
  outline: none;
  transform: rotate(1turn);
  transition: transform .5s;
  cursor: pointer;
  &.select-btn.down {
    transform: rotate(180deg);
  }
}
</style>
