<template>
	<!-- 左右横线柱状图 -->
	<div class='histogram'>
		<div id="histogramChart" class='myChart'></div>
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
				let transverseHistogramChart = this.$echarts5.init(document.getElementById('histogramChart'))
				var xData =  this.reportData.content[0].dataOne;
				var xData1 = this.reportData.content[0].dataThree ;
				var lastYearData =  this.reportData.content[0].dataTwo ;
				var thisYearData = this.reportData.content[0].dataFour ;
				var timeLineData = [1];
				let textColor = '#fff';
				let lineColor = '#D1D1D1';
				var option = {
					baseOption: {
						backgroundColor: '',
						timeline: {
							show: false,
							top: 0,
							data: [],
						},
						grid: [{
								show: false,
								top: '10%',
								bottom: '8%',
								containLabel: true,
								width: '37%',
							},
							{
								show: false,
								left: '51%',
								top: '10%',
								bottom: '8%',
								width: '0%',
							},
							{
								show: false,
								right: '16%',
								top: '10%',
								bottom: '8%',
								containLabel: true,
								width: '37%',
							},
						],
						xAxis: [{
								type: 'value',
								inverse: true,
								axisLine: {
									show: false,
								},
								axisTick: {
									show: false,
								},
								position: 'top',
								axisLabel: {
									show: false,
									color: textColor,
								},
								splitLine: {
									show: false,
									lineStyle: {
										color: 'lineColor',
									},
								},
							},
							{
								gridIndex: 1,
								show: false,
							},
							{
								gridIndex: 2,
								axisLine: {
									show: false,
								},
								axisTick: {
									show: false,
								},
								position: 'top',
								axisLabel: {
									show: false,
									color: textColor,
								},
								splitLine: {
									show: false,
									lineStyle: {
										color: lineColor,
									},
								},
							},
						],
						yAxis: [{
								type: 'category',
								inverse: true,
								position: 'left',
								offset: 100,
								axisLine: {
									show: true,
									lineStyle: {
										color: lineColor,
									},
								},

								axisTick: {
									show: false,
								},
								axisLabel: {
									show: false,
								},
								data: xData,
								axisLabel: {
									show: true,
									padding: [0, 0, 0, 0],
									color: '#333',
									fontSize: 18,
									margin: 16,
									align: 'center',

								},
							},
							{
								gridIndex: 1,
								type: 'category',
								inverse: true,
								position: 'right',
								axisLine: {
									show: false,
								},
								axisTick: {
									show: false,
								},
							},
							{
								gridIndex: 2,
								type: 'category',
								inverse: true,
								position: 'right',
								offset: 100,
								axisLine: {
									show: false,
								},
								axisTick: {
									show: false,
								},
								axisLabel: {
									show: true,
									padding: [0, 0, 0, 0],
									color: '#333',
									fontSize: 18,
									align: 'center',
								},
								data: xData1,
							},
						],
						series: [],
					},
					options: [],
				};

				option.baseOption.timeline.data.push(timeLineData[0]);
				option.options.push({
					series: [{
							name: '2017',
							type: 'bar',
							barWidth: 40,
							stack: '1',
							itemStyle: {
								borderRadius: [8, 0, 0, 8],
								color: '#00E3B9',
							},
							label: {
								show: true,
								position: 'left', // 在上方显示
								right: 100,
								// 数值样式
								color: '#333333',
								fontSize: 22,
							},
							data: lastYearData,
							animationEasing: 'elasticOut',
						},
						{
							name: '2018',
							type: 'bar',
							stack: '2',
							barWidth: 40,
							xAxisIndex: 2,
							yAxisIndex: 2,
							itemStyle: {
								borderRadius: [0, 8, 8, 0],
								color: '#00E3B9',
							},
							label: {
								show: true,
								position: 'right', // 在上方显示
								right: 100,
								// 数值样式
								color: '#333333',
								fontSize: 22,
							},
							data: thisYearData,
							animationEasing: 'elasticOut',
						},
					],
				});

				transverseHistogramChart.setOption(option)
			}
		},
	}
</script>

<style lang="less" scoped>
	.histogram {
		.myChart {
			width: 1000px;
			height: 500px;
			margin: 0 auto;
		}
	}
</style>
