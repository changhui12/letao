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