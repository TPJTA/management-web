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
  isShowMenu: boolean;
}

const initUser: userInter = {
  name: "",
  identity: "",
  access: [],
  imgPath: "",
  isShowMenu: false,
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
    case set_show_menu:
      return { ...state, isShowMenu: action.param };
    default:
      return state;
  }
}
