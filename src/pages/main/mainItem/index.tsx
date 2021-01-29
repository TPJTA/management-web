import React from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { parseNumber } from "@/libs/tool";
import "./index.less";
interface mainItemTy {
  icon: React.ReactNode;
  color: string;
  title: string;
  number: number;
  rate: number;
}
const mainItem: React.FC<mainItemTy> = function (props) {
  const getRateWords = (rate: number): React.ReactNode => {
    if (rate >= 0) {
      return (
        <span>
          <UpOutlined style={{ color: "#f81d22" }} /> +{rate}% 增长
        </span>
      );
    } else if (rate < 0) {
      return (
        <span>
          <DownOutlined style={{ color: "#0b8235" }} /> {rate}% 减少
        </span>
      );
    }
  };
  return (
    <div className="main-item" style={{ color: props.color }}>
      <div className="main-item-icon" style={{ borderColor: props.color }}>
        {props.icon}
      </div>
      <div className="main-item-context">
        <div className="main-item-context-title">{props.title}</div>
        <div className="main-item-context-number">
          {parseNumber(props.number)}
        </div>
        <div className="main-item-context-rate" style={{ color: "#000" }}>
          {getRateWords(props.rate)}
        </div>
      </div>
    </div>
  );
};
export default mainItem;
