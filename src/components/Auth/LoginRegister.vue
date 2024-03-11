<template>
    <form @submit.prevent="submitForm">

        <div class="row q-mb-md">
            <q-banner class="bg-grey-3 col">
                <template v-slot:avatar>
                    <q-icon name="account_circle" color="primary" />
                </template>
                {{ tab | titleCase}} to access your deliveries anywhere!
            </q-banner>
        </div>
            
        <div class="row">
            <q-input
                class="col"
                outlined
                v-model="formData.email"
                :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address.']"
                ref="email"
                lazy-rules
                label="Email"
                stack-label
                />
        </div>

        <div class="row q-mb-md">
            <q-input
                class="col"
                outlined
                v-model="formData.password"
                :rules="[ val => val.length >= 6 || 'Password should be at least 6 characters.']"
                ref="password"
                lazy-rules
                type="password"
                label="Password"
                stack-label
                />
        </div>

        <div class="row">
            <q-space/>

            <q-btn
                color="primary"
                :label="tab"
                type="submit"            
            />

            
            
        </div>

        <div class="row q-mt-md">
            <q-space/>
            <q-btn
                color="primary"
                label="Use your Google Account"
                @click="loginGoogleUser"
                type="submit"            
            />
        </div>
    
    </form>
</template>

<script>
    import { mapActions } from 'vuex'
    export default{
        props: ['tab'],
        data() {
            return {
                formData: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions('auth',['registerUser','loginUser','loginGoogleUser']),
            submitForm() {
                this.$refs.email.validate()
                this.$refs.password.validate()
                if(!this.$refs.email.hasError && !this.$refs.password.hasError ){                  
                    if(this.tab == 'login'){
                        this.loginUser(this.formData)
                        //this.loginFBUser(this.formData)
                    }
                    else{
                        this.registerUser(this.formData)
                    }
                }
            },
            isValidEmailAddress(email){
                return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            }
        },
        filters: {
            titleCase(value) {
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>