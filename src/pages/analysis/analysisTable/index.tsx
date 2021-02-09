import React, { useState, useEffect } from "react";
import AnalysisBox from "../analysisBox";
import "./index.less";
interface goodsItem {
  name: string;
  sale: number;
}
const analysisTable = function () {
  const [goodsList, setGoodsList] = useState<goodsItem[]>();
  useEffect(() => {
    const list = new Array(10).fill({
      name: "手机",
      sale: 2000,
    });
    setGoodsList(list);
  }, []);
  return (
    <AnalysisBox className="analysis-item-chart">
      <div className="analysis-table">
        <div className="analysis-table-title">销量排名</div>
        <table className="analysis-table-content">
          <thead className="analysis-table-content-header">
            <tr>
              <td>排名</td>
              <td>商品名称</td>
              <td>销量</td>
            </tr>
          </thead>
          <tbody className="analysis-table-content-body">
            {goodsList &&
              goodsList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div
                        className={"analysis-table-content-body-" + (index + 1)}
                      >
                        {index + 1}
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.sale}万</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </AnalysisBox>
  );
};
export default analysisTable;
