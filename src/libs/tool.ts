import Cookie from "js-cookie";
//Cookie默认存储时间
const default_expires = 1;
//设置cookie
export const setCookie = function (
  name: string,
  value: Object | String | Number,
  expires: number | Date = default_expires,
  path = "/"
) {
  Cookie.set(name, value, { expires: expires, path: path });
};
//获得cookie
export const getCookie = function (name: string) {
  return Cookie.get(name);
};
//删除cookie
export const removeCookie = function (name: string, path = "/") {
  Cookie.remove(name, { path: path });
};

//判断一个数组是否为另一个数组的子集
export const isSubset = function (targetarr: Array<any>, arr: Array<any>) {
  return targetarr.every((v) => arr.includes(v));
};
//判断要查询的数组是否至少有一个元素包含在目标数组中
export const hasOneOf = (targetarr: Array<any>, arr: Array<any>) => {
  return targetarr.some((_) => arr.indexOf(_) > -1);
};
//如果传入的数值小于10，即位数只有1位，则在前面补充0
const getHandledValue = function (num: number): string {
  return num < 10 ? "0" + num : num.toString();
};
//格式化时间
export const formatTime = function (
  timeStamp: number,
  isFull: boolean = false,
  separator: string = "-"
): string {
  const d = new Date(timeStamp);
  const year = d.getFullYear();
  const month = getHandledValue(d.getMonth() + 1);
  const date = getHandledValue(d.getDate());
  const hours = getHandledValue(d.getHours());
  const minutes = getHandledValue(d.getMinutes());
  const second = getHandledValue(d.getSeconds());
  let resStr = "";
  if (isFull)
    resStr =
      year +
      separator +
      month +
      separator +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      second;
  else resStr = month + separator + date + " " + hours + ":" + minutes;
  return resStr;
};
