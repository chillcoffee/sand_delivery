export default{
    methods: {
            submitForm(){
            this.$refs.mcustname.$refs.name.validate()
            this.$refs.madd.$refs.address.validate()
            this.$refs.mprod.$refs.product.validate()
            if(!this.$refs.mcustname.$refs.name.hasError && !this.$refs.madd.$refs.address.hasError && !this.$refs.mprod.$refs.product.hasError){
                this.submitTask()
            }
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