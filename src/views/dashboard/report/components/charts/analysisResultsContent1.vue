<template>
	<!-- 横向柱状图  -->
	<div class='transverseHistogram'>
		<div id="transverseHistogramChart" class='myChart'></div>
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
				let transverseHistogramChart = this.$echarts.init(document.getElementById('transverseHistogramChart'))
				var data = this.reportData.content[0].dimensionScore;
				// 绘制图表
				transverseHistogramChart.setOption({
					backgroundColor: '',
					color: ['#22b8ed'],
					title: {
						text: this.reportData.content[0].dimensionTitle,
						left: 'center',
						textStyle: {
							lineHeight: "50", 
							color: '#333333', 
							fontStyle: 'normal', 
							fontWeight: '500', 
							fontFamily: 'SourceHanSansCN-Medium, SourceHanSansCN', 
							fontSize: 24,
						}
					},
					grid: {
						left: '1%',
						right: '8%',
						bottom: '8%',
						backgroundColor: '#333',
						containLabel: true
					},
					yAxis: [{
						name: '',
						type: 'category',
						data:this.reportData.content[0].dimensionName,
						triggerEvent: true,
						axisTick: {
							show: false, // 坐标值是否在刻度中间
						},
						axisLabel: {
							fontSize: 18,
							color: '#333',
							margin: 16,

						}
					}],
					xAxis: [{
						type: 'value',
						triggerEvent: false,
						splitNumber: 1,
						show:true,
						axisLabel: {
							showMinLabel: true,
							showMaxLabel: true,
							fontSize: 18,
							color: '#333',
						},
						splitLine: {
							show: false
						}
					}],
					series: [{
						type: 'bar',
						data: data, 
						barGap: '5%', // 柱图间距
						barWidth: 40, // 柱图宽度
						itemStyle: {
							barBorderRadius: [0, 8, 8, 0],
							color: '#00E3B9',
						},
						label: {
							show: true, // 开启显示
							position: 'right', // 在上方显示
							color: '#333333',
							fontSize: 22
						} 
					}]
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.transverseHistogram {
		.myChart {
			width: 1000px;
			height: 500px;
			margin: 0 auto;
		}
	}
</style>
