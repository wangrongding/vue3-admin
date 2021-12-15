<template>
	<!-- 雷达图 -->
	<div class='radar'>
		<div id="radarChart" class='myChart'></div>
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
				let radarChart = this.$echarts5.init(document.getElementById('radarChart'))
				var data = this.reportData.content[0].dimensionScore
				var indicatorname = this.reportData.content[0].dimensionName
				var maxdata = [100, 100, 100, 100, 100, 100, 100, 100];

				function contains(arrays, obj) {
					var i = arrays.length;
					while (i--) {
						if (arrays[i] === obj) {
							return i;
						}
					}
					return false;
				}

				var indicator = [];
				for (var i = 0; i < indicatorname.length; i++) {
					indicator.push({
						name: indicatorname[i],
						max: maxdata[i]
					})
				}

				function innerdata(i) {
					var innerdata = [];
					for (let j = 0; j < data.length; j++) {
						innerdata.push(100 - 20 * i)
					}
					return innerdata
				}

				var optionData = getData(data)

				function getData(data) {
					var res = {
						series: [{
							type: 'radar',
							symbolSize: 20,
							symbol: "circle",
							areaStyle: {
								color: "#00E3B9",
								opacity: 0.3
							},

							lineStyle: {
								color: '#00E3B9',
								width: 3
							},
							itemStyle: {
								color: "#fff ",
								borderColor: '#00E3B9',
								borderWidth: 4,
								opacity: 1
							},
							label: {
								show: true,
								formatter: function(params) {
									return JSON.stringify(params).value;
								},
								color: '#333',
								fontSize: 22

							},
							data: [{
								value: data,
							}],
							z: 100
						}, ],
					};
					for (let i = 0; i < data.length; i++) {
						res.series.push({
							type: 'radar',
							data: [{
								value: innerdata(i),
							}],
							symbol: 'none',
							lineStyle: {
								width: 0
							},
							itemStyle: {
								color: '#fff'
							},
							areaStyle: {
								color: '#fff',
								shadowColor: 'rgba(0,224,180,0.2)',
								shadowBlur: 20,
								shadowOffsetY: 0
							}
						});
					}
					return res;
				}
				// 绘制图表
				radarChart.setOption({
					backgroundColor: '#fff',
					radar: {
						indicator: indicator,
						splitArea: {
							show: true,
							areaStyle: {
								color: '#fff',
								shadowColor: 'rgba(14,122,191,0.19)',
								shadowBlur: 20,
								shadowOffsetY: 0
							}
						},
						splitLine: {
							show: false,

						},
						axisLine: {
							show: false,
						},
						axisLabel: {
							show: false
						},
						axisName: {
							rich: {
								b: {
									fontSize: '18',
									color: '#333',
									align: 'left',
								}
							},

							formatter: function(params, index) {
								var i = contains(indicatorname, params);
								var percent = data[i] / 100 * 100;
								return '{b|' + params + '}'
							},
						},
					},
					series: optionData.series
				});
			}
		},
	}
</script>

<style lang="less" scoped>
	.radar {
		.myChart {
			width: 100%;
			height: 600px;
		}
	}
</style>
