<template>
    <q-page padding>
        <q-list
          class="q-mb-md"
          bordered
          padding>
        
        <q-item-label header>Settings</q-item-label>

        <q-item tag="label" v-ripple>
            <q-item-section>
                <q-item-label>Show 12-hour time format</q-item-label>
            </q-item-section>
            <q-item-section side >
                <q-toggle
                    color="blue"
                    v-model="show12HourTimeFormat"
                    />
            </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
            <q-item-section>
                <q-item-label>Show deliveries in one list</q-item-label>
            </q-item-section>
            <q-item-section side >
                <q-toggle
                    color="blue"
                    v-model="showTasksInOneList"
                    />
            </q-item-section>
        </q-item>

        </q-list>
        
        <q-list bordered padding>
        
        <q-item-label header>More</q-item-label>

        <q-item
          to="/settings/help"
          tag="label"
          v-ripple>
            <q-item-section>
                <q-item-label>Help</q-item-label>
            </q-item-section>
            <q-item-section side >
                <q-icon
                    name="chevron_right"                    
                    />
            </q-item-section>
        </q-item>

        <q-item
          @click="visitOurWebsite"
          tag="label"
          v-ripple>
            <q-item-section>
                <q-item-label>Visit our website</q-item-label>
            </q-item-section>
            <q-item-section side >
                <q-icon
                    name="chevron_right"                    
                    />
            </q-item-section>
        </q-item>

        <q-item
          @click="emailUs"
          tag="label"
          v-ripple>
            <q-item-section>
                <q-item-label>Email us</q-item-label>
            </q-item-section>
            <q-item-section side >
                <q-icon
                    name="chevron_right"                    
                    />
            </q-item-section>
        </q-item>

        </q-list>
    </q-page>

</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { openURL } from 'quasar'
    export default{
        computed: {
            ...mapGetters('settings',['settings']),
            show12HourTimeFormat: {
                get(){
                    return this.settings.show12HourTimeFormat
                },
                set(value){
                    this.setShow12HourTimeFormat(value)
                }
            },
            showTasksInOneList: {
                get(){
                    return this.settings.showTasksInOneList
                },
                set(value){
                    this.setShowTasksInOneList(value)
                }
            }
        },
        methods: {
            ...mapActions('settings',['setShow12HourTimeFormat','setShowTasksInOneList']),
            visitOurWebsite() {
                openURL('http://www.youtube.com/@masterRuffa')
            },
            emailUs() {
                window.location.href='mailto:ruffaresentes@sanddelivery.com?subject=Sand and Gravel Order'
            }
        }
    }
</script>

<style>
</style>