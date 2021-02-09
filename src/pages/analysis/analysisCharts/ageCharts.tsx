import React, { useRef, useState, useEffect } from "react";
import AnalysisBox from "../analysisBox";
import * as echarts from "echarts";
interface onSize {
  fn: () => void;
}
const ageChart = function () {
  const [myChart, setMyChart] = useState<echarts.ECharts>();
  const chart = useRef(null);
  const initChart = () => {
    if (chart.current) {
      let myChart = echarts.init(chart.current as any);
      const size: onSize = {
        fn: function () {
          myChart.resize();
        },
      };
      setMyChart(myChart);
      let option = {
        title: {
          text: "各年龄分布",
          textStyle: {
            color: "#fff",
          },
          top: "1%",
          left: "center",
        },
        grid: {
          left: "0%",
          right: "0%",
          top: "12%",
          bottom: "2%",
          containLabel: true,
        },
        legend: {
          bottom: "5%",
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "年龄分布",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "10-18" },
              { value: 735, name: "18-25" },
              { value: 580, name: "25-30" },
              { value: 484, name: "30-40" },
              { value: 300, name: "40-50" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              color: "#fff",
            },
          },
        ],
        media: [
          {
            query: {
              maxHeight: 400,
            },
            option: {
              grid: {
                top: 0,
              },
              series: [
                {
                  radius: "30%",
                },
              ],
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
export default ageChart;
