import {
  set_name,
  set_identity,
  set_access,
  set_img_path,
  login_out,
  actionParamType,
  accessTy,
} from "./action";
interface action {
  type: string;
  param: actionParamType;
}
export interface accessInter {
  administrators: Array<accessTy>;
  enterprise: Array<accessTy>;
  user: Array<accessTy>;
}
export interface userInter {
  name: string;
  identity: string;
  access: accessInter;
  imgPath: string;
}
//access中有一个init是为了防止刷新时直接跳到403,因为当时还未获取到真正权限,如果不设置则当时会无权限
const initUser: userInter = {
  name: "",
  identity: "administrators",
  access: {
    administrators: ["商品管理", "订单管理", "数据分析", "权限设置"],
    enterprise: ["商品管理", "订单管理", "数据分析", "权限设置"],
    user: ["商品管理", "订单管理", "数据分析", "权限设置"],
  },
  imgPath: "",
};

export default function user(state = initUser, action: action) {
  switch (action.type) {
    case set_name:
      return { ...state, name: action.param };
    case set_identity:
      return { ...state, identity: action.param };
    case set_access:
      let param: any = action.param;
      if (
        param.type &&
        (param.type === "administrators" ||
          param.type === "enterprise" ||
          param.type === "user")
      ) {
        return {
          ...state,
          access: { ...state.access, [param.type]: param.access },
        };
      } else {
        return {
          ...state,
          access: { ...state.access, [state.identity]: param.access },
        };
      }
    case set_img_path:
      return { ...state, imgPath: action.param };
    case login_out:
      return { ...initUser, access: state.access };
    default:
      return state;
  }
}
