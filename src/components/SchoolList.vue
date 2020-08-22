<template>
	<div class="d-flex flex-column-fluid">
		<div class="container-fluid">
			<div class="card card-custom">
				<div class="card-header pt-6 border-0 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Sekolah</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Daftar sekolah yang terdaftar</span>
					</h3>
					<div class="card-toolbar">
						<div class="form-group">
							<b-button variant="primary" v-b-modal.modal-create>
								<i class="flaticon2-add"></i>Tambah sekolah
							</b-button>
						</div>
					</div>
				</div>
				<div class="card-body">
					<div class="table-responsive-md">
						<b-table :fields="fields"
						  :items="schools">
						  	<template v-slot:cell(name)="row">
                        		<span>
                        			<div class="d-flex align-items-center">
                        				<div class="symbol symbol-40 symbol-light-primary symbol-sm flex-shrink-0">					
                        					<span class="symbol-label font-size-h4 font-weight-bold ">
                        						<i class="flaticon-earth-globe text-primary"></i>
                        					</span>								
                        				</div>								
                        				<div class="ml-4 d-flex flex-column">									
                        					<div class="text-dark-75 text-hover-primary font-weight-bolder font-size-lg mb-0" v-text="row.item.name"></div>									
                        					<span class="text-muted font-weight-bold" v-text="row.item.npsn"></span>	
                        				</div>							
                        			</div>
                        		</span>
                        	</template>
                        	<template v-slot:cell(actions)="row">
                        		<b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
									<template v-slot:button-content>
									    <i class="flaticon-more"></i>
									</template>
									<b-dropdown-item @click="getData(row.item.id)">Edit</b-dropdown-item>
									<b-dropdown-item @click="deleteData(row.item.id)">Hapus</b-dropdown-item>
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
		<b-modal id="modal-create" title="Sekolah" @hide="$store.commit('school/CLEAR_SCHOOL')" no-close-on-backdrop>
			<div class="form-group">
				<label>NPSN</label>
				<input type="text" class="form-control form-control-lg form-control-solid" v-model="school.npsn" :class="{ 'is-invalid' : errors.npsn }">
			</div>
			<div class="form-group">
				<label>Nama sekolah</label>
				<input type="text" class="form-control form-control-solid form-control-lg" v-model="school.name" :class="{ 'is-invalid' : errors.name }">
			</div>
			<div class="form-group">
				<label>URL</label>
				<input type="text" class="form-control form-control-solid form-control-lg" v-model="school.url" :class="{ 'is-invalid' : errors.url }">
			</div>
			<template v-slot:modal-footer="{ cancel }">
				<b-button variant="primary" @click="submit" :disabled="isLoading">
					{{ isLoading ? 'Processing...' : 'Simpan' }}
				</b-button>
				<b-button variant="secondary" @click="cancel()" :disabled="isLoading">
                	Tutup
             	</b-button>
			</template>
		</b-modal>
	</div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { successToas, errorToas } from '@/entities/notif'
import { BButton, BDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
	name: 'SchoolList',
	components: {
		BButton, BDropdown, BDropdownItem
	},
	data() {
		return {
			fields: [
				{ key: 'name', thStyle: { display: 'none'} },
				{ key: 'key', thStyle: { display: 'none' } },
				{ key: 'actions', thStyle: { display: 'none'} }
			]
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('school',['school','schools'])
	},
	methods: {
		...mapActions('school', ['getDataSchools','getDataSchool','createDataSchool','updateDataSchool','deleteDataSchool']),
		changeData() {
			this.getDataSchools()
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		},
		async submit(){
			try {
				if(typeof this.school.id != 'undefined') {
					await this.updateDataSchool()
				} else {
					await this.createDataSchool()
				}
				
				this.changeData()
				this.$bvModal.hide('modal-create')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async getData(id) {
			try {
				await this.getDataSchool(id)
				this.$bvModal.show('modal-create')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		deleteData(id) {
			this.$swal({
                title: 'Informasi',
                text: "Data sekolah akan dihapus beserta dengan data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                	try {
                		await this.deleteDataSchool(id)
                		this.$bvToast.toast('Data sekolah berhasil dihapus', successToas())
                		this.changeData()
                	} catch (error) {
                		this.$bvToast.toast(error.message, errorToas())
                	}
                }
            })
		}
	},
	created() {
		this.changeData()
	}
}
</script>