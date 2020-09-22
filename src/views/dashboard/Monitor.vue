<template>
	<div class="container-fluid mt-4">
		<div class="card card-custom shadow-none border">
			<div class="card-body p-4">
				<div class="">
					<div class="row align-items-center">
						<div class="col-lg-9 col-xl-8">
							<div class="row align-items-center">
								<div class="col-md-4 my-2 my-md-0">
									<div class="input-icon">
										<select class="form-control" v-model="school_id">
											<option :value="school.id" v-for="school in not_listeds" :key="school.id">{{ school.name }}</option>
										</select>
										<span>
											<i class="flaticon-home-2 text-muted"></i>
										</span>
									</div>
								</div>
								<div class="col-md-4">
									<button :disabled="isLoading"  @click="getData" class="btn btn-primary px-6 font-weight-bold" v-if="school_id != ''">Tampilkan</button>
								</div>
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
				<div class="card card-custom shadow-none border">
					<div class="card-body">
						<span class="text-muted" v-if="school_monitors.length === 0">Tidak ada data yang ditampilkan</span>
						<GChart
              type="BarChart"
              :data="dataChart"
							v-if="school_monitors.length !== 0"
            /> 
            <div class="row" v-for="school in school_monitors" :key="school.id">
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
				<div class="card card-custom shadow-none border">
					<div class="card-header pt-6 border-0 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">User login</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Monitoring data sementara realtime</span>
					</h3>
				</div>
					<div class="card-body">
						<div class="list-group">
							<button type="button"  @click.prevent="showData(school.id)" class="list-group-item list-group-item-action" v-for="school in school_monitors" :key="school.id">{{ school.name }}</button>
						</div>
						<span class="text-muted" v-if="school_monitors.length === 0">Tidak ada data yang ditampilkan</span>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-create" :title="school.name" size="xl" hide-footer>
			<b-tabs>
		    <b-tab title="Guru Aktif" active>
					<div>
						<div class="input-group mb-3 mt-3">
							<div class="input-group-prepend">
								<span class="input-group-text"><i class="flaticon-avatar"></i></span>
							</div>
							<input type="text" class="form-control" placeholder="Car guru aktif" v-model="guru_aktif">
						</div>
					</div>
					<VuePerfectScrollbar
						style="max-height: 70vh; position: relative;"
					>
					<table class="table table-bordered">
						<tr v-for="(user, index) in  data.filter(item => item.role == '1').filter(item => {
							return guru_aktif.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
						})" :key="user.id">
							<td width="20px">{{ index+1 }}</td>
							<td>{{ user.name }}</td>
							<td>{{ user.uid }}</td>
							<td>
								<span class="label label-lg label-light-primary label-inline font-weight-bold py-4" v-if="user.role == '0'">Administrator</span>
								<span class="label label-lg label-light-succcess label-inline font-weight-bold py-4" v-if="user.role == '1'">Guru</span>
								<span class="label label-lg label-light-info label-inline font-weight-bold py-4" v-if="user.role == '2'">Siswa</span>
							</td>
						</tr>
						<tr v-if="data2.length === 0">
							<td colspan="4" class="text-muted">
								Tidak ada data yang ditampilkan
							</td>
						</tr>
					</table>
					</VuePerfectScrollbar>
		  	</b-tab>

		    <b-tab title="Guru Tidak aktif">
					<div>
						<div class="input-group mb-3 mt-3">
							<div class="input-group-prepend">
								<span class="input-group-text"><i class="flaticon-avatar"></i></span>
							</div>
							<input type="text" class="form-control" placeholder="Car guru tidak aktif" v-model="guru_tidak_aktif">
						</div>
					</div>
		     	<VuePerfectScrollbar
						style="max-height: 70vh; position: relative;"
					>
					<table class="table table-bordered">
						<tr v-for="(user, index) in  data2.filter(item => item.role == '1').filter(item => {
							return guru_tidak_aktif.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
						})" :key="user.id">
							<td width="20px">{{ index+1 }}</td>
							<td>{{ user.name }}</td>
							<td>{{ user.uid }}</td>
							<td>
								<span class="label label-lg label-light-primary label-inline font-weight-bold py-4" v-if="user.role == '0'">Administrator</span>
								<span class="label label-lg label-light-succcess label-inline font-weight-bold py-4" v-if="user.role == '1'">Guru</span>
								<span class="label label-lg label-light-info label-inline font-weight-bold py-4" v-if="user.role == '2'">Siswa</span>
							</td>
						</tr>
						<tr v-if="data2.length === 0">
							<td colspan="4" class="text-muted">
								Tidak ada data yang ditampilkan
							</td>
						</tr>
					</table>
					<!--end::Item-->
					</VuePerfectScrollbar>
		    </b-tab>

				<b-tab title="Siswa Aktif">
					<div>
						<div class="input-group mb-3 mt-3">
							<div class="input-group-prepend">
								<span class="input-group-text"><i class="flaticon-avatar"></i></span>
							</div>
							<input type="text" class="form-control" placeholder="Car siswa aktif" v-model="siswa_aktif">
						</div>
					</div>
					<VuePerfectScrollbar
						style="max-height: 70vh; position: relative;"
					>
					<table class="table table-bordered">
						<tr v-for="(user, index) in  data.filter(item => item.role == '2').filter(item => {
							return siswa_aktif.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
						})" :key="user.id">
							<td width="20px">{{ index+1 }}</td>
							<td>{{ user.name }}</td>
							<td>{{ user.uid }}</td>
							<td>
								<span class="label label-lg label-light-primary label-inline font-weight-bold py-4" v-if="user.role == '0'">Administrator</span>
								<span class="label label-lg label-light-succcess label-inline font-weight-bold py-4" v-if="user.role == '1'">Guru</span>
								<span class="label label-lg label-light-info label-inline font-weight-bold py-4" v-if="user.role == '2'">Siswa</span>
							</td>
						</tr>
						<tr v-if="data2.length === 0">
							<td colspan="4" class="text-muted">
								Tidak ada data yang ditampilkan
							</td>
						</tr>
					</table>
					</VuePerfectScrollbar>
		  	</b-tab>

				<b-tab title="Siswa Tidak aktif">
					<div>
						<div class="input-group mb-3 mt-3">
							<div class="input-group-prepend">
								<span class="input-group-text"><i class="flaticon-avatar"></i></span>
							</div>
							<input type="text" class="form-control" placeholder="Car siswa tidak aktif" v-model="siswa_tidak_aktif">
						</div>
					</div>
		     	<VuePerfectScrollbar
						style="max-height: 70vh; position: relative;"
					>
					<table class="table table-bordered">
						<tr v-for="(user, index) in  data2.filter(item => item.role == '2').filter(item => {
							return siswa_tidak_aktif.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
						})" :key="user.id">
							<td width="20px">{{ index+1 }}</td>
							<td>{{ user.name }}</td>
							<td>{{ user.uid }}</td>
							<td>
								<span class="label label-lg label-light-primary label-inline font-weight-bold py-4" v-if="user.role == '0'">Administrator</span>
								<span class="label label-lg label-light-succcess label-inline font-weight-bold py-4" v-if="user.role == '1'">Guru</span>
								<span class="label label-lg label-light-info label-inline font-weight-bold py-4" v-if="user.role == '2'">Siswa</span>
							</td>
						</tr>
						<tr v-if="data2.length === 0">
							<td colspan="4" class="text-muted">
								Tidak ada data yang ditampilkan
							</td>
						</tr>
					</table>
					<!--end::Item-->
					</VuePerfectScrollbar>
		    </b-tab>

				
		  </b-tabs>
			<table class="table table-bordered">
				<tr>
					<td width="150px" class="bg-success text-white">Guru aktif</td>
					<td>{{ data.filter(item => item.role == '1' ).length }}</td>
				</tr>
				<tr>
					<td class="bg-success text-white">Siswa aktif</td>
					<td>{{ data.filter(item => item.role == '2' ).length }}</td>
				</tr>
				<tr>
					<td class="bg-danger text-white">Guru tidak aktif</td>
					<td>{{ data2.filter(item => item.role == '1' ).length }}</td>
				</tr>
				<tr>
					<td class="bg-danger text-white">Siswa tidak aktif</td>
					<td>{{ data2.filter(item => item.role == '2' ).length }}</td>
				</tr>
			</table>
			<b-progress class="mt-2" :max="data.filter(item => item.role == '1' ).length + data2.filter(item => item.role == '1' ).length" height="2rem">
				<b-progress-bar :value="data.filter(item => item.role == '1' ).length" variant="success">
					Guru aktif {{ data.filter(item => item.role == '1' ).length }}
				</b-progress-bar>
				<b-progress-bar :value="data2.filter(item => item.role == '1' ).length" variant="danger">
					Guru tidak aktif {{ data2.filter(item => item.role == '1' ).length }}
				</b-progress-bar>
			</b-progress>
			<b-progress class="mt-2" :max="data.filter(item => item.role == '2' ).length + data2.filter(item => item.role == '2' ).length" height="2rem">
				<b-progress-bar :value="data.filter(item => item.role == '2' ).length" variant="success">
					Siswa aktif {{ data.filter(item => item.role == '2' ).length }}
				</b-progress-bar>
				<b-progress-bar :value="data2.filter(item => item.role == '2' ).length" variant="danger">
					Siswa tidak aktif {{ data2.filter(item => item.role == '2' ).length }}
				</b-progress-bar>
			</b-progress>
			<!-- {{ data.connect }} -->
		</b-modal>
	</div>
</template>
<script>
import { GChart } from 'vue-google-charts'
import { mapGetters, mapActions, mapState } from 'vuex' 
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import axios from 'axios'
import { BTabs, BTab, BProgress, BProgressBar } from 'bootstrap-vue'
import { successToas, errorToas } from '@/entities/notif'

export default {
	components: {
    	GChart, VuePerfectScrollbar, BTab, BTabs, BProgress, BProgressBar
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
			monit: [],
			siswa_aktif: '',
			siswa_tidak_aktif: '',
			guru_aktif: '',
			guru_tidak_aktif: ''
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
				let user_rests = await axios.post(`${school.url}/api/v1/users/offline?key=${school.key}`, { ids: users }, {
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