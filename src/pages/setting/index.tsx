import React, { useState } from "react";
import { connect } from "react-redux";
import { storeType } from "@/stores";
import { Dispatch } from "redux";
import { setAccess, accessAction } from "@/stores/user/action";
import { accessInter } from "@/stores/user";
import { Button, Table, Modal, Checkbox, Space } from "antd";
import "./index.less";
const center: "center" = "center";
const storeToProps = (store: storeType) => ({
  access: store.user.access,
  identity: store.user.identity,
});
const dispatchToProps = (dispatch: Dispatch) => ({
  setAccess: (access: accessAction) => {
    dispatch(setAccess(access));
  },
});
interface props {
  access: accessInter;
  identity: string;
  setAccess: (access: accessAction) => void;
}
const Setting: React.FC<props> = function (props: props) {
  const [editAccess, setEditAccess] = useState<any>();
  const getAccessName = (name: string) => {
    let result: string[] = [];
    for (let i in props.access) {
      if (props.access[i].indexOf(name) !== -1) {
        if (i === "administrators") {
          result.push("管理员");
        } else if (i === "enterprise") {
          result.push("企业");
        } else if (i === "user") {
          result.push("用户");
        }
      }
    }
    return result.join("/");
  };
  const getAccessValue = (accessName: string) => {
    let accessArr = accessName.split("/");
    return accessArr.map((item) => {
      if (item === "管理员") {
        return "administrators";
      } else if (item === "企业") {
        return "enterprise";
      } else if (item === "用户") {
        return "user";
      }
    });
  };
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      align: center,
    },
    {
      title: "管理限制",
      dataIndex: "access",
      align: center,
    },
    {
      title: "操作",
      align: center,
      render(text: any, record: any) {
        return (
          <Button
            onClick={() => {
              setEditAccess({
                ...record,
                access: getAccessValue(record.access),
              });
            }}
          >
            修改
          </Button>
        );
      },
    },
  ];
  const dataSource = [
    {
      key: "1",
      name: "商品管理",
      access: getAccessName("商品管理"),
    },
    {
      key: "2",
      name: "订单管理",
      access: getAccessName("订单管理"),
    },
    {
      key: "3",
      name: "数据分析",
      access: getAccessName("数据分析"),
    },
    {
      key: "4",
      name: "权限设置",
      access: getAccessName("权限设置"),
    },
  ];
  const setAccess = () => {
    for (let i in props.access) {
      if (editAccess.access.indexOf(i) === -1) {
        props.setAccess({
          access: props.access[i].filter(
            (item: string) => item !== editAccess.name
          ),
          type: i,
        });
      } else {
        if (props.access[i].indexOf(editAccess.name) === -1) {
          props.setAccess({
            access: [...props.access[i], editAccess.name],
            type: i,
          });
        }
      }
    }
  };
  return (
    <div className="setting">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
      />
      <Modal
        title={editAccess && editAccess.name}
        visible={Boolean(editAccess)}
        onCancel={() => {
          setEditAccess(null);
        }}
        onOk={setAccess}
        cancelText="取消"
        okText="确认"
        destroyOnClose
      >
        <Checkbox.Group
          defaultValue={editAccess && editAccess.access}
          onChange={(checkedValue) => {
            setEditAccess({ ...editAccess, access: checkedValue });
          }}
        >
          <Space direction="vertical">
            <Checkbox value="administrators">管理员</Checkbox>
            <Checkbox value="enterprise">企业</Checkbox>
            <Checkbox value="user">用户</Checkbox>
          </Space>
        </Checkbox.Group>
      </Modal>
    </div>
  );
};
export default connect(storeToProps, dispatchToProps)(Setting);
