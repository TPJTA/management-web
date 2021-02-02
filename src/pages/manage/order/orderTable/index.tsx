import React, { FC } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { Table, Button, Space } from "antd";
import { formatTime, formatMoney } from "@/libs/tool";

type stateTy = "未付款" | "未发货" | "运送中" | "已完成";
export interface goodsData {
  id: number;
  key: any;
  img: string;
  title: string;
  price: number;
  number: number;
}
export interface orderData {
  id: string;
  key: any;
  time: number;
  address: string;
  phoneNumber: string;
  addressee: string;
  money: number;
  state: stateTy;
  goods: goodsData[];
}
export interface pageData {
  current: number;
  total: number;
  pageSize: number;
}
interface props extends RouteComponentProps {
  dataSource: orderData[];
  pageData: pageData;
  isLoading: boolean;
  pageChange: (page: number, pageSize?: number) => void;
  deletOrder: (id: string) => void;
}
const center: "center" = "center";
const orderTable: FC<props> = function (props) {
  const deletOrder = props.deletOrder;
  const viewOrder = (order: any) => {
    props.history.push({
      pathname: `/manage/order/${order.id}`,
      state: { order },
    });
  };
  const columns = [
    {
      title: "订单编号",
      dataIndex: "id",
      align: center,
    },
    {
      title: "下单时间",
      dataIndex: "time",
      align: center,
      render(text: number) {
        return formatTime(text, true);
      },
    },
    {
      title: "收件人",
      align: center,
      render(text: any, record: any) {
        return (
          <div>
            <div>
              {record.addressee}[{record.phoneNumber}]
            </div>
            <div>{record.address}</div>
          </div>
        );
      },
    },
    {
      title: "订单金额",
      dataIndex: "money",
      align: center,
      render(text: number) {
        return <span>￥ {formatMoney(text)}</span>;
      },
    },
    {
      title: "订单状态",
      dataIndex: "state",
      align: center,
    },
    {
      title: "操作",
      align: center,
      width: "90px",
      render(text: any, record: any, index: number) {
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={viewOrder.bind(this, record)}
            >
              查看
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              onClick={() => {
                deletOrder(record.id);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        dataSource={props.dataSource}
        columns={columns}
        loading={props.isLoading}
        pagination={{ ...props.pageData, onChange: props.pageChange }}
      />
    </div>
  );
};
export default withRouter<props, React.FC<props>>(orderTable);
