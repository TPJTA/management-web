import React, { useState, useEffect, useRef } from "react";
import AnalysisBox from "../analysisBox";
import "./index.less";
interface goodsItem {
  name: string;
  sale: number;
}
const analysisTable = function () {
  const [goodsList, setGoodsList] = useState<goodsItem[]>();
  const tableScroll = useRef(null);
  useEffect(() => {
    const list = new Array(10).fill({
      name: "手机",
      sale: 2000,
    });
    setGoodsList(list);
  }, []);
  const showScroll = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let scroll = tableScroll.current;
    if (scroll) {
      let tableBody = e.currentTarget.querySelector(
        ".analysis-table-content-body"
      );
      if (tableBody?.clientHeight) {
        if (tableBody.scrollHeight - tableBody.clientHeight !== 0) {
          (scroll as HTMLElement).style.height =
            2 * tableBody.clientHeight - tableBody.scrollHeight - 5 + "px";
          (scroll as HTMLElement).style.opacity = "1";
        }
      }
    }
  };
  const hiddenScroll = () => {
    let scroll = tableScroll.current;
    if (scroll) {
      (scroll as HTMLElement).style.opacity = "0";
    }
  };
  const scroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let scroll = tableScroll.current;
    if (scroll) {
      (scroll as HTMLElement).style.top = 40 + e.currentTarget.scrollTop + "px";
    }
  };
  return (
    <AnalysisBox className="analysis-item-chart">
      <div
        className="analysis-table"
        onMouseEnter={showScroll}
        onMouseLeave={hiddenScroll}
      >
        <div className="analysis-table-title">销量排名</div>
        <div className="analysis-table-content">
          <div className="analysis-table-content-header">
            <table>
              <thead>
                <tr>
                  <td>排名</td>
                  <td>商品名称</td>
                  <td>销量</td>
                </tr>
              </thead>
            </table>
          </div>
          <div className="analysis-table-content-body" onScroll={scroll}>
            <table>
              <tbody>
                {goodsList &&
                  goodsList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div
                            className={
                              "analysis-table-content-body-" + (index + 1)
                            }
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
          <div
            className="analysis-table-content-scroll"
            ref={tableScroll}
          ></div>
        </div>
      </div>
    </AnalysisBox>
  );
};
export default analysisTable;
