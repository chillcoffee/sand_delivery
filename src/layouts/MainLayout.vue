<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>   
        <q-toolbar-title>
          Sand Delivery
        </q-toolbar-title>
        
        <!-- <q-btn
          v-if="!loggedIn"
          to="/auth"  
          flat        
          icon-right="account_circle"
          label="Login" 
          class="absolute-right"/> -->

        <q-btn
        v-if="loggedIn"
          @click="logoutUser"
          flat
          label="Logout" 
          class="absolute-right"/>  

      </q-toolbar>
    </q-header>

    <q-footer v-if="loggedIn">
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label" />  
      </q-tabs>
    </q-footer>

    <q-drawer
      v-if="loggedIn"
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary">
      <q-list dark>
        <q-item-label header >
          Navigation
        </q-item-label>

        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          class="text-grey-4"
          exact
          clickable>
            <q-item-section avatar>
            <q-icon :name="nav.icon" /> </q-item-section> 
            <q-item-section> 
              <q-item-label>{{ nav.label }}</q-item-label>
            </q-item-section>
        </q-item>
        
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default { 
  name: 'MainLayout',

  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          label: 'Delivery',
          icon: 'front_loader',
          to:'/'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to:'/settings'
        }
      ]
    }
  },
  computed: {
    ...mapState('auth',['loggedIn'])
  },
  methods: {
    ...mapActions('auth',['logoutUser'])
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
  }
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
</style>
