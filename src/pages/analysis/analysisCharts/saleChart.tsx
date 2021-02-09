import React, { useRef, useState, useEffect } from "react";
import AnalysisBox from "../analysisBox";
import * as echarts from "echarts";
interface onSize {
  fn: () => void;
}
const saleChart = function () {
  const [myChart, setMyChart] = useState<echarts.ECharts>();
  const chart = useRef(null);
  const initChart = () => {
    if (chart.current) {
      let myChart = echarts.init(chart.current as any);
      setMyChart(myChart);
      let option = {
        title: {
          text: "每月销量",
          textStyle: {
            color: "#fff",
          },
          top: "1%",
          left: "center",
        },
        grid: {
          left: "2%",
          right: "5%",
          top: "12%",
          bottom: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderWidth: 0,
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: {
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
            interval: 0,
          },
          axisLabel: {
            interval: 0,
            color: "#fff",
          },
        },
        yAxis: {
          axisLabel: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "销量",
            type: "line",
            data: [
              500,
              203,
              120,
              780,
              1002,
              789,
              569,
              904,
              1230,
              1100,
              1670,
              900,
            ],
            itemStyle: {
              color: "rgb(0, 173, 194)",
            },
          },
        ],
        media: [
          {
            query: {
              maxHeight: 400,
            },
            option: {
              xAxis: { axisLabel: { fontSize: 8 } },
            },
          },
        ],
      };
      myChart.setOption(option);
    }
  };
  useEffect(() => {
    initChart();
  }, []);
  useEffect(() => {
    return () => {
      if (myChart) {
        myChart.dispose();
      }
    };
  });
  return (
    <AnalysisBox
      onSize={myChart && myChart.resize}
      className="analysis-item-chart"
    >
      <div ref={chart} style={{ height: "100%", width: "100%" }}></div>
    </AnalysisBox>
  );
};
export default saleChart;
