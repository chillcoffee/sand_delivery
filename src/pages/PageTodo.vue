<template>
  <q-page >

    <div class="q-pa-md absolute full-width full-height column">

      <template v-if="tasksDownloaded">
          <div class="row q-mb-lg">
          <search></search>
          <sort></sort>
        </div>

        <p
          v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"
          >No search results.</p>
        
        <q-scroll-area        
          class="q-scroll-area-tasks">
          <no-task 
            v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList">
          </no-task>
          <task-todo 
            v-if="Object.keys(tasksTodo).length"
            :tasksTodo="tasksTodo"/>
          <task-completed 
            v-if="Object.keys(tasksCompleted).length" 
            :tasksCompleted="tasksCompleted"/>
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click="showAddTask = true"
            round
            class="all-pointer-events"
            color="primary"
            size="24px"
            icon="add"/>
        </div>
      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner-box
            color="primary"
            size="5.5em"
          />
        </span>
      </template>

      
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask= false"/>
    </q-dialog>

  </q-page>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default{
  data() {
    return {
      showAddTask: false
    }
  },

  computed: {
    ...mapGetters('tasks',['tasksTodo', 'tasksCompleted']),
    ...mapState('tasks',['search','tasksDownloaded']),
    ...mapGetters('settings',['settings'])
  },
  mounted(){
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  },
  components: {
    'add-task' : require ('components/Tasks/Modals/AddTask.vue').default,
    'task-todo' : require ('components/Tasks/TaskTodo.vue').default,
    'task-completed' : require ('components/Tasks/TaskCompleted.vue').default,
    'no-task' : require ('components/Tasks/NoTask.vue').default,
    'search' : require('components/Tasks/Tools/Search.vue').default,
    'sort' : require('components/Tasks/Tools/Sort.vue').default
  },
 
}
</script>

<style>
  .q-scroll-area-tasks{
    display: flex;
    flex-grow: 1;
  }
</style>
