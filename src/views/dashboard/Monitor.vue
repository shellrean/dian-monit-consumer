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
			<div class="card-body pt-0 pb-0">
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
		<b-modal id="modal-create" title="Sekolah" size="xl" hide-footer>
			<div class="row">	
				<div class="col-md-6">
					<div class="card card-custom bg-info card-stretch gutter-b">
						<div class="card-body">
							<span class="svg-icon svg-icon-2x svg-icon-white">
							</span>
							<span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">{{ data.filter(item => item.role == '1' ).length }}</span>
							<span class="font-weight-bold text-white font-size-sm">Guru aktif</span>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card card-custom bg-primary card-stretch gutter-b">
						<div class="card-body">
							<span class="svg-icon svg-icon-2x svg-icon-white">
							</span>
							<span class="card-title font-weight-bolder text-white font-size-h2 mb-0 mt-6 d-block">{{ data.filter(item => item.role == '2' ).length }}</span>
							<span class="font-weight-bold text-white font-size-sm">Siswa aktif</span>
						</div>
					</div>
				</div>
			</div>
			<!-- {{ data.connect }} -->
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
		</b-modal>
	</div>
</template>
<script>
import { GChart } from 'vue-google-charts'
import { mapGetters, mapActions, mapState } from 'vuex' 
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
	components: {
    	GChart, VuePerfectScrollbar
  	},
  	data () {
    	return {
      		chartData: [
        		['Tipe'],
        		['User online']
      		],
      		school_id: '',
      		channel: '',
      		school_monitors: [],
			data: [],
			use_key: {},
			dump: {}
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
			this.socket.on('is_online_'+key, (user) => {
				let index = this.school_monitors.map(item => item.key).indexOf(key)
				let exists = this.school_monitors[index].connect.map(item => item.id).indexOf(user.id)
				if(exists == -1) {
					this.school_monitors[index].connect.push(user)
					let ind = this.dataChart[0].indexOf(this.school_monitors[index].name)
					let dn = this.dataChart[1][ind] +1
					this.dataChart[1].splice(ind,1,dn)
				}
			})
			this.socket.on('is_offline_'+key, (user) => {
				let index = this.school_monitors.map(item => item.key).indexOf(key)
				let exists = this.school_monitors[index].connect.map(item => item.id).indexOf(user.id)
				if(exists != -1) {
					this.school_monitors[index].connect.splice(exists,1)
					let ind = this.dataChart[0].indexOf(this.school_monitors[index].name)
					let dn = this.dataChart[1][ind] -1
					this.dataChart[1].splice(ind,1,dn)
				}
			})
		},
		getData() {
			let index = this.schools.map(item => item.id).indexOf(this.school_id)
			if(index != -1) {
				this.schools[index].connect = []
				this.school_monitors.push(this.schools[index])
				this.connectChannel(this.schools[index].key)
				this.chartData[0].push(this.schools[index].name)
				this.chartData[1].push(0)
			}
			this.school_id = ''
		},
		showData(id) {
			let index = this.school_monitors.map(item => item.id).indexOf(id)
			this.data = this.school_monitors[index].connect.sort(this.compare)
			this.$bvModal.show('modal-create')
		}
	},
	created() {
		this.getDataSchools()
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	},
	mounted() {

	},
	watch:{

	}
}
</script>