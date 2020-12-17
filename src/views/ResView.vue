<template>
  <v-container
    id="con"
    style="padding: 0px;"
    fluid
  >
    <div>
      {{ boxHeight }}
    </div>
    <ResTable
      :reservations="reservations"
      :spaces="spaces"
    />
  </v-container>
</template>

<script>
import ResTable from './../components/resTable.vue'
export default {
  name: 'ResView',
  components: {
    ResTable
  },
  data: function () {
    return {
      boxHeight: null,
      tReservations: [
        { id: '1', customer: 'Horton', startDate: '2020-10-27', endDate: '2020-10-29', duration: '2', spaceId: '1' },
        { id: '2', customer: 'Janice', startDate: '2020-10-28', endDate: '2020-10-30', duration: '3', spaceId: '2' },
        { id: '3', customer: 'Beatrice', startDate: '2020-10-29', endDate: '2020-11-04', duration: '5', spaceId: '3' },
        { id: '4', customer: 'June', startDate: '2020-10-30', endDate: '2020-11-04', duration: '5', spaceId: '1' },
        { id: '5', customer: 'Irwin', startDate: '2020-10-29', endDate: '2020-11-03', duration: '4', spaceId: '4' }
      ]
    }
  },
  computed: {
    reservations: {
      get: function () {
        return this.$store.state.reservations
      }
    },
    spaces: {
      get: function () {
        return this.$store.state.spaces
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.hello {
  color: rgb(126, 219, 126)
}
</style>
