<template>
  <div>
    <v-navigation-drawer
      id="mainNav"
      v-model="drawer"
      app
      mobile-breakpoint="400"
      width="180"
    >
      <v-list dense>

        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="account.id < 1"
          to="/login"
        >
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="account.id > 0"
          to="/logoff"
        >
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logoff</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="account.id > 0"
          to="/resview"
        >
          <v-list-item-action>
            <v-icon>mdi-calendar-month-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ResView</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="account.id > 0"
          to="/restable"
        >
          <v-list-item-action>
            <v-icon>mdi-calendar-month-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ResTable</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="#555"
      dark
      dense
      flat
      hide-on-scroll
    >
      <v-btn
        outlined
        text
        class="mr-2"
      >
        <v-icon @click.stop="navIconClick">mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>TrekBill.com</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'MainNav',
  components: {
  },
  data: () => {
    return {
      drawer: null
    }
  },
  computed: {
    account: {
      get: function () { return this.$store.state.account }
    },
    jwt: function () { return this.$store.state.jwt }
  },
  methods: {
    navIconClick () {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style scoped>
  .v-navigation-drawer{
    z-index: 1200;
  }
</style>
