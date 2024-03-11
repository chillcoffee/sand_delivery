<template>
      <q-item
        @click="updateTask({ 
          id: id, 
          updates: { completed: !task.completed}})"

        clickable
        :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
        v-touch-hold:1000.mouse="showEditTaskModal"
        v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label
            :class="{'text-strikethrough' : task.completed}"
            v-html="$options.filters.searchHighlight(task.name, search)"
            >
            </q-item-label>
          <q-item-label caption>
            {{task.address}} - {{ task.product }}
          </q-item-label>
        </q-item-section>

        <q-item-section 
          v-if="task.dueDate"
          side top>
          <q-icon name="event" />
          <q-item-label
            caption>
            {{task.dueDate | niceDate}}
          </q-item-label>
          <q-item-label
            caption><small>{{taskDueTime}}</small></q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <q-btn
            @click.stop="showEditTaskModal"
            flat
            round
            dense
            color="primary"
            icon="edit" />
          <q-btn
            @click.stop="promptToDelete(id)"
            flat
            round
            dense
            color="red-4"
            icon="delete" />
          </div>
          
        </q-item-section>

        <q-dialog v-model="showEditTask">
          <edit-task 
            @close="showEditTask= false"
            :task="task"
            :id="id"/>
        </q-dialog>
        
      </q-item>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import { date } from 'quasar'
  const { formatDate } = date
  export default {
      props: ['task','id'],
      data () {
        return{
          showEditTask: false
        }      
      },
      computed: {
        ...mapState('tasks',['search']),
        ...mapGetters('settings',['settings']),
        taskDueTime() {
          if(this.settings.show12HourTimeFormat){
            return date.formatDate(this.task.dueDate+' '+this.task.dueTime, 'h:mmA')
          }
          return this.task.dueTime 
        }
      },
      methods: {
        ...mapActions('tasks',['updateTask', 'deleteTask']),
        showEditTaskModal(){
          this.showEditTask = true
        },
        promptToDelete(id){
          this.$q.dialog({
          title: 'Cancel',
          message: 'Are you sure you want to cancel this delivery?',
          cancel: true,
          persistent: true
            }).onOk(() => {
               this.deleteTask(id)
            })
          }
      },
      filters: {
        niceDate(value) {
          return date.formatDate(value, 'MMM D')
        },
        searchHighlight(value, search){
          if(search){
            let searchRegExp = new RegExp(search, 'ig')
            return value.replace(searchRegExp, (match
            ) => {
              return '<span class="bg-yellow-6">' +match+ '</span>'
            })
          }
          else return value
        }
      },
      components: {
        'edit-task': require('components/Tasks/Modals/EditTask.vue').default
      }
  }

</script>

<style>

</style>