import React, { useRef, useState, useEffect } from "react";
import AnalysisBox from "../analysisBox";
import * as echarts from "echarts";
import "./map";
import { outdata, convertData } from "./data";
interface onSize {
  fn: () => void;
}
const analysisMap = function () {
  const [myChart, setMyChart] = useState<echarts.ECharts>();
  const chart = useRef(null);
  const initChart = () => {
    if (chart.current) {
      let myChart = echarts.init(chart.current as any);
      setMyChart(myChart);
      let option = {
        title: {
          text: "各地区销量",
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
        geo: {
          map: "china",
          center: [103.53, 40.43],
          zoom: 1.2,
          show: false,
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.5)",
          formatter: (params: any) => {
            return `${params.data.name} ${params.data.value}个`;
          },
          borderWidth: 0,
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "地区分布",
            type: "map",
            map: "china",
            center: [103.53, 40.43],
            zoom: 1.2,
            data: outdata,
            emphasis: {
              label: { show: false },
              itemStyle: {
                areaColor: "#389BB7",
                borderWidth: 0,
              },
            },
            itemStyle: {
              borderColor: "rgba(147, 235, 248, 1)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
              shadowColor: "rgba(128, 217, 248, 1)",
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
            },
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData,
            showEffectOn: "render",
            itemStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(40, 84, 109,0.2)",
                  },
                  {
                    offset: 0.8,
                    color: "rgba(40, 84, 109,0.8)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 173, 194,0.7)",
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            label: {
              show: true,
              color: "#fff",
              fontWeight: "bold",
              position: "inside",
              formatter: function (para: any) {
                if (para.data.value[2] === 0) return "";
                return "{cnNum|" + para.data.value[2] + "}";
              },
              rich: {
                cnNum: {
                  fontSize: 13,
                  color: "#D4EEFF",
                },
              },
            },
            symbolSize: function (val: any) {
              if (val[2] === 0) {
                return 0;
              }
              var a = 80 / 5990;
              var b = 100 - a * 6000;
              return a * val[2] + b * 1.2;
            },
            symbol: "circle",
            tooltip: {
              backgroundColor: "rgba(0,0,0,0.5)",
              formatter: (params: any) => {
                return `${params.data.name} ${params.data.value[2]}个`;
              },
              borderWidth: 0,
              textStyle: {
                color: "#fff",
              },
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
    <AnalysisBox onSize={myChart && myChart.resize} className="analysis-map">
      <div className="analysis-map-header">
        <div className="analysis-map-header-item">
          <div className="analysis-map-header-number">3912410</div>
          <div className="analysis-map-header-title">{2018}年总收入</div>
        </div>
        <div className="analysis-map-header-item">
          <div className="analysis-map-header-number">1212310</div>
          <div className="analysis-map-header-title">{2018}年总支出</div>
        </div>
      </div>
      <div style={{ width: "100%", height: "100%" }} ref={chart}></div>
    </AnalysisBox>
  );
};
export default analysisMap;
