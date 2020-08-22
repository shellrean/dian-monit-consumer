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
											<select class="form-control form-control-solid" >
												<option></option>
											</select>
											<span>
												<i class="flaticon2-search-1 text-muted"></i>
											</span>
										</div>
									</div>
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
						<span class="card-label font-weight-bolder text-dark">Kehadiaran</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Monitoring data sementara realtime</span>
					</h3>
				</div>
					<div class="card-body">
						<GChart
                            type="BarChart"
                            :data="chartData"
                            :options="chartOptions"
                          />  
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="card card-custom">
					<div class="card-header pt-6 border-0 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Kehadiaran</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Monitoring data sementara realtime</span>
					</h3>
				</div>
					<div class="card-body">
						 <GChart
                            type="PieChart"
                            :data="chartData"
                            :options="chartOptions"
                          />  
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { GChart } from 'vue-google-charts'
 
export default {
  components: {
    GChart
  },
  data () {
    return {
      chartData: [
        ['Keterangan', 'Masuk', 'Tidak masuk'],
        ['SMKN 43', 6000, 4000],
        ['SMKN 34', 1000, 1000],
        ['SMKN 51', 1070, 600],
        ['SMKN 33', 3000, 1000],
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      }
    }
  }
}
</script>