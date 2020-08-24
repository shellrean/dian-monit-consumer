<template>
	<div class="container-fluid mt-4">
		<div class="card card-custom">
			<div class="card-header pt-6 border-0 pb-0">
				<h3 class="card-title align-items-start flex-column">
					<span class="card-label font-weight-bolder text-dark">Monitoring</span>
					<span class="text-muted mt-1 font-weight-bold font-size-sm">Monitoring data sementara realtime</span>
				</h3>
				<div class="card-toolbar">
					<div class="form-group">
						<router-link :to="{ name: 'home' }" class="btn btn-light-primary">
							<i class="flaticon2-left-arrow-1"></i>Kembali
						</router-link>
					</div>
				</div>
			</div>
			<div class="card-body pt-0 pb-2">
				<div class="mb-10">
					<div class="row align-items-center">
						<div class="col-lg-9 col-xl-8">
							<div class="row align-items-center">
								<div class="col-md-4 my-2 my-md-0">
									<div class="input-icon">
										<select class="form-control form-control-solid" v-model="school_id">
											<option :value="school.id" v-for="school in not_listeds">{{ school.name }}</option>
										</select>
										<span>
											<i class="flaticon2-search-1 text-muted"></i>
										</span>
									</div>
								</div>
								<button :disabled="isLoading"  @click="getData" class="btn btn-primary px-6 font-weight-bold" v-if="school_id != ''">Tampilkan</button>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex align-items-center" v-if="isLoading">
					<div class="mr-2 text-muted">Getting data...</div>
					<div class="spinner spinner-primary mr-10"></div>
				</div>
			</div>
		</div>
		<div class="row mt-2">
			<div class="col-md-6">
				<div class="card card-custom">
					<div class="card-header pt-6 border-0 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">User login</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Monitoring data sementara realtime</span>
					</h3>
				</div>
					<div class="card-body">
						<GChart
                            type="BarChart"
                            :data="dataChart"
                          /> 
                        <div class="row" v-for="school in school_monitors">
                        	<div class="col-md-6">
                        		<GChart
	                            type="PieChart"
	                            :data="[
					      			['Status', 'Banyak'],
					      			['Aktif', school.connect.filter(item => item.role == '1').length],
					      			['Tidak aktif',school.disconnect.filter(item => item.role == '1').length]
					      		]"
	                            :options="{ title: `Guru ${school.name}` }"
	                          /> 
                        	</div>
                        	<div class="col-md-6">
                        		<GChart
	                            type="PieChart"
	                            :data="[
					      			['Status', 'Banyak'],
					      			['Aktif', school.connect.filter(item => item.role == '2').length],
					      			['Tidak aktif',school.disconnect.filter(item => item.role == '2').length]
					      		]"
	                            :options="{ title: `Siswa ${school.name}` }"
	                          /> 
                        	</div>
                        </div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card card-custom">
					<div class="card-header pt-6 border-0 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">User login</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Monitoring data sementara realtime</span>
					</h3>
				</div>
					<div class="card-body">
						<div class="d-flex align-items-center mb-5 bg-light-primary rounded p-5" v-for="school in school_monitors">
							<div class="symbol symbol-40 symbol-light-primary symbol-sm flex-shrink-0">					
                        		<span class="symbol-label font-size-h4 font-weight-bold ">
                        			<i class="flaticon-earth-globe text-primary"></i>
                        		</span>								
                        	</div>
							<div class="d-flex flex-column flex-grow-1 mr-2">
								<a href="#" @click.prevent="showData(school.id)" class="font-weight-bold text-dark-75 font-size-lg mb-1 text-hover-primary">{{ school.name }}</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-create" :title="school.name" size="xl" hide-footer>
			<div class="row">	
				<div class="col-md-3">
					<div class="card card-custom bg-primary card-stretch gutter-b">
						<div class="card-body">
							<span class="svg-icon svg-icon-2x svg-icon-white">
							</span>
							<span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">{{ data.filter(item => item.role == '1' ).length }}</span>
							<span class="font-weight-bold text-white font-size-sm">Guru aktif</span>
						</div>
					</div>
				</div>
				<div class="col-md-3">
					<div class="card card-custom bg-primary card-stretch gutter-b">
						<div class="card-body">
							<span class="svg-icon svg-icon-2x svg-icon-white">
							</span>
							<span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">{{ data.filter(item => item.role == '2' ).length }}</span>
							<span class="font-weight-bold text-white font-size-sm">Siswa aktif</span>
						</div>
					</div>
				</div>
				<div class="col-md-3">
					<div class="card card-custom bg-danger card-stretch gutter-b">
						<div class="card-body">
							<span class="svg-icon svg-icon-2x svg-icon-white">
							</span>
							<span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">{{ data2.filter(item => item.role == '1' ).length }}</span>
							<span class="font-weight-bold text-white font-size-sm">Guru tidak aktif</span>
						</div>
					</div>
				</div>
				<div class="col-md-3">
					<div class="card card-custom bg-danger card-stretch gutter-b">
						<div class="card-body">
							<span class="svg-icon svg-icon-2x svg-icon-white">
							</span>
							<span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">{{ data2.filter(item => item.role == '2' ).length }}</span>
							<span class="font-weight-bold text-white font-size-sm">Siswa tidak aktif</span>
						</div>
					</div>
				</div>
			</div>
			<b-tabs pills>
		      <b-tab title="User Aktif" active>
				<VuePerfectScrollbar
					style="max-height: 70vh; position: relative;"
				>
				<div class="d-flex align-items-center justify-content-between mb-8 mt-2" v-for=" user in  data">
					<!--begin::Symbol-->
					<div class="d-flex align-items-center">	
						<div class="symbol symbol-40 symbol-light mr-5">
							<div class="symbol-label text-success">
								{{ user.name.charAt(0) }}
							</div>
							<i class="symbol-badge bg-success"></i>
						</div>
						<!--end::Symbol-->
						<!--begin::Text-->
						<div class="d-flex flex-column font-weight-bold">
							<span class="text-dark mb-1 font-size-lg">{{ user.name }}</span>
							<span class="text-muted">{{ user.email }}</span>
						</div>
					</div>
					<span class="label label-lg label-light-primary label-inline font-weight-bold py-4" v-if="user.role == '0'">Administrator</span>
					<span class="label label-lg label-light-succcess label-inline font-weight-bold py-4" v-if="user.role == '1'">Guru</span>
					<span class="label label-lg label-light-info label-inline font-weight-bold py-4" v-if="user.role == '2'">Siswa</span>
					<!--end::Text-->
				</div>
				<!--end::Item-->
				</VuePerfectScrollbar>
		      </b-tab>
		      <b-tab title="User Tidak aktif">
		      	<VuePerfectScrollbar
					style="max-height: 70vh; position: relative;"
				>
				<div class="d-flex align-items-center justify-content-between mb-8 mt-2" v-for=" user in  data2">
					<!--begin::Symbol-->
					<div class="d-flex align-items-center">	
						<div class="symbol symbol-40 symbol-light mr-5">
							<div class="symbol-label text-success">
								{{ user.name.charAt(0) }}
							</div>
							<i class="symbol-badge bg-danger"></i>
						</div>
						<!--end::Symbol-->
						<!--begin::Text-->
						<div class="d-flex flex-column font-weight-bold">
							<span class="text-dark mb-1 font-size-lg">{{ user.name }}</span>
							<span class="text-muted">{{ user.email }}</span>
						</div>
					</div>
					<span class="label label-lg label-light-primary label-inline font-weight-bold py-4" v-if="user.role == '0'">Administrator</span>
					<span class="label label-lg label-light-succcess label-inline font-weight-bold py-4" v-if="user.role == '1'">Guru</span>
					<span class="label label-lg label-light-info label-inline font-weight-bold py-4" v-if="user.role == '2'">Siswa</span>
					<!--end::Text-->
				</div>
				<!--end::Item-->
				</VuePerfectScrollbar>
		      </b-tab>
		    </b-tabs>
			<!-- {{ data.connect }} -->
		</b-modal>
	</div>
