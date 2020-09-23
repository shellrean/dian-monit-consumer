<template>
	<div class="d-flex flex-column-fluid mt-4">
		<div class="container-fluid">
			<div class="card card-custom shadow-none border">
				<div class="card-header pt-6 border-0 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Rerport</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Daftar report sekolah</span>
					</h3>
					<div class="card-toolbar">
						<div class="form-group">
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
						  		<span class="badge badge-danger" v-if="row.item.report == null">Tidak ada laporan</span>
						  		<span class="badge badge-primary" v-if="row.item.report != null">Laporan diterima</span>
						  	</template>
						  	<template v-slot:cell(actions)="row">
						  		<b-dropdown variant="link" toggle-class="text-decoration-none" no-caret class="bg-hover-light-primary rounded-pill btn-icon">
									<template v-slot:button-content>
									    <span class="flaticon-more"></span>
									</template>
									<b-dropdown-item @click="collectData(row.item.id)">Ambil laporan</b-dropdown-item>
									<b-dropdown-item @click="showData(row.item.id)"  v-if="row.item.report != null">Lihat laporan</b-dropdown-item>
								</b-dropdown>
						  	</template>
						</b-table>
						<span class="badge badge-primary" v-if="date != ''">Laporan pada {{ date }}</span>
						<div class="d-flex align-items-center" v-if="isLoading">
							<div class="mr-2 text-muted">Loading...</div>
							<div class="spinner spinner-primary mr-10"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-report" :title="data.name" size="xl" hide-footer>
			<!-- <button @click="print" class="btn btn-success mb-1">Cetak data</button> -->
			<div class="table-responsive">
				<table class="table table-borderless">
					<tr v-if="typeof data.report != 'undefined'">
						<td width="150px">Total Jadwal</td>
						<td>{{ data.report.data.length }}</td>
					</tr>
				</table>
				<VuePerfectScrollbar
					style="max-height: 70vh; position: relative;"
				>
				<table class="table table-bordered"  v-if="typeof data.report != 'undefined'">
					<tr>
						<td>Waktu</td>
						<td>Kelas</td>
						<td>Mata Pelajaran</td>
						<td>Guru</td>
						<td>Tambahan</td>
					</tr>
					<tr v-for="report in data.report.data" :key="report.id">
						<td>{{ report.from_time }} - {{ report.end_time }}</td>
						<td>{{ report.classroom_subject.classroom.name }}</td>
						<td>{{ report.classroom_subject.subject.name }}</td>
						<td>{{ report.classroom_subject.teacher.name }}</td>
						<td>
							Total Masuk : {{ report.abcents.filter(map => map.user.role == '2' && map.isabcent === 1 ).length }} <br>
							Total Tidak masuk: {{ report.abcents.filter(map => map.user.role == '2' && map.isabcent === 0 ).length }} <br>
							Total Tanpa alasan : {{ report.abcents.filter(map => map.user.role == '2' && map.isabcent === 0 && map.reason == '0').length }} <br>
							Total Alpa : {{ report.abcents.filter(map => map.user.role == '2' && map.isabcent === 0 && map.reason == '1').length }} <br> 
							Total Sakit : {{ report.abcents.filter(map => map.user.role == '2' && map.isabcent === 0 && map.reason == '2').length }} <br>
							Total Izin : {{ report.abcents.filter(map => map.user.role == '2' && map.isabcent === 0 && map.reason == '3').length }} <br>
							Total Bermasalah : {{ report.abcents.filter(map => map.user.role == '2' && map.isabcent === 0 && map.reason == '4').length }} <br> 
						</td>
					</tr>
				</table>
				</VuePerfectScrollbar>
			</div>
		</b-modal>
		<b-modal id="modal-1" title="Filter tanggal" hide-footer>
			<div class="form-group">
				<div class="input-group mb-3">
					<input type="date" class="form-control" v-model="date">
					<div class="input-group-append">
						<button class="btn btn-primary" type="button" @click="filterDate" :disabled="isLoading">
							{{ isLoading ? 'Processing...' : 'Filter' }}
						</button>
					</div>
				</div>
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
				{ key: 'report.updated_at', label: 'Diubah pada' },
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