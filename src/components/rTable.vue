<template>
  <div>
    <div>start: {{ startDate }}</div>
    <div>end: {{endDate }}</div>
    <v-simple-table
      id="rTable"
      dense
      dark
      fixed-header
      :height="height"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th id="th1" class="th1 text-left">
              Name
            </th>
            <th id="th2" class="text-left">
              Ex
            </th>
            <th
              v-for="d in dateArray"
              :key="d"
              id="d"
            >
              {{d}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="space in spaces"
            :key="space.space_id"
          >
            <td class="td1">{{ space.description }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

  </div>
</template>

<script>
//  eslint-disable-next-line
import dayjs from 'dayjs'
export default {
  name: 'rtable',
  props: ['reservations', 'spaces', 'startDate', 'endDate', 'height', 'daySpan'],
  computed: {
    dateArray: {
      get: function () {
        var arr = []
        var i
        for (i = 0; i < this.daySpan; i++) {
          arr.push(dayjs(this.startDate).add(i, 'day').format('YYYY-MM-DD'))
        }
        return arr
      }
    }
  }
}
</script>

<style scoped>
#rTable{
  width: 100%;
}
/* super fucked up . .  this has to be the same as max-width on the td */
/* fucking css is the HORROR */
/* this has to be "width", not "max-width" */
.th1{
  width: 120px;
}

/* goddam fucking css HELL */
/* this has to be 'max-width' whereas the th has to be 'width" */
/* goddam fucking css */
.td1{
 max-width: 120px;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
}

</style>
