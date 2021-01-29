import React from "react";
import MainItem from "./mainItem";
import { DollarCircleFilled, EyeFilled } from "@ant-design/icons";
import MyIcon from "@/assets/fonts";
import SaleAnalysis from "./saleAnalysis";
import "./index.less";
const main: React.FC = function () {
  return (
    <div className="main" style={{ height: "100%" }}>
      <div className="main-item-outter">
        <MainItem
          title="商品总数"
          number={3543}
          rate={80}
          color="#1296db"
          icon={<MyIcon type="icon-gouwu" />}
        />
        <MainItem
          title="销量总数"
          number={21287}
          rate={-15}
          color="rgb(252, 126, 0)"
          icon={<DollarCircleFilled />}
        />
        <MainItem
          title="收入总数"
          number={21000}
          rate={-40}
          color="#0e932e"
          icon={<MyIcon type="icon-yonghu" />}
        />
        <MainItem
          title="访问量"
          number={74315}
          rate={10}
          color="rgb(241, 85, 107)"
          icon={<EyeFilled />}
        />
      </div>
      <SaleAnalysis />
    </div>
  );
};
export default main;
