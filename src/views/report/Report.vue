<template>
	<div class="d-flex flex-column-fluid mt-4">
		<div class="container-fluid">
			<div class="card card-custom">
				<div class="card-header pt-6 border-0 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Rerport hari ini</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Daftar report sekolah hari ini</span>
					</h3>
					<div class="card-toolbar">
						<div class="form-group">
							<b-button variant="light-primary" :to="{ name: 'home' }" class="mr-1">
								<i class="flaticon2-left-arrow-1"></i> Kembali
							</b-button>
							<b-button v-b-modal.modal-1 variant="primary">Filter tanggal
							</b-button>
						</div>
					</div>
				</div>
				<div class="card-body pt-0">
					<div class="table-responsive-md">
						<b-table :fields="fields"
						  small
						  :items="school_reports">
						  	<template v-slot:cell(isreport)="row">
						  		<span class="badge badge-danger" v-if="row.item.report.length == 0">No Report yet</span>
						  		<span class="badge badge-primary" v-if="row.item.report.length > 0">Reported</span>
						  	</template>
						  	<template v-slot:cell(actions)="row">
						  		<b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
									<template v-slot:button-content>
									    <i class="flaticon-more"></i>
									</template>
									<b-dropdown-item @click="collectData(row.item.id)" v-if="row.item.report.length == 0">Ambil report</b-dropdown-item>
									<b-dropdown-item @click="showData(row.item.id)"  v-if="row.item.report.length > 0">Lihat report</b-dropdown-item>
								</b-dropdown>
						  	</template>
						</b-table>
						<div class="d-flex align-items-center" v-if="isLoading">
							<div class="mr-2 text-muted">Loading...</div>
							<div class="spinner spinner-primary mr-10"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-report" :title="`${data.name}`" size="xl" hide-footer>
			<button @click="print" class="btn btn-success mb-1">Cetak data</button>
			<b-tabs pills>
		      <b-tab :title="report.name.toUpperCase()" v-for="report in data.report"  id="printMe">
					<VuePerfectScrollbar
						style="max-height: 70vh; position: relative;"
					>
					<div class="table-responsive-md mt-2">
						<table class="table table-bordered">
							<tr>
								<td>Kelas</td>
								<td colspan="2">Absent</td>
							</tr>
							<template  v-for="(inrep,key) in report.data">
								<tr>
									<td :rowspan="inrep.length+1">{{ key }}</td>
								</tr>
								<tr v-for="data in inrep">
									<td>
										{{ data.user.name }}
									</td>
									<td>
										<span class="badge badge-primary mr-1">{{ data.subject.name }}</span>
										<span class="badge badge-danger">{{ data.details.type }}</span> <br><br>
										<div class="border border-danger p-2" v-if="data.details.desc != null">{{ data.details.desc }}</div>
									</td>
								</tr>
							</template>
						</table>
					</div>
					</VuePerfectScrollbar>
		      </b-tab>
		    </b-tabs>
		</b-modal>
		<b-modal id="modal-1" title="Filter tanggal" hide-footer>
			<div class="form-group">
				<label>Tanggal</label>
				<input type="date" class="form-control form-control-lg form-control-solid" v-model="date"  name="">
			</div>
			<div class="form-group">
				<b-button @click="filterDate" variant="primary" :disabled="isLoading">
					{{ isLoading ? 'Processing...' : 'Filter' }}
				</b-button>
			</div>
		</b-modal>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { BButton, BDropdown, BDropdownItem, BTabs, BTab } from 'bootstrap-vue'
import { successToas, errorToas } from '@/entities/notif'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
	name: 'ReportList',
	components: {
		BButton, BDropdown, BDropdownItem, BTab, BTabs, VuePerfectScrollbar
	},
	data() {
		return {
			fields: [
				{ key: 'name', label: 'Nama sekolah' },
				{ key: 'isreport', label: 'Status' },
				{ key: 'actions', label: 'Aksi' }
			],
			data: {},
			date: ''
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('report', ['school_reports'])
	},
	methods: {
		...mapActions('report', ['getDataSchoolReports', 'getDataReportSchool']),
		async collectData(id) {
			try {
				await this.getDataReportSchool({ id: id, date: this.date })
				this.getDataSchoolReports({ date: this.date })
			} catch (error) {
				this.$bvToast.toast('Kesalahan di server sekolah tujuan', errorToas())
			}
		},
		showData(id) {
			let index = this.school_reports.map(item => item.id).indexOf(id)
			if(index != -1) {
				this.data = this.school_reports[index]
				this.$bvModal.show('modal-report')
			}
		},
    	print () {
      		this.$htmlToPaper('printMe');
    	},
    	async filterDate() {
    		try {
    			await this.getDataSchoolReports({date: this.date})
    			this.$bvModal.hide('modal-1')
    		} catch (error) {
    			this.$bvToast.toast(error.message, errorToas())
    		}
    	}
	},
	created() {
		this.getDataSchoolReports({ date: this.date })
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	}
}
</script>