<template>
  <div>
    <v-btn @click="changeStartDate">cStart</v-btn>
    <v-btn @click="changeHeight">cHeight</v-btn>
    <rtable
      :reservations="reservations"
      :spaces="spaces"
      :startDate="startDate"
      :endDate="endData"
      :height="height"
      :daySpan="daySpan"
    />
   </div>
</template>

<script>
import rtable from '../components/rTable.vue'
export default {
  name: 'ResTable',
  components: { rtable },
  data: function () {
    return {
      daySpan: 20,
      reservations: this.$store.state.reservations,
      spaces: this.$store.state.spaces,
      startDate: '2020-10-27',
      endData: '2020-11-28',
      height: this.$store.state.windowHeight - 135
    }
  },
  methods: {
    changeHeight () {
      this.height = 400
    },
    changeStartDate () {
      this.startDate = '2020-10-26'
    },
    setHeight () {
    }
  },
  mounted () {
    window.onresize = () => {
      console.log('resize')
      this.height = this.$store.state.windowHeight - 135
    }
  }
}
</script>

<style scoped>

</style>
