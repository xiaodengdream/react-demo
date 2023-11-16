import React, { Component } from 'react'
//柱形图
// 引入ECharts主模块 
import * as echarts from "echarts/lib/echarts";
// 引入饼状图需要的模块 
import "echarts/lib/chart/pie";
import "echarts/lib/component/title";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import './bar.less'
export default class Pie extends Component { // 初始化状态 
  state = {
    data: [
      { value: 150, name: '电脑' },
      { value: 110, name: '洗衣机' },
      { value: 150, name: '电磁炉' },
      { value: 100, name: '微波炉' },
      { value: 150, name: '冰箱' },
      { value: 90, name: '电饭煲' },
    ],
    celldata: ['电脑', '洗衣机', '电磁炉', '微波炉', '冰箱', '电饭煲']
  };
  async componentDidMount() {

    var myChart = echarts.init(document.getElementById("main"));
    myChart.setOption(
      {
        title: {
          text: '商品分类占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}台 ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: this.state.celldata
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '销量',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            data: this.state.data
          }
        ]
      }
    );
  }
  render() {
    return (
      <div className='content'>
        <div className='content-home'>
          <div className='content-div '>
            <div id="main" style={{ width: ' 100%', height: '80%'}}></div>
          </div>
        </div>
      </div>
    )
  }
}