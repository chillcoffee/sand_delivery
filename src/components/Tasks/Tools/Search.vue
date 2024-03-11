<template>
    <q-input 
    v-model="searchField"
    @keyup.esc="searchField=''"
    v-select-all
    label="Search"
    class="col"
    outlined
    >
        <template v-slot:append>
          <q-icon
            v-if="searchField !== ''"
            name="close"
            @click="searchField = ''"
            class="cursor-pointer" />
          <q-icon name="search"/>
        </template>
    </q-input>
</template>

<script>
  import { selectAll } from 'src/directives/directives-select-all'
  import {mapState, mapActions} from 'vuex'
  export default{
    computed: {
      ...mapState('tasks',['search']),
      searchField:{
        get() {
          return this.search
        },
        set(value){
          this.setSearch(value)
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['setSearch'])
    },
    directives: {
      selectAll
    }
  }
  

</script>
