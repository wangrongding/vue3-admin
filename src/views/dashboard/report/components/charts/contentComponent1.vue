<template>
	<!-- 仪表盘 -->
	<div class='dashboard'>
		<div id="dashboardChart" class='myChart'></div>
	</div>
</template>

<script>
	export default {
		props: {
			reportData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {}
		},
		mounted() {
			this.drawLine();  
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let dashboardChart = this.$echarts5.init(document.getElementById('dashboardChart'))
				if(this.reportData.content[0].interval.slice(-1)[0][0] < 1){
					this.reportData.content[0].interval.push(['1',this.reportData.content[0].interval.slice(-1)[0][1]])
				}
				// 绘制图表
				dashboardChart.setOption({
					series: [{
						type: 'gauge',
						startAngle: 180,
						endAngle: 0,
						min: 0,
						max: 1,
						splitNumber: 8,
						radius: '90%',
						axisLine: {
							lineStyle: {
								width: 20,
								color: this.reportData.content[0].interval
							},
							show: true
						},
						pointer: {
							icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
							length: '10%',
							width: 20,
							offsetCenter: [1, '-60%'],
							itemStyle: {
								color: 'auto'
							},
						},
						axisTick: {
							length: 12,
							lineStyle: {
								color: 'auto',
								width: 2
							}
						},
						splitLine: {
							length: 20,
							lineStyle: {
								color: 'auto',
								width: 5
							}
						},
						axisLabel: {
							color: '#464646',
							fontSize: 20,
							distance: -60,
							formatter: function(value) {
								return '';
							}
						},
						title: {
							offsetCenter: [0, '-20%'],
							fontSize: 18,
							color: 'inherit'
						},
						detail: {
							fontSize: 28,
							offsetCenter: [0, '0%'],
							valueAnimation: true,
							formatter: function(value) {
								return Math.round(value * 100) + '分';
							},
							color: 'inherit'
						},
						data: [{
							value: this.reportData.content[0].score / 100,
							name: this.reportData.content[0].riskLevel,
						}]
					}]
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.dashboard {
		height: 300px;

		.myChart {
			width: 1000px;
			height: 500px;
			margin: 21px auto;
		}
	}
</style>
