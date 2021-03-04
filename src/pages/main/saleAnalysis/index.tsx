import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import "./index.less";
import { EleResize } from "@/libs/resize";
const saleAnalysis: React.FC = function () {
  const [myChart, setMyChart] = useState<echarts.ECharts>();
  const chart = useRef(null);
  const initChart = () => {
    if (chart.current) {
      let myChart = echarts.init(chart.current as any);
      setMyChart(myChart);
      EleResize.on(chart.current, () => {
        myChart.resize();
      });
      let option = {
        grid: {
          left: "0",
          right: "20px",
          top: "10%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: { color: "rgba(0,0,0,0.3)" },
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
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
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
            option: {
              series: [{ barCategoryGap: "50%" }],
            },
          },
        ],
      };
      myChart.setOption(option);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      initChart();
    }, 100);
  }, []);
  useEffect(() => {
    return () => {
      if (myChart) {
        myChart.dispose();
      }
    };
  });
  return (
    <div className="sale-analysis">
      <div className="sale-analysis-title">销量分析</div>
      <div className="sale-analysis-chart" ref={chart}></div>
    </div>
  );
};
export default saleAnalysis;
