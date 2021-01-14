export const set_name = "set_name";
export const set_identity = "set_identity";
export const set_access = "set_access";
export const set_img_path = "set_img_path";
export const set_show_menu = "set_show_menu";

interface actionFn<T = any> {
  (param: T): { type: string; param: T };
}
export type actionParamType = string | string[] | boolean | undefined;

export const setName: actionFn<string> = function (param) {
  return {
    param,
    type: set_name,
  };
};

export const setIdentity: actionFn<string> = function (param) {
  return {
    param,
    type: set_identity,
  };
};

export const setAccess: actionFn<string[]> = function (param) {
  return {
    param,
    type: set_access,
  };
};

export const setImgPath: actionFn<string> = function (param) {
  return {
    param,
    type: set_img_path,
  };
};
