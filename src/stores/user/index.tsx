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
export interface userInter {
  name: string;
  identity: string;
  access: Array<accessTy>;
  imgPath: string;
}

const initUser: userInter = {
  name: "",
  identity: "",
  access: [],
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
    case login_out:
      return { ...state, ...initUser };
    default:
      return state;
  }
}
