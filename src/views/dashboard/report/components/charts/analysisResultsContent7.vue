<template>
	<!-- 纵向柱状图 -->
	<div class='longitudinalHistogram'>
		<div id="longitudinalHistogramChart" class='myChart'></div>
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
			console.log(this.reportData)
			this.drawLine();
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let longitudinalHistogramChart = this.$echarts5.init(document.getElementById('longitudinalHistogramChart'))
				// 绘制图表
				longitudinalHistogramChart.setOption({
					backgroundColor: '#fff',
					grid: {
						top: '5%',
						left: '3%',
						right: '1%',
						bottom: '8%',
					},
					xAxis: [{
						type: 'category',
						data: this.reportData.content[0].dimensionName ,
						axisTick: {
							show: false, // 是否显示坐标轴轴线
						},
						axisLabel: {
							color: '#333',
							fontSize: 18,
						},
						splitLine: {
							show: false,
						},
						boundaryGap: true,
						axisLine: {
							//坐标轴轴线相关设置。
							show: true,
							inside: false,
							lineStyle: {
								color: '#979797',
							},
						},
					}, ],

					yAxis: [{
						type: 'value',
						min: 0,
						splitNumber: 5,
						splitLine: {
							show: false
						},
						axisLabel: {
							//坐标轴刻度标签的相关设置。
							show: true,
							color: '#333',
							fontSize: 18,
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#979797',
							},
						},
						axisTick: {
							show: false,
						},
					}, ],
					series: [{
						type: 'bar',
						barMaxWidth: 40,
						barGap: '5%', // 柱图间距
						zlevel: 10,
						data: this.reportData.content[0].dimensionScore ,
						itemStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
										offset: 0,
										color: '#00E3B9',
									},
									{
										offset: 1,
										color: '#00E3B9',
									},
								],
							},
							borderRadius: [8, 8, 0, 0],
						},
						label: {
							show: true, //开启显示
							position: 'top', //在上方显示
							color: '#333',
							fontSize: 18,
							fontWeight: 400,
						},
					}, ],
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.longitudinalHistogram {
		.myChart {
			width: 1000px;
			height: 500px;
			margin: 0 auto;
		}
	}
</style>
