<template>
  <div>
    <div>
      <v-btn @click="addRowData">ADD</v-btn>
    </div>
    <div
      id="resTable"
      class="ag-theme-balham-dark"
      :style="heightStyle"
    ></div>
  </div>
</template>

<script>
import _ from 'lodash'
import dayjs from 'dayjs'
import { Grid } from 'ag-grid-community'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css'

export default {
  name: 'ResTable',
  props: ['reservations', 'spaces'],
  data: function () {
    return {
      columnDefs: null,
      grid: null,
      // specify the data
      rowData: null
    }
  },
  computed: {
    w: {
      get: function () {
        return this.$store.state.windowHeight
      }
    },
    heightStyle: {
      get: function () {
        return 'height: ' + (this.w - 85) + 'px;'
      }
    }
  },
  created () {
    this.rowData = []
    _.each(this.spaces, (space) => {
      const iSpace = {}
      iSpace.room = space.space_id
      this.rowData.push(iSpace)
    })
    this.columnDefs = [
      {
        headerName: 'Room',
        field: 'room',
        width: 190,
        pinned: 'left',
        cellRenderer: (params) => {
          const eGui = document.createElement('div')
          //  eGui.innerHTML = '<span class="gButton">' + params.data.room + '</span>'
          const s = _.find(this.spaces, function (o) {
            if (o.space_id.toString() === params.data.room.toString()) {
              return true
            }
          })
          eGui.innerHTML = s.description
          eGui.addEventListener('click', function () { console.log(params) })
          return eGui
        }
      },
      {
        headerName: '',
        field: 'foo',
        width: 0,
        pinned: 'left',
        cellRenderer: function (params) {
          const fooDiv = document.createElement('div')
          fooDiv.innerHTML = '>'
          fooDiv.addEventListener('click', function () {
            console.log('fooClick', params.data.room)
          })
          return fooDiv
        }
      }
    ]
    var d = dayjs('2020-10-25')
    for (let i = 0; i < 32; i++) {
      const iCol = {
        headerName: d.format('YYYY-MM-DD'),
        field: d.format('YYYY-MM-DD'),
        width: 90,
        cellStyle: { border: '1px solid #444' },
        colSpan: (params) => {
          let duration = 1
          const res = _.filter(this.reservations, function (o) {
            return o.checkin.toString() === params.colDef.headerName.toString()
          })
          if (res.length > 0) {
            _.each(res, (reservation) => {
              if (params.data.room.toString() === reservation.space_id.toString()) {
                var ci = dayjs(reservation.checkin)
                var co = dayjs(reservation.checkout)
                var diff = co.diff(ci, 'day')
                duration = diff
              }
            })
          }
          return duration
        },
        cellRenderer: (params) => {
          const e = document.createElement('div')
          const res = _.filter(this.reservations, function (o) {
            return o.checkin.toString() === params.colDef.headerName.toString()
          })
          if (res) {
            //  console.log('res: ', res)
            _.each(res, (reservation) => {
              //  console.log(params.data.room, reservation.spaceId)
              if (params.colDef.field === reservation.checkin && reservation.space_id.toString() === params.data.room.toString()) {
                //  console.log('got', params)
                e.classList.add('activeRes')
                e.innerHTML = reservation.customer_obj.lastName + ', ' + reservation.customer_obj.firstName
                e.addEventListener('click', function () {
                  console.log(reservation.id)
                })
              } else {
                e.innerHTML = 'blah'
                e.addEventListener('click', function () {
                  console.log(params.data.room + ' ' + params.colDef.headerName)
                })
              }
            })
          }
          if (res.length === 0) {
            //  console.log('no res', params)
            e.innerHTML = 'nores'
            e.addEventListener('click', function () {
              console.log(params.data.room + ' ' + params.colDef.headerName)
            })
          }
          return e
        }
      }
      this.columnDefs.push(iCol)
      d = d.add(1, 'day')
    }
  },
  mounted: function () {
    this.renderGrid()
  },
  methods: {
    addRowData () {
      var obj = {
        id: '888',
        checkin: '2020-11-01',
        checkout: '2020-11-6',
        space_id: '6',
        customer_obj: {
          firstName: 'Bill',
          lastName: 'Dickson'
        }
      }
      this.reservations.push(obj)
      this.grid.gridOptions.api.setRowData(this.rowData)
    },
    renderGrid () {
      console.log('render')
      var gridOptions = {
        columnDefs: this.columnDefs,
        rowData: this.rowData
      }
      var gridDiv = document.querySelector('#resTable')
      //  eslint-disable-next-line
      this.grid = new Grid(gridDiv, gridOptions)
      console.log('this.grid', this.grid)
    }
  },
  watch: {
    w: function (val) {
      console.log('watch', val)
    }
  }
}
</script>

<style>
  #resTable {
    width: 100%;
  }

  .activeRes {
  padding-left: 4px;
  color: rgb(51, 41, 199);
  background-color: rgb(207, 207, 207);
  border-radius: 4px;
  max-height: 24px;
}
</style>
