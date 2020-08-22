<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <div class="d-flex align-items-center">
                        <div class="symbol symbol-40 symbol-light-primary symbol-sm flex-shrink-0">    
                            <span class="symbol-label font-size-h4 font-weight-bold ">
                                <img src="/img/dki.png" height="35" class="d-inline-block align-top" alt="" loading="lazy">
                            </span>                             
                        </div>                              
                        <div class="ml-4 d-flex flex-column">                                   
                            <div class="text-dark-75 text-hover-primary font-weight-bolder font-size-lg mb-0" >
                                Extrarodinary
                            </div>                                 
                            <span class="text-muted font-weight-bold">Monitoring</span>    
                        </div>                          
                    </div>
                  </a>
            </div>
        </nav>
        <section>
            <div class="container">
                <div class="row justify-content-center p-5">
                    <div class="col-md-5" style="background-image: url('/img/bg-login.svg'); background-size: 350px; background-position: left; background-repeat: no-repeat;">
                    </div>
                    <div class="col-md-7">
                        <h2 class="mt-5">Login</h2>
                        <p>Selamat datang di Extraordinary Monit Learning, masukkan email dan password</p>
                        <hr>
                        <div class="alert alert-custom alert-light-danger fade show mb-5" role="alert" v-if="errors.invalid">
                            <div class="alert-icon">
                                <i class="flaticon-warning"></i>
                            </div>
                            <div class="alert-text">{{ errors.invalid }}</div>
                        </div>
                        <form class="mt-5 mb-5" @submit.prevent="postLogin">
                            <div class="form-group">
                                <label>Email address</label>
                                <input type="email" class="form-control" placeholder="Email address" :class="{ 'is-invalid' : errors.email }" v-model="data.email">
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
        </section>
        <div class="mt-5">
            <p class="text-center p-5">
                &copy; 2020 Extraordinary
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