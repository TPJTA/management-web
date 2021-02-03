import React from "react";
import { Button, Table } from "antd";

const settingTable = function () {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "管理限制",
      dataIndex: "access",
    },
    {
      title: "操作",
      render() {
        return <Button>修改</Button>;
      },
    },
  ];
  return <div></div>;
};
export default settingTable;
