$(function() {
    
    // 渲染图表
    // 1-准备dom (实例容器，一般是一个具有高宽的div元素。)
    var charsBar = echarts.init(document.querySelector(".chars-bar"));
    var charsPie = echarts.init(document.querySelector(".chars-pie"));

    // 2-准备数据
    var optionBar = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1000, 2000, 3333, 600, 4000, 2444],
        }]
    };

    var optionPie = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪王','纽巴伦','新百伦','李宁']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪王'},
                    {value:234, name:'纽巴伦'},
                    {value:135, name:'新百伦'},
                    {value:1548, name:'李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 3-显示数据
    charsBar.setOption(optionBar);
    charsPie.setOption(optionPie);
    
})