<template>
	<div class="container-fluid mt-4">
		<div class="row">
			<div class="col-lg-4">
				<NavigationDashboard />
			</div>
			<div class="col-lg-8">
				<SchoolList />
			</div>
		</div>
	</div>
</template>
<script>
import NavigationDashboard from '@/components/NavigationDashboard'
import SchoolList from '@/components/SchoolList'

export default {
	components: {
		NavigationDashboard,
		SchoolList
	}
}
</script>