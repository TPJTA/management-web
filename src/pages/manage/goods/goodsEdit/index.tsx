import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  InputNumber,
  Upload,
  Modal,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;
interface props {
  isEdit: boolean;
  setEdit: (val: boolean) => void;
  setView: (val: any) => void;
  goods?: any;
}
const goodsEdit: React.FC<props> = function (props) {
  const [previewImage, setPreviewImage] = useState("");
  const [imgList, setImgList] = useState<Array<any>>([]);
  const finishEdit = (val: any) => {
    props.setView({ ...val, img: imgList.map((item) => item.thumbUrl) });
  };
  const checkboxOptions = [
    { label: "精品", value: "isBoutique" },
    { label: "新品", value: "isNew" },
    { label: "热销", value: "isHot" },
  ];
  const getRecommend = () => {
    let result: Array<string> = [];
    if (props.goods) {
      if (props.goods.isBoutique) {
        result.push("isBoutique");
      }
      if (props.goods.isNew) {
        result.push("isNew");
      }
      if (props.goods.isHot) {
        result.push("isHot");
      }
    }
    return result;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );
  const upLoadChange = ({ fileList }: any) => {
    setImgList(fileList);
  };
  const imgView = (file: any) => {
    setPreviewImage(file.thumbUrl);
  };
  const customRequest = (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    let num = 0;
    let timer = setInterval(() => {
      onProgress({ percent: ++num });
      if (num >= 100) {
        clearInterval(timer);
        onSuccess();
      }
    }, 10);
  };
  useEffect(() => {
    if (props.goods) {
      setImgList(props.goods.img.map((item: any) => ({ thumbUrl: item })));
    }
  }, [props.goods]);
  return (
    <div className="goods-edit">
      <Form name="goods" labelCol={{ span: 2 }} onFinish={finishEdit}>
        <Form.Item
          label="商品名称"
          name="title"
          rules={[{ required: true, message: "请输入商品名称" }]}
          initialValue={props.goods && props.goods.title}
        >
          {props.isEdit ? (
            <Input placeholder="商品名称..." style={{ width: "200px" }} />
          ) : (
            <span>{props.goods.title}</span>
          )}
        </Form.Item>
        <Form.Item
          label="分类"
          name="type"
          rules={[{ required: true, message: "请选择分类" }]}
          initialValue="clothing"
        >
          {props.isEdit ? (
            <Select placeholder="请选择类型" style={{ width: "120px" }}>
              <Option value="clothing">服装</Option>
              <Option value="jewelry">饰品</Option>
              <Option value="food">食品</Option>
              <Option value="cosmetics">化妆品</Option>
            </Select>
          ) : (
            <span>服装</span>
          )}
        </Form.Item>
        <Form.Item
          label="市场价"
          name="commonPrice"
          rules={[
            { required: true, message: "请输入市场价" },
            { type: "number", min: 0, message: "价钱不能小于0" },
          ]}
          initialValue={props.goods && props.goods.commonPrice}
        >
          {props.isEdit ? (
            <InputNumber
              formatter={(value: any) =>
                `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value: any) => value.replace(/\￥\s?|(,*)/g, "")}
            />
          ) : (
            <span>{`￥ ${props.goods.commonPrice}`}</span>
          )}
        </Form.Item>
        <Form.Item
          label="会员价"
          name="memberPrice"
          rules={[
            { required: true, message: "请输入会员价" },
            { type: "number", min: 0, message: "价钱不能小于0" },
          ]}
          initialValue={props.goods && props.goods.memberPrice}
        >
          {props.isEdit ? (
            <InputNumber
              formatter={(value: any) =>
                `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value: any) => value.replace(/\￥\s?|(,*)/g, "")}
            />
          ) : (
            <span>{`￥ ${props.goods.memberPrice}`}</span>
          )}
        </Form.Item>
        <Form.Item
          label="库存"
          name="stock"
          rules={[
            { required: true, message: "请输入库存" },
            { type: "number", min: 0, message: "库存不能小于0" },
          ]}
          initialValue={props.goods && props.goods.stock}
        >
          {props.isEdit ? <InputNumber /> : <span>{props.goods.stock}</span>}
        </Form.Item>
        <Form.Item label="推荐" name="recommend" initialValue={getRecommend()}>
          <Checkbox.Group options={checkboxOptions} disabled={!props.isEdit} />
        </Form.Item>
        <Form.Item label="图片" name="img">
          <Upload
            listType="picture-card"
            fileList={imgList}
            customRequest={customRequest}
            onPreview={imgView}
            onChange={upLoadChange}
            disabled={!props.isEdit}
          >
            {!props.isEdit || imgList.length >= 3 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item style={{ marginLeft: "5%" }}>
          {props.isEdit ? (
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  props.setEdit(false);
                }}
              >
                确定
              </Button>
              <Button
                onClick={() => {
                  props.setEdit(false);
                  setImgList(
                    props.goods.img.map((item: any) => ({ thumbUrl: item }))
                  );
                }}
              >
                取消
              </Button>
            </Space>
          ) : (
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  props.setEdit(true);
                }}
              >
                编辑
              </Button>
              <Button
                onClick={() => {
                  props.setView(null);
                }}
              >
                返回
              </Button>
            </Space>
          )}
        </Form.Item>
        <Modal
          visible={Boolean(previewImage)}
          footer={null}
          onCancel={() => {
            setPreviewImage("");
          }}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form>
    </div>
  );
};
export default goodsEdit;
