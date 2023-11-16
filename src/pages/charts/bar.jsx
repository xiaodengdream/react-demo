import React, { Component } from 'react'
//柱形图
// 引入ECharts主模块 
import * as echarts from "echarts/lib/echarts";
// 引入饼状图需要的模块 

import './bar.less'
export default class Bar extends Component { // 初始化状态 
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    this.initCharts();
    // 绘制图表
  }
  initCharts = () => {
    const myChart = echarts.init(document.getElementById("main"));
    let option = {
      // 图表背景颜色
      // backgroundColor: '#ccc',
      title: {
        text: '小邓的echarts柱状图',
        left: "center",
        textStyle: {
          color: 'pink',
          fontSize: 24,

        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Rainfall', 'Evaporation'],
        textStyle: {
          color: 'black',
        },
        orient: 'vertical',
        left: 'center',
        bottom: 'bottom',
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          name: '月份',
          nameTextStyle: {
            padding: [20, 0, 0, 0],    // 四个数字分别为上右下左与原位置距离
            color: 'green',
            fontSize: 18,
          },
          type: 'category',
          // prettier-ignore
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLabel: {
            margin: 20,
            interval: 0,
            rotate: 20,
            textStyle: {
              //改变x轴上文字的颜色
              color: "green",
              fontSize: 18,
            }
          }
        }
      ],
      yAxis: [
        {
          name: '销售量',
          nameTextStyle: {
            padding: [20, 0, 0, 0],    // 四个数字分别为上右下左与原位置距离
            color: 'red',
            fontSize: 18,
          },

          type: 'value',
          axisLabel: {
            textStyle: {
              //改变y轴上文字的颜色
              color: "red",
              fontSize: 18,
            }
          },
          axisLine: {
            show: true,//是否显示轴线
            lineStyle: {
              color: 'black',//刻度线的颜色
            }
          }
        }
      ],
      series: [
        {
          name: 'Rainfall',
          type: 'bar',
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ],
          itemStyle: {
            normal: {
              color: 'pink'
            },
          },
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        },
        {
          name: 'Evaporation',
          type: 'bar',
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          ],
          markPoint: {
            data: [
              { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
              { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
            ],
            label: {
              offset: [0, 0],
              textStyle: {
                color: "red",
                fontSize: 12,
              },
            },
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }],
            label: {
              offset: [0, 0],
              textStyle: {
                color: "red",
                fontSize: 12,
              },
            },
          }
        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }


  render() {
    return (
      <div className='content'>
        <div className='content-home'>
          <div className='content-div'>
            <div id="main" style={{ width: ' 100%', height: '80%' }}></div>
          </div>
        </div>
      </div>
    )
  }
}