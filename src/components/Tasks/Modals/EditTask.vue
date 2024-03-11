<template>
    <q-card>
        <modal-header>Edit Delivery</modal-header>

        <form @submit.prevent="submitForm">
            <q-card-section>
                <modal-customer-name
                  ref="mcustname"
                  :name.sync="tasktoSubmit.name" />
                <modal-address ref="madd" :address.sync="tasktoSubmit.address"/>
                <modal-product ref="mprod" :product.sync="tasktoSubmit.product"/>
                <modal-due-date 
                    :dueDate.sync="tasktoSubmit.dueDate"
                    @clear="clearDueDate"/>
                <modal-due-time
                    v-if="tasktoSubmit.dueDate" 
                    :dueTime.sync="tasktoSubmit.dueTime"/>
            </q-card-section>
            <modal-buttons></modal-buttons>           
        </form>


    </q-card>
</template>

<script>
     import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'
    import {mapActions} from 'vuex'

    export default {
        props: ['task', 'id'],
        mixins: [mixinAddEditTask],
        data() {
            return {
                tasktoSubmit: { }
            }
        },
        methods: {
            ...mapActions('tasks',['updateTask']),            
            submitTask(){
                this.updateTask({
                    id: this.id,
                    updates: this.tasktoSubmit
                })
                this.$emit('close')
            }
        },        
        created() {
            this.tasktoSubmit = Object.assign({}, this.task)
        }
    }

</script>
