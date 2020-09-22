<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-3">
				<NavigationDashboard />
			</div>
			<div class="col-lg-9">
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