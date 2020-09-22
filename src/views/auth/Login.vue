<template>
    <div>
        <section class="mt-2">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-5">
                        <div class="card shadow-none border-0">
                            <div class="card-body">
                                <form class="mt-5 mb-5" @submit.prevent="postLogin">
                                    <div class="mb-8">
                                        <div class="d-flex align-items-center">
                                            <div class="symbol symbol-40 symbol-light-primary symbol-sm flex-shrink-0">    
                                                <span class="symbol-label font-size-h4 font-weight-bold ">
                                                    <img src="/img/logo.jpeg" height="35" class="d-inline-block align-top" alt="" loading="lazy">
                                                </span>                             
                                            </div>                              
                                            <div class="ml-4 d-flex flex-column">                                   
                                                <div class="text-dark-75 font-weight-bolder font-size-lg mb-0" >
                                                    Extrarodinary
                                                </div>                                 
                                                <span class="text-muted font-weight-bold">Master</span>    
                                            </div>                          
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="email" class="form-control" placeholder="Alamat email" :class="{ 'is-invalid' : errors.email }" v-model="data.email"> 
                                    </div>
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" class="form-control" placeholder="Password" name=""  :class="{ 'is-invalid' : errors.password }" v-model="data.password">
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary" :disabled="isLoading">
                                            {{ isLoading ? 'Processing...' : 'Submit' }}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="mt-5">
            <p class="text-center p-5">
                &copy; 2020 Extraordinary-LMS Master
            </p>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/entities/notif'

export default {
    name: 'Login',
    data() {
        return {
            data: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapGetters(['isAuth', 'isLoading']),
        ...mapState(['errors'])
    },
    methods: {
        ...mapActions('auth',['submit']),
        async postLogin() {
            try {
                await this.submit(this.data)
                if(this.isAuth) {
                    this.$router.push({ name: 'home' })
                }
            } catch (error) {
                this.$bvToast.toast(error.message, errorToas())
            }
        }
    },
    async created() {
        if(this.isAuth) {
            this.$router.push({ name: 'home' })
        }
    }
}

</script>