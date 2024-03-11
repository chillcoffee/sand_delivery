<template>
    <q-card>
        <modal-header>Add Delivery</modal-header>

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
    import {mapActions} from 'vuex'
    export default {
        data() {
            return {
                tasktoSubmit: {
                    name: '',
                    address: '',
                    product: '',
                    dueDate: '',
                    dueTime: '',
                    completed: false
                }
            }
        },
        methods: {
            ...mapActions('tasks',['addTask']),
            submitForm(){
                this.$refs.mcustname.$refs.name.validate()
                this.$refs.madd.$refs.address.validate()
                this.$refs.mprod.$refs.product.validate()
                if(!this.$refs.mcustname.$refs.name.hasError && !this.$refs.madd.$refs.address.hasError && !this.$refs.mprod.$refs.product.hasError){
                    this.submitTask()
                }
            },
            submitTask(){
                this.addTask(this.tasktoSubmit)
                this.$emit('close')
            },
            clearDueDate(){
                this.tasktoSubmit.dueDate = ''
                this.tasktoSubmit.dueTime = ''
            }
        },
        components: {
            'modal-header' : require('components/Tasks/Modals/Shared/ModalHeader.vue').default,
            'modal-customer-name' : require('components/Tasks/Modals/Shared/ModalCustomerName.vue').default,
            'modal-address' : require('components/Tasks/Modals/Shared/ModalAddress.vue').default,
            'modal-product' : require('components/Tasks/Modals/Shared/ModalProduct.vue').default,
            'modal-due-date' : require('components/Tasks/Modals/Shared/ModalDueDate.vue').default,
            'modal-due-time' : require('components/Tasks/Modals/Shared/ModalDueTime.vue').default,
            'modal-buttons' : require('components/Tasks/Modals/Shared/ModalButtons.vue').default
        }
    }

</script>
