<template>
  <v-app>
    <MainNav />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MainNav from './components/mainNav.vue'
import api from './api/api.js'
import values from 'lodash/values'
export default {
  name: 'App',
  components: {
    MainNav
  },

  data: () => ({
    //
  }),
  created () {
    //  check for a user in localstorage
    //  validate account & jwt????
    const account = JSON.parse(localStorage.getItem('account'))
    const jwt = localStorage.getItem('jwt')
    if (account && jwt) {
      //  load the user to vuex and localstorage
      this.$store.commit('setAccount', account)
      this.$store.commit('setJwt', jwt)
    } else {
      this.$store.commit('setAccountToGuest')
      this.$store.commit('setJwt', '')
    }

    const self = this
    api.engine.getSpaces().then(function (response) {
      //  don't know why api returns an object here . .  look at it!!!!
      //  array array array . . . yet we get an object, muthafer!!
      //  lodash to the rescue
      self.$store.commit('setSpaces', values(response.data.spaces))
    })
    api.engine.getSpaceTypes().then(function (response) {
      self.$store.commit('setSpaceTypes', response.data.space_types)
    })
    api.engine.getSelectGroups().then(function (response) {
      self.$store.commit('setSelectGroups', response.data.selectGroups)
    })
    api.engine.getReservations().then(function (response) {
      self.$store.commit('setReservations', response.data)
    })
  },
  methods: {
    setWindowHeight () {
      var b = document.querySelector('#mainNav')
      console.log('set', b.offsetHeight)
      this.$store.commit('setWindowHeight', b.offsetHeight)
    }
  },
  mounted () {
    this.setWindowHeight()
    window.addEventListener('resize', this.setWindowHeight)
  }
}
</script>

<style lang="sass">
  @import '../node_modules/typeface-roboto/index.css'
</style>
