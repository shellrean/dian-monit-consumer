<template>
	<div class="card card-custom gutter-b shadow-none border">
		<div class="card-header pt-6 border-0 pb-0">
			<div class="card-toolbar">
				<div class="form-group">
					<b-button variant="danger" @click="outLog">
						<i class="flaticon-logout"></i>Logout
					</b-button>
				</div>
			</div>
		</div>
		<div class="card-body p-4">
			
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