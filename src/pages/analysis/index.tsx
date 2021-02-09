import React, { useEffect } from "react";
import "./index.less";
import SaleChart from "./analysisCharts/saleChart";
import TypeChart from "./analysisCharts/typeChart";
import AgeCharts from "./analysisCharts/ageCharts";
import AnalysisTable from "./analysisTable";
import AnalysisMap from "./analysisMap";
import { RouteComponentProps } from "react-router-dom";
import { LeftSquareFilled } from "@ant-design/icons";
const Analysis: React.FC<RouteComponentProps> = function (
  props: RouteComponentProps
) {
  useEffect(() => {
    try {
      var documentElement = document.documentElement;
      if (!document.fullscreenElement) {
        documentElement.requestFullscreen();
      }
    } catch (err) {}
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  });
  const goBack = () => {
    props.history.goBack();
  };
  return (
    <div className="analysis">
      <div className="analysis-header">
        <div className="analysis-header-title">大数据分析</div>
        <div className="analysis-header-back" onClick={goBack}>
          <LeftSquareFilled />
        </div>
      </div>
      <div className="analysis-content">
        <div className="analysis-item">
          <TypeChart />
          <SaleChart />
        </div>
        <AnalysisMap />
        <div className="analysis-item">
          <AnalysisTable />
          <AgeCharts />
        </div>
      </div>
    </div>
  );
};
export default Analysis;
