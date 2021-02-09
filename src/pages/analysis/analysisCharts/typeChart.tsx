import React, { useRef, useState, useEffect } from "react";
import AnalysisBox from "../analysisBox";
import * as echarts from "echarts";
interface onSize {
  fn: () => void;
}
const typeChart = function () {
  const [myChart, setMyChart] = useState<echarts.ECharts>();
  const chart = useRef(null);
  const initChart = () => {
    if (chart.current) {
      let myChart = echarts.init(chart.current as any);
      setMyChart(myChart);
      let option = {
        title: {
          text: "各类型销量",
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
          axisPointer: {
            type: "shadow",
            shadowStyle: { color: "rgba(0,0,0,0.3)" },
          },
        },
        xAxis: {
          type: "value",
          axisLabel: {
            color: "#fff",
          },
        },
        yAxis: {
          data: ["服装", "饰品", "食品", "化妆品"],
          axisTick: {
            alignWithLabel: true,
            interval: 0,
          },
          axisLabel: {
            interval: 0,
            color: "#fff",
          },
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [500, 203, 120, 780],
            itemStyle: {
              color: "rgb(0, 173, 194)",
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
export default typeChart;
