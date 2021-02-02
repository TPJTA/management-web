import React, { useEffect, useState } from "react";
import { Input, Select, Form, Button, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import GoodsTable, { goodsData } from "./goodsTable";
import GoodsEdit from "./goodsEdit";
import testImg from "@/assets/images/goods.jpg";
import "./index.less";
const { Search } = Input;
const { Option } = Select;
interface pageData {
  current: number;
  total: number;
  pageSize: number;
}
const Goods: React.FC = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [viewGoods, setViewGoods] = useState<goodsData>();
  const [isEdit, setIsEdit] = useState(false);
  const [dataSource, setDataSource] = useState<goodsData[]>([]);
  const [pageData, setPageData] = useState<pageData>();
  const onSearch = (val: any) => {
    message.info(JSON.stringify(val));
    setIsLoading(true);
    setTimeout(() => {
      setDataSource([
        {
          id: 1,
          key: "1",
          img: [testImg],
          title: "手表",
          commonPrice: 80,
          memberPrice: 60,
          stock: 9999,
          isBoutique: false,
          isNew: true,
          isHot: false,
        },
        {
          id: 2,
          key: "2",
          img: [testImg],
          title: "手表",
          commonPrice: 80,
          memberPrice: 60,
          stock: 9999,
          isBoutique: true,
          isNew: false,
          isHot: true,
        },
        {
          id: 3,
          key: "3",
          img: [testImg],
          title: "手表",
          commonPrice: 80,
          memberPrice: 60,
          stock: 9999,
          isBoutique: true,
          isNew: false,
          isHot: true,
        },
      ]);
      setIsLoading(false);
    }, 300);
  };
  const getGoods = (page: number = 1) => {
    setIsLoading(true);
    setTimeout(() => {
      setPageData({ current: page, total: 10, pageSize: 8 });
      setDataSource([
        {
          id: 1,
          key: "1",
          img: [testImg],
          title: "手表",
          commonPrice: 80,
          memberPrice: 60,
          stock: 9999,
          isBoutique: false,
          isNew: true,
          isHot: false,
        },
        {
          id: 2,
          key: "2",
          img: [testImg],
          title: "手表",
          commonPrice: 80,
          memberPrice: 60,
          stock: 9999,
          isBoutique: true,
          isNew: false,
          isHot: true,
        },
        {
          id: 3,
          key: "3",
          img: [testImg],
          title: "手表",
          commonPrice: 80,
          memberPrice: 60,
          stock: 9999,
          isBoutique: true,
          isNew: false,
          isHot: true,
        },
        {
          id: 4,
          key: "4",
          img: [testImg],
          title: "手表",
          commonPrice: 80,
          memberPrice: 60,
          stock: 9999,
          isBoutique: true,
          isNew: false,
          isHot: true,
        },
        {
          id: 5,
          key: "5",
          img: [testImg],
          title: "手表",
          commonPrice: 80,
          memberPrice: 60,
          stock: 9999,
          isBoutique: true,
          isNew: false,
          isHot: true,
        },
        {
          id: 6,
          key: "6",
          img: [testImg],
          title: "手表",
          commonPrice: 80,
          memberPrice: 60,
          stock: 9999,
          isBoutique: true,
          isNew: false,
          isHot: true,
        },
        {
          id: 7,
          key: "7",
          img: [testImg],
          title: "手表",
          commonPrice: 80,
          memberPrice: 60,
          stock: 9999,
          isBoutique: true,
          isNew: false,
          isHot: true,
        },
        {
          id: 8,
          key: "8",
          img: [testImg],
          title: "手表",
          commonPrice: 80,
          memberPrice: 60,
          stock: 9999,
          isBoutique: true,
          isNew: false,
          isHot: true,
        },
      ]);
      setIsLoading(false);
    }, 300);
  };
  const deletGoods = (id: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDataSource(dataSource.filter((item) => item.id != id));
    }, 300);
  };
  const view = (goods: goodsData, isEdit: boolean) => {
    setViewGoods(goods);
    setIsEdit(isEdit);
  };
  //因为刷新时会渲染两次(需要重新获取用户权限并渲染路由),为了防止内存泄漏(第一个组件已经删除但因为获取到数据导致修改stat),所以延迟获取数据
  useEffect(() => {
    setIsLoading(true);
    let timer = setTimeout(() => {
      getGoods();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="goods">
      {Boolean(viewGoods) ? (
        <GoodsEdit
          goods={viewGoods}
          isEdit={isEdit}
          setEdit={setIsEdit}
          setView={setViewGoods}
        />
      ) : (
        <div>
          <Form onFinish={onSearch} layout="inline">
            <Form.Item>
              <Input.Group compact>
                <Form.Item name="type">
                  <Select placeholder="请选择类型" style={{ width: "120px" }}>
                    <Option value="clothing">服装</Option>
                    <Option value="jewelry">饰品</Option>
                    <Option value="food">食品</Option>
                    <Option value="cosmetics">化妆品</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="name">
                  <Search
                    placeholder="请输入产品名称"
                    allowClear
                    enterButton={
                      <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        htmlType="submit"
                      ></Button>
                    }
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Form>
          <GoodsTable
            isLoading={isLoading}
            dataSource={dataSource}
            pageData={pageData}
            pageChange={getGoods}
            deletGoods={deletGoods}
            setView={view}
          />
        </div>
      )}
    </div>
  );
};
export default Goods;
