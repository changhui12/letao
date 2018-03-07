// 初始化scroll控件(区域滚动)
mui('.mui-scroll-wrapper').scroll({
	indicators: false, //是否显示滚动条
});

// 初始化轮播图
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});


// 封装一个函数，用于将地址栏的所有参数封装成一个对象，例 {name:'zs',age:18,sex:'男'}
function getSearch(key) {
  // 1-获取参数
  var search = location.search;   // 此方法获取?及其后的所有参数
  // 2-对参数进行解码
  search = decodeURI(search);   // 解码成字符串 ?name=zs&age=18&sex=男
  // 3-去除'?'
  search = search.slice(1);     // name=zs&age=18&sex=男
  // 4-根据'&'将字符串分割成数组   
  var arr = search.split('&');    // [name=zs,age=18,sex=男]
  // 5-遍历数组，并根据'='分割数组元素，并包装成对象
  var obj = {};
  arr.forEach(function(element,index) {
    var k = element.split('=')[0];
    var v = element.split('=')[1];
    obj[k] = v;
  })
  // 6-根据传入的对象属性，返回对应的属性值
  return obj[key];
}