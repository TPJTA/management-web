import React, { useState, useEffect } from "react";
import { Input, Select, Form, Button, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import OrderTable, { orderData } from "./orderTable";
import testImg from "@/assets/images/goods.jpg";
import "./index.less";
const { Search } = Input;
const { Option } = Select;
const Order: React.FC = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<orderData[]>([]);
  const [pageData, setPageData] = useState({
    current: 1,
    total: 1,
    pageSize: 8,
  });
  const onSearch = (val: any) => {
    message.info(JSON.stringify(val));
    setIsLoading(true);
    setTimeout(() => {
      setDataSource([
        {
          id: "1",
          key: 1,
          time: Date.now(),
          address: "xxxxx",
          phoneNumber: "12345678912",
          addressee: "张三",
          money: 99,
          state: "未付款",
          goods: [
            {
              id: 1,
              key: "1",
              img: testImg,
              title: "手表",
              price: 80,
              number: 1,
            },
          ],
        },
      ]);
      setIsLoading(false);
    }, 300);
  };
  const getOrder = (page: number = 1) => {
    setIsLoading(true);
    setTimeout(() => {
      setPageData({ current: page, total: 8, pageSize: 8 });
      setDataSource([
        {
          id: "1",
          key: "1",
          time: Date.now(),
          address: "xx省xx市xx区xx路x号",
          phoneNumber: "12345678912",
          addressee: "张三",
          money: 99,
          state: "未付款",
          goods: [
            {
              id: 1,
              key: "1",
              img: testImg,
              title: "手表",
              price: 80,
              number: 1,
            },
            {
              id: 2,
              key: "2",
              img: testImg,
              title: "手表",
              price: 90,
              number: 2,
            },
          ],
        },
        {
          id: "2",
          key: "2",
          time: Date.now(),
          address: "xx省xx市xx区xx路x号",
          phoneNumber: "12345678912",
          addressee: "张三",
          money: 99,
          state: "未付款",
          goods: [
            {
              id: 1,
              key: "1",
              img: testImg,
              title: "手表",
              price: 80,
              number: 1,
            },
          ],
        },
        {
          id: "3",
          key: "3",
          time: Date.now(),
          address: "xx省xx市xx区xx路x号",
          phoneNumber: "12345678912",
          addressee: "张三",
          money: 99,
          state: "未付款",
          goods: [
            {
              id: 1,
              key: "1",
              img: testImg,
              title: "手表",
              price: 80,
              number: 1,
            },
            {
              id: 2,
              key: "2",
              img: testImg,
              title: "手表",
              price: 90,
              number: 2,
            },
            {
              id: 3,
              key: "3",
              img: testImg,
              title: "手表",
              price: 88,
              number: 1,
            },
            {
              id: 4,
              key: "4",
              img: testImg,
              title: "手表",
              price: 99,
              number: 2,
            },
          ],
        },
        {
          id: "4",
          key: "4",
          time: Date.now(),
          address: "xx省xx市xx区xx路x号",
          phoneNumber: "12345678912",
          addressee: "张三",
          money: 99,
          state: "未付款",
          goods: [
            {
              id: 1,
              key: "1",
              img: testImg,
              title: "手表",
              price: 80,
              number: 1,
            },
          ],
        },
      ]);
      setIsLoading(false);
    }, 300);
  };
  const deletOrder = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDataSource(dataSource.filter((item) => item.id !== id));
    }, 300);
  };
  //因为刷新时会渲染两次(需要重新获取用户权限并渲染路由),为了防止内存泄漏(第一个组件已经删除但因为获取到数据导致修改stat),所以延迟获取数据
  useEffect(() => {
    setIsLoading(true);
    let timer = setTimeout(() => {
      getOrder();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="order">
      <Form onFinish={onSearch} layout="inline">
        <Form.Item>
          <Input.Group compact>
            <Form.Item name="state">
              <Select placeholder="请选择订单状态" style={{ width: "150px" }}>
                <Option value="unpaid">未付款</Option>
                <Option value="undelivered">未发货</Option>
                <Option value="Delivered">运送中</Option>
                <Option value="completed">已完成</Option>
              </Select>
            </Form.Item>
            <Form.Item name="name">
              <Search
                placeholder="请输入订单编号或收件人姓名"
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
      <OrderTable
        isLoading={isLoading}
        dataSource={dataSource}
        pageData={pageData}
        deletOrder={deletOrder}
        pageChange={getOrder}
      />
    </div>
  );
};
export default Order;
