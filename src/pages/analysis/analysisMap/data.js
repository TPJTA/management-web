const echarts = require("echarts");
var outname = [
  "南海诸岛",
  "北京",
  "天津",
  "上海",
  "重庆",
  "河北",
  "河南",
  "云南",
  "辽宁",
  "黑龙江",
  "湖南",
  "安徽",
  "山东",
  "新疆",
  "江苏",
  "浙江",
  "江西",
  "湖北",
  "广西",
  "甘肃",
  "山西",
  "内蒙古",
  "陕西",
  "吉林",
  "福建",
  "贵州",
  "广东",
  "青海",
  "西藏",
  "四川",
  "宁夏",
  "海南",
  "台湾",
  "香港",
  "澳门",
];
var outvalue = [
  0,
  524,
  13,
  140,
  75,
  13,
  83,
  11,
  19,
  15,
  69,
  260,
  39,
  4,
  31,
  104,
  36,
  1052,
  33,
  347,
  9,
  157,
  22,
  4,
  18,
  5,
  2398,
  41,
  0,
  484,
  404,
  22,
  3,
  5,
  225,
];
var outdata = [];
for (var i = 0; i < outname.length; i++) {
  outdata.push({
    name: outname[i],
    value: outvalue[i],
  });
}
var geoCoordMap = {};
/*获取地图数据*/
var mapFeatures = echarts.getMap("china").geoJson.features;
//  console.log(mapFeatures)
mapFeatures.forEach(function (v) {
  // 地区名称
  var name = v.properties.name;
  // 地区经纬度
  geoCoordMap[name] = v.properties.cp;
});
var convertData = function (outdata) {
  var res = [];
  for (var i = 0; i < outdata.length; i++) {
    var geoCoord = geoCoordMap[outdata[i].name];
    if (geoCoord) {
      res.push({
        name: outdata[i].name,
        value: geoCoord.concat(outdata[i].value),
      });
    }
  }
  return res;
};
module.exports = {
  outdata: outdata,
  convertData: convertData(outdata),
};
