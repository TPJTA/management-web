import React, { FC } from "react";
import { Table, Button, Space } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { formatMoney } from "@/libs/tool";
export interface goodsData {
  id: number;
  key: any;
  img: string[];
  title: string;
  commonPrice: number;
  memberPrice: number;
  stock: number;
  isBoutique: boolean;
  isNew: boolean;
  isHot: boolean;
}
export interface pageData {
  current: number;
  total: number;
  pageSize: number;
}
interface props {
  dataSource: goodsData[];
  pageData?: pageData;
  isLoading: boolean;
  pageChange?: (page: number, pageSize?: number) => void;
  deletGoods: (id: number) => void;
  setView: (goods: goodsData, isEdit: boolean) => void;
}
const center: "center" = "center";
const goodsTable: FC<props> = function (props) {
  const deletGoods = props.deletGoods;
  const columns = [
    {
      title: "产品图片",
      dataIndex: "img",
      align: center,
      render(text: string) {
        return <img src={text} style={{ width: "50px", height: "50px" }} />;
      },
    },
    {
      title: "产品名称",
      dataIndex: "title",
      align: center,
    },
    {
      title: "市场价",
      dataIndex: "commonPrice",
      align: center,
      render(text: number) {
        return <span>￥ {formatMoney(text)}</span>;
      },
    },
    {
      title: "会员价",
      dataIndex: "memberPrice",
      align: center,
      render(text: number) {
        return <span>￥ {formatMoney(text)}</span>;
      },
    },
    {
      title: "库存",
      dataIndex: "stock",
      align: center,
      render(text: number) {
        return <span>{text}件</span>;
      },
    },
    {
      title: "精品",
      dataIndex: "isBoutique",
      align: center,
      render(text: boolean) {
        if (text) {
          return (
            <span style={{ color: "rgb(25, 169, 123)" }}>
              <CheckOutlined />
            </span>
          );
        } else {
          return (
            <span style={{ color: "red" }}>
              <CloseOutlined />
            </span>
          );
        }
      },
    },
    {
      title: "新品",
      dataIndex: "isNew",
      align: center,
      render(text: boolean) {
        if (text) {
          return (
            <span style={{ color: "rgb(25, 169, 123)" }}>
              <CheckOutlined />
            </span>
          );
        } else {
          return (
            <span style={{ color: "red" }}>
              <CloseOutlined />
            </span>
          );
        }
      },
    },
    {
      title: "热销",
      dataIndex: "isHot",
      align: center,
      render(text: boolean) {
        if (text) {
          return (
            <span style={{ color: "rgb(25, 169, 123)" }}>
              <CheckOutlined />
            </span>
          );
        } else {
          return (
            <span style={{ color: "red" }}>
              <CloseOutlined />
            </span>
          );
        }
      },
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
              onClick={() => {
                setView(record, false);
              }}
            >
              查看
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setView(record, true);
              }}
            >
              编辑
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              onClick={() => {
                deletGoods(record.id);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  const setView = (goods: goodsData, isEdit: boolean) => {
    props.setView(goods, isEdit);
  };
  return (
    <div>
      <Table
        dataSource={props.dataSource}
        columns={columns}
        loading={props.isLoading}
        pagination={
          props.pageData && { ...props.pageData, onChange: props.pageChange }
        }
      />
      ;
    </div>
  );
};
export default goodsTable;
