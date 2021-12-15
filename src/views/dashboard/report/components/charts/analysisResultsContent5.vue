<template>
	<!-- 折线图 -->
	<div class='linechart'>
		<div id="linechartChart" class='myChart'></div>
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
				let linechartChart = this.$echarts5.init(document.getElementById('linechartChart'))
				this.reportData.content[1].forEach(function(item){
					item.coord = item.data
					item.name = Math.round(item.coord[1]) 
				}) 
				// 绘制图表
				linechartChart.setOption({
					title: {
						text: 'T分数',
						left: 'left',
						textStyle: {
							fontSize: 18,
							color: '#333', //标题颜色
						},
					},
					xAxis: {
						type: 'category',
						splitLine: {
							show: false,
						},
						axisLine: {
							lineStyle: {
								width: 1,
								color: '#ccc',
							},
						},
						axisTick: {
							show: true,
						},
						axisLabel: {
							color: '#333',
							fontSize: 18,
						},
						data: this.reportData.content[0].dimensionName,
					},
					grid: {
						left: '2%',
						right: '4%',
						bottom: '4%',
						containLabel: true,
					},
					yAxis: {
						type: 'value',
						interval: 10,
						max: 110,
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed',
							},
						},
						axisLine: {
							lineStyle: {
								width: 1,
								color: '#ccc',
							},
						},
						axisTick: {
							lineStyle: {
								width: 0,
								color: '#333',
							},
						},
						axisLabel: {
							color: '#333',
							fontSize: 18,
						},
					},
					series: [{
						type: 'line',
						symbol: 'circle',
						symbolSize: 9,
						smooth: false,
						itemStyle: {
							color: '#fff',
							borderColor: '#00E3B9',
							borderWidth: 1, 
						},
						lineStyle: { 
							color: '#00E3B9',
							width: 3,
							shadowColor: '#',
							shadowBlur: 10,
							shadowOffsetX: 4,
							shadowOffsetY: 10,
						},
						data: this.reportData.content[0].dimensionScore,
						markLine: {
							silent: true,
							symbol: 'none',
							data: [{
								yAxis: 50,
								lineStyle: {
									color: '#00E3B9',
								},
							}, ],
							label: {
								show: false,
							},
						},
						markArea: {
							//标记区域
							data: [
								[{
										yAxis: '30',
										itemStyle: {
											color: '#FFD3D2',
										},
									},
									{
										yAxis: '70',
									}
								],
								[{
										yAxis: '40',
										itemStyle: {
											color: '#FFF6DD',
										},
									},
									{
										yAxis: '60',
									},
								],
							],
						},
						markPoint: {
							label: {
								show: true,
								align: 'center',
								color: '#333',
								fontWeight: 100,
								formatter: '{b}',
							},
							itemStyle: {
								color: {
									type: 'radial',
									x: 0.4,
									y: 0.4,
									r: 0.9,
									colorStops: [{
											offset: 0,
											color: '#FECB39',
										},
										{
											offset: 1,
											color: '#FECB39',
										},
									],
									globalCoord: false,
								},
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowBlur: 10,
							},
							data: this.reportData.content[1]
						},
					}, ],
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.linechart {
		.myChart {
			width: 1000px;
			height: 500px;
			margin: 0 auto;
		}
	}
</style>
