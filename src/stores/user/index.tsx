import {
  set_name,
  set_identity,
  set_access,
  set_img_path,
  set_show_menu,
  actionParamType,
} from "./action";

interface action {
  type: string;
  param: actionParamType;
}

export interface userInter {
  name: string;
  identity: string;
  access: string[];
  imgPath: string;
}

const initUser: userInter = {
  name: "",
  identity: "",
  access: ["商品管理", "信息管理", "数据分析", "用户设置", "权限设置"],
  imgPath: "",
};

export default function user(state = initUser, action: action) {
  switch (action.type) {
    case set_name:
      return { ...state, name: action.param };
    case set_identity:
      return { ...state, identity: action.param };
    case set_access:
      return { ...state, access: action.param };
    case set_img_path:
      return { ...state, imgPath: action.param };
    default:
      return state;
  }
}
