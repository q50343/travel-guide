<template>
  <div>
    <div :class="'card-' + recMode" v-if="loading === 1">
      <router-link
        :to="`/D/${item.ID}/`"
        class="card bdrs-sm"
        v-for="item in result"
        :key="item.ID"
      >
        <div class="card-box">
          <img
            class="card-img"
            :src="item.Picture.PictureUrl1"
            :alt="item.Picture.PictureDescription1 || item.Name"
            onerror="this.style.display='none'"
          />
        </div>
        <div class="card-content">
          <h2 class="card-title" v-text="item.Name"></h2>
          <p class="card-text" v-if="item.Date">
            <i class="icofont-calendar"></i>
            <span v-text="' ' + item.Date"></span>
          </p>
          <p class="card-text" v-if="!item.Date && item.StartTime">
            <i class="icofont-calendar"></i>
            <span v-text="' ' + item.StartTime + ' ~ '"></span>
            <span v-text="item.EndTime"></span>
          </p>
          <p class="card-text" v-if="item.OpenTime">
            <i class="icofont-clock-time"></i>
            <span v-text="' ' + item.OpenTime.split('；')[0]"></span>
          </p>
          <p class="card-text" v-if="item.TicketInfo">
            <i class="icofont-ticket"></i>
            <span v-text="' ' + item.TicketInfo"></span>
          </p>
          <p class="card-text" v-if="item.Address">
            <i class="icofont-location-pin"></i>
            <span v-text="' ' + item.Location" v-if="item.Location"></span>
            <span v-text="' ' + item.Address"></span>
          </p>
          <p
            class="card-text"
            v-if="item.Class || item.Class1 || item.Class2 || item.Class3"
          >
            <i class="icofont-tags"></i>
            <span
              class="card-tag bdrs-sm"
              v-text="item.Class"
              v-if="item.Class"
            ></span>
            <span
              class="card-tag bdrs-sm"
              v-text="item.Class1"
              v-if="item.Class1"
            ></span>
            <span
              class="card-tag bdrs-sm"
              v-text="item.Class2"
              v-if="item.Class2"
            ></span>
            <span
              class="card-tag bdrs-sm"
              v-text="item.Class3"
              v-if="item.Class3"
            ></span>
          </p>
        </div>
      </router-link>
    </div>
    <div v-if="loading === 0">
      <Loading :loadMode="recMode" :amount="amount" />
    </div>
    <div v-if="loading === -1">
      <Error />
    </div>
  </div>
</template>

<script>
import {getNearbyInfo, dataFilter, dataRegular} from '../api.js'
import Loading from '../components/Loading.vue'
import Error from '../components/Error.vue'

export default {
  name: 'Recommend',
  props: {recMode: String, lat: Number, lon: Number, page: Number, amount: String},
  components: { Loading, Error },
  data () {
    return {
      loading: 0,
      result: null
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      getNearbyInfo(this.recMode, this.lat, this.lon, this.page).then((res) => {
        if (res.length === 0) throw new Error()
        return dataFilter(res, this.amount)
      }).then((res) => dataRegular(res))
        .then((data) => {
          this.result = data
          this.loading = 1
        })
        .catch(() => (this.loading = -1))
    }
  }
}
</script>
