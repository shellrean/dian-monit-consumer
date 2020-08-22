<template>
	<div class="card card-custom bg-gray-100 gutter-b">
		<div class="card-header pt-6 border-0 pb-0">
			<div class="card-toolbar">
				<div class="form-group">
					<b-button variant="danger" @click="outLog">
						<i class="flaticon-logout"></i>Logout
					</b-button>
				</div>
			</div>
		</div>
		<div class="card-body p-0 position-relative overflow-hidden">
			<div class="card-spacer">
				<div class="row m-0">
					<div class="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
						<span class="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
							<i class="flaticon-browser icon-2x text-warning"></i>
						</span>
						<router-link :to="{name: 'monit'}" class="text-warning font-weight-bold font-size-h6">Monitor</router-link>
					</div>
					<div class="col bg-light-primary px-6 py-8 rounded-xl mr-7 mb-7">
						<span class="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
							<i class="flaticon-graphic icon-2x text-primary"></i>
						</span>
						<a href="#" class="text-primary font-weight-bold font-size-h6">Reporting</a>
					</div>
				</div>
			</div>
		</div>
	</div>								
</template>
<script>
import { BButton } from 'bootstrap-vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
	name: 'NavigationDAshboard',
	components: {
		BButton
	},
	methods: {
  		...mapActions('auth',['logout']),
  		async outLog() {
  			await this.logout()
  			localStorage.removeItem('token')
            this.$store.state.token = localStorage.getItem('token')
            this.$router.push('/login')
  		}
  	}
}
</script>