</template>
<script>
import { GChart } from 'vue-google-charts'
import { mapGetters, mapActions, mapState } from 'vuex' 
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import axios from 'axios'
import { BTabs, BTab } from 'bootstrap-vue'

export default {
	components: {
    	GChart, VuePerfectScrollbar, BTab, BTabs
  	},
  	data () {
    	return {
      		chartData: [
        		['Tipe'],
        		['User online'],
        		['User offline']
      		],
      		school_id: '',
      		channel: '',
      		school_monitors: [],
      		school: {},
			data: [],
			data2: [],
			use_key: {},
			dump: {},
			monit: []
    	}
  	},
  	computed: {
  		...mapGetters(['isLoading']),
  		...mapState('school',['schools']),
  		...mapState('channel', ['users','socket']),
  		not_listeds() {
  			let school_monitors = this.school_monitors.map(item => item.id)
  			return this.schools.filter(item => school_monitors.indexOf(item.id) == -1)
  		},
  		dataChart() {
  			return this.chartData
  		}
  	},
  	methods: {
		...mapActions('school', ['getDataSchools']),
		compare(a, b) {
		  const bandA = a.role;
		  const bandB = b.role;

		  let comparison = 0;
		  if (bandA > bandB) {
		    comparison = 1;
		  } else if (bandA < bandB) {
		    comparison = -1;
		  }
		  return comparison;
		},
		changeData() {
			this.chartData = []
			this.chartData = this.doool
		},
		connectChannel(key) {
			
		},
		getData() {
			let index = this.schools.map(item => item.id).indexOf(this.school_id)
			if(index != -1) {
				this.schools[index].connect = []
				this.schools[index].disconnect = []
				this.school_monitors.push(this.schools[index])
				this.chartData[0].push(this.schools[index].name)

				let dat = this.monit.filter(item => item.key == this.schools[index].key)
				this.chartData[1].push(dat.length)
				let indexS = this.school_monitors.map(item => item.id).indexOf(this.school_id)
				if(indexS != -1) {
					let school = this.school_monitors[indexS]
					school.connect.push(...dat.map(item => item.user))
					this.getDataRes(indexS)
				}
			}
			this.school_id = ''		
		},
		showData(id) {
			let index = this.school_monitors.map(item => item.id).indexOf(id)
			this.data = this.school_monitors[index].connect.sort(this.compare)
			this.data2 = this.school_monitors[index].disconnect
			this.school = this.school_monitors[index]
			this.$bvModal.show('modal-create')
		},
		async getDataRes(index) {
			let school = this.school_monitors[index]
			let users = school.connect.map(item => item.id)
			try {
				this.$store.commit('SET_LOADING', true)
				let user_rests = await axios.post(`${school.url}/users/offline?key=${school.key}`, { ids: users }, {
					headers: {
						'Accept': 'application/json'
					}
				})
				this.school_monitors[index].disconnect.push(...user_rests.data.data)
				this.dataChart[2].push(user_rests.data.data.length)
				this.$store.commit('SET_LOADING', false)
			} catch (error) {
				this.$store.commit('SET_LOADING', false)
				this.dataChart[2].push(0)
				console.log(error)
			}
		}
	},
	created() {
		this.getDataSchools()
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	},
	mounted() {
		this.socket.emit('monitor');
		this.socket.on('monit', (users) => {
			this.monit = users
		})

		this.socket.on('is_online', (res) => {
			let index = this.school_monitors.map(item => item.key).indexOf(res.key)
			if(index != -1) {
				let exists = this.school_monitors[index].connect.map(item => item.id).indexOf(res.user.id)
				if(exists == -1) {
					this.school_monitors[index].connect.push(res.user)
					let ind = this.dataChart[0].indexOf(this.school_monitors[index].name)
					let dn = this.dataChart[1][ind] +1
					let dns = this.dataChart[2][ind] -1
					this.dataChart[1].splice(ind,1,dn)
					this.dataChart[2].splice(ind,1,dns)
					let userIndx = this.school_monitors[index].disconnect.map(item => item.id).indexOf(res.user.id)
					if(userIndx != -1) {
						this.school_monitors[index].disconnect.splice(userIndx,1)
					}
				}
			}
		})
		this.socket.on('is_offline', (res) => {
			let index = this.school_monitors.map(item => item.key).indexOf(res.key)
			if(index != -1) {
				let exists = this.school_monitors[index].disconnect.map(item => item.id).indexOf(res.user.id)
				if(exists == -1) {
					this.school_monitors[index].disconnect.push(res.user)
					let ind = this.dataChart[0].indexOf(this.school_monitors[index].name)
					let dn = this.dataChart[1][ind] -1
					let dns = this.dataChart[2][ind] +1
					this.dataChart[1].splice(ind,1,dn)
					this.dataChart[2].splice(ind,1,dns)
					let userIndx = this.school_monitors[index].connect.map(item => item.id).indexOf(res.user.id)
					if(userIndx != -1) {
						this.school_monitors[index].connect.splice(userIndx,1)
					}
				}
			}
		})
	},
	watch:{

	}
}
</script>