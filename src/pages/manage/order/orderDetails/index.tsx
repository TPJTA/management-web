import React, { useEffect, useState } from "react";
import { Button, Space, Spin } from "antd";
import printJS from "print-js";
import { RouteComponentProps } from "react-router-dom";
import { orderData, goodsData } from "../orderTable";
import { formatMoney, formatTime } from "@/libs/tool";
import "./index.less";
const orderDetails: React.FC<RouteComponentProps> = function (props) {
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState<orderData>();
  const getAllMoney = (goods: goodsData[]) => {
    let result = 0;
    goods.forEach((item) => {
      result += item.number * item.price;
    });
    return result;
  };
  const printing = () => {
    printJS({
      printable: "print-table",
      type: "html",
      style: style,
      scanStyles: false,
    });
  };
  const cancel = () => {
    props.history.push("/manage/order/");
  };
  const deliverGoods = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (orderData) {
        setOrderData({ ...orderData, state: "运送中" });
        setIsLoading(false);
      }
    }, 300);
  };
  useEffect(() => {
    setIsLoading(true);
    let timer = setTimeout(() => {
      let state: any = props.location.state;
      if (typeof state === "object" && state.order) {
        setIsLoading(false);
        setOrderData(state.order);
      } else {
        props.history.push("/404");
      }
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="order-details">
      <Spin spinning={isLoading} tip="加载中...">
        <div id="print-table">
          <table className="order-details-message">
            <thead>
              <tr className="order-details-message-title">
                <td colSpan={2}>订单详细</td>
              </tr>
            </thead>
            <tbody>
              <tr className="order-details-message-content">
                <td>
                  <span>收件姓名: </span>
                  {orderData?.addressee}
                </td>
                <td>
                  <span>联系电话: </span>
                  {orderData?.phoneNumber}
                </td>
              </tr>
              <tr className="order-details-message-content">
                <td>
                  <span>联系地址: </span>
                  {orderData?.address}
                </td>
                <td>
                  <span>订单状态: </span>
                  {orderData?.state}
                </td>
              </tr>
              <tr className="order-details-message-content">
                <td>
                  <span>下单时间: </span>
                  {orderData?.time && formatTime(orderData.time)}
                </td>
                <td>
                  <span>订单编号: </span>
                  {orderData?.id}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="order-details-goods">
            <thead>
              <tr className="order-details-goods-title">
                <td>缩略图</td>
                <td>产品名称</td>
                <td>单价</td>
                <td>数量</td>
                <td>小计</td>
              </tr>
            </thead>
            <tbody className="order-details-goods-content">
              {orderData?.goods.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.img} alt="" />
                  </td>
                  <td>{item.title}</td>
                  <td>￥ {formatMoney(item.price)}</td>
                  <td>{item.number}</td>
                  <td>￥ {formatMoney(item.price * item.number)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="order-details-goods-foot">
              <tr>
                <td colSpan={5}>
                  订单共计金额: ￥
                  {orderData?.goods &&
                    formatMoney(getAllMoney(orderData.goods))}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="order-details-operation">
          <Space>
            <Button onClick={printing}>打印订单</Button>
            <Button onClick={deliverGoods}>发货</Button>
            <Button onClick={cancel}>取消订单</Button>
          </Space>
        </div>
      </Spin>
    </div>
  );
};
export default orderDetails;
const style = `
.order-details {
  height: 100%;
  width: 100%;
}
.order-details-message {
  width: 100%;
}
.order-details-message-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background-color: #ddd;
}
.order-details-message-content {
  font-size: 14px;
}
.order-details-message-content td {
  padding: 10px 0;
  padding-left: 20%;
  width: 50%;
  box-sizing: border-box;
}
.order-details-message-content span {
  font-weight: bold;
}
.order-details-goods {
  width: 100%;
  font-size: 14px;
  text-align: center;
  border-top: 20px solid #ddd;
  border-bottom: 20px solid #ddd;
  border-collapse: collapse;
}
.order-details-goods td {
  border: 1px solid #ddd;
}
.order-details-goods-title {
  height: 50px;
  font-weight: bold;
}
.order-details-goods-content img {
  width: 50px;
  height: 50px;
}
.order-details-goods-foot td {
  font-weight: bold;
  padding: 5px 20px 5px 0;
  text-align: right;
}
.order-details-operation {
  padding: 10px;
  text-align: right;
}`;
